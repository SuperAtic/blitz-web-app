import { decode } from "light-bolt11-decoder";
import { sparkPaymenWrapper } from "./payments";

export async function decodeLNPayment(address) {
  try {
    const decoded = decode(address.toLowerCase());

    const feeResponse = await sparkPaymenWrapper({
      getFee: true,
      address: decoded.paymentRequest,
      paymentType: "lightning",
      amountSats:
        decoded.sections.find((item) => item.name === "amount").value / 1000,
    });

    if (!feeResponse.didWork) throw new Error(feeResponse.error);

    return {
      invoice: decoded.paymentRequest,
      amount: decoded.sections.find((item) => item.name === "amount").value,
      description: decoded.sections.find((item) => item.name === "description")
        .value,
      fee: feeResponse.fee,
      supportFee: feeResponse.supportFee,
      paymentType: "lightning",
    };
  } catch (error) {
    console.log("bolt11 decode error", error);
    throw new Error(error.message);
  }
}
