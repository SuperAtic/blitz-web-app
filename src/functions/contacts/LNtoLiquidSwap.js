import { Buffer } from "buffer";
import { createBoltzSwapKeys } from "../boltz/createKeys";
import { getBoltzApiUrl } from "../boltz/boltzEndpoitns";

export async function contactsLNtoLiquidSwapInfo(
  liquidAddress,
  swapAmountSats,
  description
) {
  try {
    const { publicKey, privateKeyString, keys } = await createBoltzSwapKeys();
    const preimage = crypto.getRandomValues(new Uint8Array(32));

    const preimageHash = crypto.sha256(preimage).toString("hex");

    const signature = Buffer.from(
      keys.signSchnorr(crypto.sha256(Buffer.from(liquidAddress, "utf-8")))
    ).toString("hex");

    const response = await fetch(
      `${getBoltzApiUrl(process.env.BOLTZ_ENVIRONMENT)}/v2/swap/reverse`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: liquidAddress,
          addressSignature: signature,
          claimPublicKey: publicKey,
          from: "BTC",
          invoiceAmount: swapAmountSats,
          preimageHash: preimageHash,
          to: "L-BTC",
          // referralId: 'blitzWallet',
          description: description || "",
        }),
      }
    );

    const data = await response.json();
    console.log(data);

    return {
      data,
      publicKey,
      privateKey: privateKeyString,
      keys,
      preimage: preimage.toString("hex"),
      liquidAddress,
    };
  } catch (err) {
    console.log(err, "ERR");
    return false;
  }
}
