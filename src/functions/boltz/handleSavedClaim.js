import "./aggressiveBufferFix";
import { forceBufferCompatibility, Buffer } from "./aggressiveBufferFix";
import zkpInit from "@vulpemventures/secp256k1-zkp";
// import axios from "axios";
import { Transaction, address } from "liquidjs-lib";
import {
  Musig,
  OutputType,
  SwapTreeSerializer,
  detectSwap,
  targetFee,
} from "boltz-core";
import {
  TaprootUtils,
  constructClaimTransaction,
  init,
} from "boltz-core/dist/lib/liquid";
import { randomBytes } from "crypto";
import { removeClaim, saveClaim } from "./claims";
import { getSwapStatus } from "./swapStatus";
import { getNetwork } from "./network";
import { getBoltzApiUrl } from "./boltzEndpoitns";
import getBoltzFeeRates from "./getBoltzFeerate,";
import fetchFunction from "./fetchFunction";
import createCompatibleBuffer from "./compatibleBuffer";
import { patchMusigClass } from "./musigPatch";
import debugLog from "./debugLog";

patchMusigClass(Musig);

/**
 * Reverse swap flow:
 * 1. user generates preimage and sends hash to boltz
 * 2. user generates public key and sends to boltz
 * 3. user receives lightning invoice
 * 4. user validates lightining invoice
 */
export async function claimUnclaimedSwaps(claimInfo) {
  init(await zkpInit());

  let claimTx;
  const network = getNetwork(import.meta.env.VITE_BOLTZ_ENVIRONMENT);
  const { createdResponse, destinationAddress, keys, preimage } = claimInfo;
  debugLog("Starting waitAndClaim with claim info:", claimInfo);
  try {
    const swapStatus = await getSwapStatus(createdResponse.id);

    debugLog(`Transaction ${swapStatus}, starting claim process`);
    if (!swapStatus.transaction?.hex) throw Error("LOCK_TRANSACTION_MISSING");

    const boltzPublicKey = forceBufferCompatibility(
      createCompatibleBuffer(createdResponse.refundPublicKey)
    );

    const userPublicKey = forceBufferCompatibility(
      createCompatibleBuffer(keys.publicKey)
    );

    const musig = new Musig(await zkpInit(), keys, randomBytes(32), [
      boltzPublicKey,
      userPublicKey,
    ]);

    debugLog("Tweaking key");
    const tweakedKey = TaprootUtils.tweakMusig(
      musig,
      SwapTreeSerializer.deserializeSwapTree(createdResponse.swapTree).tree
    );

    // Parse the lockup transaction and find the output relevant for the swap
    const lockupTx = Transaction.fromHex(swapStatus.transaction?.hex);

    debugLog(`Lockup transaction parsed: ${lockupTx.getId()}`);

    const swapOutput = detectSwap(tweakedKey, lockupTx);
    if (swapOutput === undefined) {
      console.error("No swap output found in lockup transaction");
      return;
    }

    debugLog("Swap output detected:", swapOutput);

    const feeRate = await getBoltzFeeRates();

    debugLog("Creating claim transaction...");
    claimTx = targetFee(feeRate, (fee) =>
      constructClaimTransaction(
        [
          {
            ...swapOutput,
            keys,
            preimage,
            cooperative: true,
            type: OutputType.Taproot,
            txHash: lockupTx.getHash(),
            blindingPrivateKey: forceBufferCompatibility(
              createCompatibleBuffer(createdResponse.blindingKey)
            ),
          },
        ],
        address.toOutputScript(destinationAddress, network),
        fee,
        true,
        network,
        address.fromConfidential(destinationAddress).blindingKey
      )
    );

    debugLog("Requesting partial signature from Boltz...");

    // Get public nonce and force compatibility
    const publicNonce = musig.getPublicNonce();

    const boltzSig = await fetchFunction(
      `${getBoltzApiUrl(
        import.meta.env.VITE_BOLTZ_ENVIRONMENT
      )}/v2/swap/reverse/${createdResponse.id}/claim`,
      {
        index: 0,
        transaction: claimTx.toHex(),
        preimage: forceBufferCompatibility(preimage).toString("hex"),
        pubNonce: forceBufferCompatibility(publicNonce).toString("hex"),
      },
      "post"
    );

    console.log("✅ Boltz partial signature received");

    const receivedPubNonce = forceBufferCompatibility(
      createCompatibleBuffer(boltzSig.pubNonce)
    );

    debugLog("About to call aggregateNonces");
    // Aggregate the nonces
    musig.aggregateNonces([[boltzPublicKey, receivedPubNonce]]);

    debugLog("✅ aggregateNonces completed successfully");
    // Initialize the session to sign the claim transaction
    musig.initializeSession(
      claimTx.hashForWitnessV1(
        0,
        [swapOutput.script],
        [{ asset: swapOutput.asset, value: swapOutput.value }],
        Transaction.SIGHASH_DEFAULT,
        network.genesisBlockHash
      )
    );

    // Add the partial signature from Boltz
    const partialSignature = forceBufferCompatibility(
      createCompatibleBuffer(boltzSig.partialSignature)
    );

    musig.addPartial(boltzPublicKey, partialSignature);

    musig.signPartial();

    // Witness of the input to the aggregated signature
    claimTx.ins[0].witness = [musig.aggregatePartials()];

    debugLog("✅ Witness set on claim transaction");
    // save claimtx hex on claimInfo
    claimInfo.claimTx = claimTx.toHex();
    saveClaim(claimInfo, import.meta.env.VITE_BOLTZ_ENVIRONMENT);

    debugLog("Broadcasting claim transaction...");
    const didBroadcast = fetchFunction(
      `${getBoltzApiUrl(
        import.meta.env.VITE_BOLTZ_ENVIRONMENT
      )}/v2/chain/L-BTC/transaction`,
      {
        hex: claimTx.toHex(),
      },
      "post"
    );

    if (!didBroadcast) throw Error("did not broadcast");

    debugLog("✅ Claim transaction broadcast successfully");
    claimInfo.claimed = true;
    removeClaim(claimInfo, import.meta.env.VITE_BOLTZ_ENVIRONMENT);

    return true;
  } catch (err) {
    console.error(`❌ Error in claim process: ${err.message}`);
    console.error("Full error:", err);
    console.error("Stack trace:", err.stack);
    return false;
  }
}
