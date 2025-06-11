import "./aggressiveBufferFix";
import { Buffer, forceBufferCompatibility } from "./aggressiveBufferFix";
import { patchMusigClass } from "./musigPatch";

import zkpInit from "@vulpemventures/secp256k1-zkp";
import { Transaction, address, crypto } from "liquidjs-lib";
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
import { ECPairFactory } from "ecpair";
import * as ecc from "@bitcoinerlab/secp256k1";
import { getNetwork } from "./network";
import fetchFunction from "./fetchFunction";
import { removeClaim, saveClaim } from "./claims";
import { getBoltzApiUrl, getBoltzWsUrl } from "./boltzEndpoitns";
import getBoltzFeeRates from "./getBoltzFeerate,";
import createCompatibleBuffer from "./compatibleBuffer";
import debugLog from "./debugLog";

// Patch the Musig class immediately after import
patchMusigClass(Musig);

export const waitAndClaim = async (claimInfo) => {
  init(await zkpInit());

  let claimTx;
  const network = getNetwork(import.meta.env.VITE_BOLTZ_ENVIRONMENT);
  const { createdResponse, destinationAddress, keys, preimage } = claimInfo;
  debugLog("Starting waitAndClaim with claim info:", claimInfo);

  // Create WebSocket connection
  const webSocket = new WebSocket(
    getBoltzWsUrl(import.meta.env.VITE_BOLTZ_ENVIRONMENT)
  );

  webSocket.onopen = () => {
    debugLog("WebSocket connected, subscribing to swap updates");
    webSocket.send(
      JSON.stringify({
        op: "subscribe",
        channel: "swap.update",
        args: [createdResponse.id],
      })
    );
  };

  webSocket.onmessage = async (rawMsg) => {
    const msg = JSON.parse(rawMsg.data);
    debugLog("WebSocket message received:", msg);

    if (msg.event !== "update") return;
    if (msg.args[0].id !== createdResponse.id) return;

    if (msg.args[0].error) {
      console.error("Swap error:", msg.args[0].error);
      webSocket.close();
      return;
    }

    switch (msg.args[0].status) {
      case "swap.created": {
        debugLog("Swap created, waiting for invoice payment");
        saveClaim(claimInfo, import.meta.env.VITE_BOLTZ_ENVIRONMENT);
        break;
      }

      case "transaction.mempool":
      case "transaction.confirmed": {
        try {
          debugLog(`Transaction ${msg.args[0].status}, starting claim process`);

          // Save current status
          claimInfo.lastStatus = msg.args[0].status;
          saveClaim(claimInfo, import.meta.env.VITE_BOLTZ_ENVIRONMENT);

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
            SwapTreeSerializer.deserializeSwapTree(createdResponse.swapTree)
              .tree
          );

          // Parse lockup transaction
          const lockupTx = Transaction.fromHex(msg.args[0].transaction.hex);
          debugLog(`Lockup transaction parsed: ${lockupTx.getId()}`);

          // Find swap output
          const swapOutput = detectSwap(tweakedKey, lockupTx);
          if (swapOutput === undefined) {
            throw new Error("No swap output found in lockup transaction");
          }
          debugLog("Swap output detected:", swapOutput);

          // Create claim transaction
          debugLog("Creating claim transaction...");
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

          if (!claimTx.toHex()) {
            throw new Error("Failed to create claim transaction");
          }

          // Get partial signature from Boltz
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

          debugLog("✅ Boltz partial signature received");

          // Force buffer compatibility on received signature data
          const receivedPubNonce = forceBufferCompatibility(
            createCompatibleBuffer(boltzSig.pubNonce)
          );

          debugLog("About to call aggregateNonces");

          // This is the critical call that was failing
          musig.aggregateNonces([[boltzPublicKey, receivedPubNonce]]);

          debugLog("✅ aggregateNonces completed successfully");

          // Initialize the session to sign the claim transaction
          musig.initializeSession(
            claimTx.hashForWitnessV1(
              0,
              [swapOutput.script],
              [{ value: swapOutput.value, asset: swapOutput.asset }],
              Transaction.SIGHASH_DEFAULT,
              network.genesisBlockHash
            )
          );

          // Add the partial signature from Boltz
          const partialSignature = forceBufferCompatibility(
            createCompatibleBuffer(boltzSig.partialSignature)
          );

          musig.addPartial(boltzPublicKey, partialSignature);

          // Create our partial signature
          musig.signPartial();

          // Set the witness
          claimTx.ins[0].witness = [musig.aggregatePartials()];
          debugLog("✅ Witness set on claim transaction");

          // Save claim transaction
          claimInfo.claimTx = claimTx.toHex();
          saveClaim(claimInfo, import.meta.env.VITE_BOLTZ_ENVIRONMENT);

          // Broadcast transaction
          debugLog("Broadcasting claim transaction...");
          const broadcastResult = await fetchFunction(
            `${getBoltzApiUrl(
              import.meta.env.VITE_BOLTZ_ENVIRONMENT
            )}/v2/chain/L-BTC/transaction`,
            {
              hex: claimTx.toHex(),
            },
            "post"
          );

          if (!broadcastResult) {
            throw new Error("Failed to broadcast claim transaction");
          }

          debugLog("✅ Claim transaction broadcast successfully");
          claimInfo.claimed = true;
          removeClaim(claimInfo, import.meta.env.VITE_BOLTZ_ENVIRONMENT);
          webSocket.close();
        } catch (err) {
          console.error(`❌ Error in claim process: ${err.message}`);
          console.error("Full error:", err);
          console.error("Stack trace:", err.stack);
          // Don't close WebSocket on error, allow retry
        }
        break;
      }

      case "invoice.settled": {
        debugLog("Invoice settled");
        claimInfo.lastStatus = msg.args[0].status;
        if (!claimInfo.claimed) {
          saveClaim(claimInfo, import.meta.env.VITE_BOLTZ_ENVIRONMENT);
        }
        webSocket.close();
        break;
      }

      case "invoice.expired":
      case "swap.expired":
      case "transaction.failed":
      case "transaction.refunded": {
        debugLog(`Swap failed with status: ${msg.args[0].status}`);
        removeClaim(claimInfo, import.meta.env.VITE_BOLTZ_ENVIRONMENT);
        webSocket.close();
        break;
      }
    }
  };

  webSocket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  webSocket.onclose = (event) => {
    debugLog("WebSocket closed:", event);
  };
};

