import { SATSPERBITCOIN } from "../../constants";
import { sparkPaymenWrapper } from "../spark/payments";

export default async function processBolt11Invoice(input, context) {
  const { masterInfoObject, comingFromAccept, enteredPaymentInfo, fiatStats } =
    context;

  const currentTime = Math.floor(Date.now() / 1000);
  const expirationTime = input.invoice.timestamp + input.invoice.expiry;
  const isExpired = currentTime > expirationTime;
  if (isExpired) throw new Error("This lightning invoice has expired");

  const amountMsat = comingFromAccept
    ? enteredPaymentInfo.amount * 1000
    : input.invoice.amountMsat;
  const fiatValue =
    !!amountMsat &&
    Number(amountMsat / 1000) / (SATSPERBITCOIN / (fiatStats?.value || 65000));

  let fee = { fee: 0, supportFee: 0 };
  if (amountMsat) {
    fee = await sparkPaymenWrapper({
      getFee: true,
      address: input.invoice.bolt11,
      amountSats: Math.round(input.invoice.amountMsat / 1000),
      paymentType: "lightning",
      masterInfoObject,
    });
    if (!fee.didWork) throw new Error(fee.error);
  }

  return {
    data: input,
    type: "bolt11",
    paymentNetwork: "lightning",
    paymentFee: fee.fee,
    supportFee: fee.supportFee,
    address: input.invoice.bolt11,
    sendAmount: !amountMsat
      ? ""
      : `${
          masterInfoObject.userBalanceDenomination != "fiat"
            ? `${Math.round(amountMsat / 1000)}`
            : `${fiatValue.toFixed(2)}`
        }`,
    canEditPayment: comingFromAccept ? false : !amountMsat,
  };
}
