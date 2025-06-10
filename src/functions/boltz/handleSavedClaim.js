import zkpInit from "@vulpemventures/secp256k1-zkp";
// import axios from "axios";
import { Buffer } from "buffer";
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

  try {
    const swapStatus = await getSwapStatus(createdResponse.id);
    console.log(swapStatus);
    if (!swapStatus.transaction?.hex) throw Error("LOCK_TRANSACTION_MISSING");
    const boltzPublicKey = createCompatibleBuffer(
      createdResponse.refundPublicKey
    );

    // Create a musig signing session and tweak it with the Taptree of the swap scripts
    const musig = new Musig(await zkpInit(), keys, randomBytes(32), [
      boltzPublicKey,
      createCompatibleBuffer(keys.publicKey),
    ]);
    const tweakedKey = TaprootUtils.tweakMusig(
      musig,
      SwapTreeSerializer.deserializeSwapTree(createdResponse.swapTree).tree
    );

    // Parse the lockup transaction and find the output relevant for the swap
    const lockupTx = Transaction.fromHex(swapStatus.transaction?.hex);
    console.log(`Got lockup transaction: ${lockupTx.getId()}`);

    const swapOutput = detectSwap(tweakedKey, lockupTx);
    if (swapOutput === undefined) {
      console.error("No swap output found in lockup transaction");
      return;
    }

    console.log("Creating claim transaction");

    // Create a claim transaction to be signed cooperatively via a key path spend
    const feeRate = await getBoltzFeeRates();

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
            blindingPrivateKey: createCompatibleBuffer(
              createdResponse.blindingKey
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

    console.log("Getting partial signature from Boltz");
    const boltzSig = await fetchFunction(
      `${getBoltzApiUrl(
        import.meta.env.VITE_BOLTZ_ENVIRONMENT
      )}/v2/swap/reverse/${createdResponse.id}/claim`,
      {
        index: 0,
        transaction: claimTx.toHex(),
        preimage: Buffer.from(preimage).toString("hex"),
        pubNonce: Buffer.from(musig.getPublicNonce()).toString("hex"),
      },
      "post"
    );

    console.log("✅ Boltz partial signature received:", boltzSig);

    // Aggregate the nonces
    musig.aggregateNonces([
      [boltzPublicKey, createCompatibleBuffer(boltzSig.pubNonce)],
    ]);

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
    musig.addPartial(
      boltzPublicKey,
      createCompatibleBuffer(boltzSig.partialSignature)
    );

    musig.signPartial();

    // Witness of the input to the aggregated signature
    claimTx.ins[0].witness = [musig.aggregatePartials()];

    // save claimtx hex on claimInfo
    claimInfo.claimTx = claimTx.toHex();
    saveClaim(claimInfo, import.meta.env.VITE_BOLTZ_ENVIRONMENT);

    console.log("Broadcasting claim transaction");
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

    claimInfo.claimed = true;
    removeClaim(claimInfo, import.meta.env.VITE_BOLTZ_ENVIRONMENT);
    return true;
  } catch (err) {
    console.log(`Error when constructing claim tx: ${err}`);
    return false;
  }
}
