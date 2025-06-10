import { SATSPERBITCOIN } from "../../constants";
import { reverseSwap } from "../boltz/handleClaim";
import { sparkPaymenWrapper } from "../spark/payments";

export default async function processLiquidAddress(input, context) {
  const {
    masterInfoObject,
    comingFromAccept,
    enteredPaymentInfo,
    fiatStats,
    webViewRef,
    fromPage,
    publishMessageFunc,
  } = context;
  let webSocket;
  try {
    let addressInfo = JSON.parse(JSON.stringify(input?.address));
    let paymentFee = 0;
    let supportFee = 0;
    let boltzData;

    if (comingFromAccept) {
      addressInfo.amount = enteredPaymentInfo.amount || "";
      addressInfo.label =
        enteredPaymentInfo.description || input?.address?.label || "";
      addressInfo.message =
        enteredPaymentInfo.description || input?.address?.message || "";
      addressInfo.isBip21 = true;

      const claimInfo = await reverseSwap(
        {
          amount: Number(enteredPaymentInfo.amount),
          description: addressInfo.message,
        },
        addressInfo.address
      );
      boltzData = claimInfo.createdResponse;

      // const { data, publicKey, privateKey, keys, preimage, liquidAddress } =
      //   await contactsLNtoLiquidSwapInfo(
      //     input?.address.address,
      //     Number(enteredPaymentInfo.amount),
      //     enteredPaymentInfo.description || input?.address?.label || ""
      //   );

      // if (!data?.invoice) throw new Error("No Swap invoice genereated");
      // boltzData = data;
      // webSocket = new WebSocket(
      //   `${getBoltzWsUrl(import.meta.env.VITE_BOLTZ_ENVIRONMENT)}`
      // );
      // const didHandle = await handleReverseClaimWSS({
      //   ref: webViewRef,
      //   webSocket: webSocket,
      //   liquidAddress: liquidAddress,
      //   swapInfo: data,
      //   preimage: preimage,
      //   privateKey: privateKey,
      //   fromPage: fromPage,
      //   contactsFunction: publishMessageFunc,
      // });
      // if (!didHandle) throw new Error("Unable to open websocket");

      const fee = await sparkPaymenWrapper({
        getFee: true,
        address: claimInfo.createdResponse.invoice,
        amountSats: Math.round(enteredPaymentInfo.amount),
        paymentType: "lightning",
        masterInfoObject,
      });

      if (!fee.didWork) throw new Error(fee.error);

      paymentFee = fee.fee;
      supportFee = fee.supportFee;
      addressInfo.invoice = claimInfo.createdResponse.invoice;
    } else {
      addressInfo.amount = addressInfo.amountSat;
    }

    const amountSat = addressInfo.amount || "";
    const fiatValue =
      Number(amountSat) / (SATSPERBITCOIN / (fiatStats?.value || 65000));

    return {
      data: addressInfo,
      type: "liquid",
      paymentNetwork: "liquid",
      address: input?.address,
      paymentFee: paymentFee,
      supportFee: supportFee,
      webSocket,
      boltzData,
      sendAmount: !addressInfo.amount
        ? ""
        : `${
            masterInfoObject.userBalanceDenomination != "fiat"
              ? `${amountSat}`
              : fiatValue < 0.01
              ? ""
              : `${fiatValue.toFixed(2)}`
          }`,
      canEditPayment: !addressInfo.isBip21,
    };
  } catch (err) {
    console.log("process liquid invoice error", err);
    webSocket?.close();
    throw new Error(err.message);
  }
}
