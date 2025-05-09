import { decode } from "light-bolt11-decoder";
import { sparkPaymenWrapper } from "./payments";
export async function processInputType(address, paymentInfo) {
  try {
    if (address.toLowerCase().startsWith("lnbc")) {
      return await decodeLNPayment(address);
    } else if (address.toLowerCase().startsWith("sp1pg")) {
      return await decodeSparkPayment(address, paymentInfo);
    } else {
      return null;
    }
  } catch (err) {
    console.log("process input type error", err);
  }
}
async function decodeLNPayment(address) {
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
      amount:
        decoded.sections.find((item) => item.name === "amount").value / 1000,
      description: decoded.sections.find((item) => item.name === "description")
        .value,
      fee: feeResponse.fee,
      supportFee: feeResponse.supportFee,
      paymentType: "lightning",
      canEdit: false,
    };
  } catch (error) {
    console.log("bolt11 decode error", error);
    return false;
  }
}

async function decodeSparkPayment(address, paymentInfo) {
  try {
    let fee = 0;
    let supportFee = 0;

    console.log(address, paymentInfo, !!Object.keys(paymentInfo).length);

    if (Object.keys(paymentInfo).length) {
      const feeResponse = await sparkPaymenWrapper({
        getFee: true,
        address: address,
        paymentType: "spark",
        amountSats: Number(paymentInfo.amount),
      });

      if (!feeResponse.didWork) throw new Error(feeResponse.error);
      fee = feeResponse.fee;
      supportFee = feeResponse.supportFee;
    }

    return {
      invoice: address,
      amount: Object.keys(paymentInfo).length ? paymentInfo.amount : "",
      description: "",
      fee,
      supportFee,
      paymentType: "spark",
      canEdit: !Object.keys(paymentInfo).length,
    };
  } catch (error) {
    console.log("spark decode error", error);
    return false;
  }
}
