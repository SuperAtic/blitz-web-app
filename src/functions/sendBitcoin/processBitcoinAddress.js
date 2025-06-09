import { SATSPERBITCOIN } from "../../constants";
import { sparkPaymenWrapper } from "../spark/payments";

export default async function processBitcoinAddress(input, context) {
  const { masterInfoObject, comingFromAccept, enteredPaymentInfo, fiatStats } =
    context;

  const amountSat = comingFromAccept
    ? enteredPaymentInfo.amount
    : input.address.amountSat || 0;

  const fiatValue =
    Number(amountSat) / (SATSPERBITCOIN / (fiatStats?.value || 65000));
  let newPaymentInfo = {
    address: input.address.address,
    amount: amountSat,
    label: input.address.label || "",
  };
  let paymentFee = 0;
  let supportFee = 0;
  if (amountSat) {
    const paymentFeeResponse = await sparkPaymenWrapper({
      getFee: true,
      address: input.address.address,
      paymentType: "bitcoin",
      amountSats: amountSat,
      masterInfoObject,
    });

    if (!paymentFeeResponse.didWork) throw new Error(paymentFeeResponse.error);

    paymentFee = paymentFeeResponse.fee;
    supportFee = paymentFeeResponse.supportFee;
  }

  return {
    data: newPaymentInfo,
    type: "Bitcoin",
    paymentNetwork: "Bitcoin",
    address: input.address.address,
    paymentFee: paymentFee,
    supportFee: supportFee,
    address: input.address.address,
    sendAmount: !amountSat
      ? ""
      : `${
          masterInfoObject.userBalanceDenomination != "fiat"
            ? `${amountSat}`
            : fiatValue < 0.01
            ? ""
            : `${fiatValue.toFixed(2)}`
        }`,
    canEditPayment: comingFromAccept || input.address.amountSat ? false : true,
  };
}
