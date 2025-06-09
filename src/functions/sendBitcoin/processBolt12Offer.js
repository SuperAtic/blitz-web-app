// import { SATSPERBITCOIN } from "../../constants";

// export default function processBolt12Offer(input, context) {
//   const {
//     nodeInformation,
//     masterInfoObject,
//     navigate,
//     goBackFunction,
//     comingFromAccept,
//     enteredPaymentInfo,
//     sdk,
//   } = context;
//   try {
//     const amountMsat = comingFromAccept ? enteredPaymentInfo.amount * 1000 : 0;
//     const fiatValue =
//       !!amountMsat &&
//       Number(amountMsat / 1000) /
//         (SATSPERBITCOIN / (nodeInformation.fiatStats?.value || 65000));

//     return {
//       data: input,
//       type: "bolt12offer",
//       paymentNetwork: "lightning",
//       sendAmount: !amountMsat
//         ? ""
//         : `${
//             masterInfoObject.userBalanceDenomination != "fiat"
//               ? `${Math.round(amountMsat / 1000)}`
//               : fiatValue < 0.01
//               ? ""
//               : `${fiatValue.toFixed(2)}`
//           }`,
//       canEditPayment: comingFromAccept ? false : !amountMsat,
//     };
//   } catch (err) {
//     console.log("process bolt12 invoice error", err);
//   }
// }