export const reverseSwap = async (recvInfo, destinationAddress) => {
  debugLog("Starting reverse swap", { recvInfo, destinationAddress });

  const preimage = randomBytes(32);
  const keys = ECPairFactory(ecc).makeRandom();
  const signature = keys.signSchnorr(
    crypto.sha256(
      forceBufferCompatibility(Buffer.from(destinationAddress, "utf-8"))
    )
  );

  const invoiceAmount = Math.round(Number(recvInfo.amount));
  debugLog("Creating reverse swap with amount:", invoiceAmount);

  const createdResponse = await fetchFunction(
    `${getBoltzApiUrl(import.meta.env.VITE_BOLTZ_ENVIRONMENT)}/v2/swap/reverse`,
    {
      address: destinationAddress,
      addressSignature: forceBufferCompatibility(signature).toString("hex"),
      claimPublicKey: forceBufferCompatibility(keys.publicKey).toString("hex"),
      description: recvInfo.description || "",
      from: "BTC",
      onchainAmount: invoiceAmount,
      preimageHash: crypto.sha256(preimage).toString("hex"),
      to: "L-BTC",
    },
    "post"
  );

  const claimInfo = {
    claimed: false,
    claimTx: "",
    createdResponse,
    destinationAddress,
    lastStatus: "",
    preimage,
    keys,
  };

  waitAndClaim(claimInfo);
  return claimInfo;
};

export const getLiquidAddress = async (invoice, magicHint) => {
  debugLog("Getting liquid address for invoice:", invoice);

  const bip21Data = await (
    await fetch(
      `${getBoltzApiUrl(
        import.meta.env.VITE_BOLTZ_ENVIRONMENT
      )}/v2/swap/reverse/${invoice}/bip21`
    )
  ).json();

  const bip21Split = bip21Data.bip21.split(":");
  const bip21Address = bip21Split[1].split("?")[0];

  // Verify signature
  const isValidSignature = ECPairFactory(ecc)
    .fromPublicKey(
      forceBufferCompatibility(Buffer.from(magicHint.pubkey, "hex"))
    )
    .verifySchnorr(
      crypto.sha256(
        forceBufferCompatibility(Buffer.from(bip21Address, "utf-8"))
      ),
      forceBufferCompatibility(Buffer.from(bip21Data.signature, "hex"))
    );

  if (!isValidSignature) {
    throw new Error("Invalid Boltz signature - potential security issue");
  }

  debugLog("✅ Liquid address verified:", bip21Address);
  return bip21Address;
};
