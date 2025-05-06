import * as bip21 from "bip21";
import { sparkReceivePaymentWrapper } from "./payments";
import customUUID from "./customUUID";
import { deleteSparkTransactionTable } from "./txStorage";

let invoiceTracker = [];
export async function initializeAddressProcess(wolletInfo) {
  console.log("ADDRESS");

  const { setAddressState, selectedRecieveOption } = wolletInfo;
  const requestUUID = customUUID();
  invoiceTracker.push(requestUUID);
  let stateTracker = {};
  let hasGlobalError = false;
  try {
    setAddressState((prev) => {
      return {
        ...prev,
        isGeneratingInvoice: true,
        generatedAddress: "",
        errorMessageText: {
          type: null,
          text: "",
        },
        swapPegInfo: {},
        isReceivingSwap: false,
        hasGlobalError: false,
      };
    });
    if (selectedRecieveOption.toLowerCase() === "lightning") {
      const response = await sparkReceivePaymentWrapper({
        paymentType: "lightning",
        amountSats: wolletInfo.receivingAmount,
        memo: wolletInfo.description,
      });
      // const response = await generateLightningAddress(wolletInfo);
      if (!response.didWork) throw new Error("Error with lightning");
      stateTracker = {
        generatedAddress: response.invoice,
        fee: 0,
      };
      // stateTracker = response
    } else if (selectedRecieveOption.toLowerCase() === "bitcoin") {
      const response = await sparkReceivePaymentWrapper({
        paymentType: "bitcoin",
        amountSats: wolletInfo.receivingAmount,
        memo: wolletInfo.description,
      });
      // const response = await generateBitcoinAddress(wolletInfo);
      if (!response.didWork) throw new Error("Error with bitcoin");
      stateTracker = {
        generatedAddress: bip21.encode(response.invoice, {
          amount: wolletInfo.receivingAmount,
          label: wolletInfo.description,
          message: wolletInfo.description,
        }),
        fee: 0,
      };
      // stateTracker = response;
    } else if (selectedRecieveOption.toLowerCase() === "spark") {
      const response = await sparkReceivePaymentWrapper({
        paymentType: "spark",
        amountSats: wolletInfo.receivingAmount,
        memo: wolletInfo.description,
      });
      // const response = await generateBitcoinAddress(wolletInfo);
      if (!response.didWork) throw new Error("Error with spark");
      stateTracker = {
        generatedAddress: response.invoice,
        fee: 0,
      };
    } else {
      const response = await generateLiquidAddress(wolletInfo);
      if (!response) throw new Error("Error with bitcoin");
      stateTracker = response;
    }
  } catch (error) {
    console.log(error, "HANDLING ERROR");
    stateTracker = {
      generatedAddress: null,
      errorMessageText: {
        type: "stop",
        text: error.message,
      },
    };
  } finally {
    if (invoiceTracker.length > 3) invoiceTracker = [invoiceTracker.pop()];
    if (invoiceTracker[invoiceTracker.length - 1] != requestUUID) return;
    if (hasGlobalError) {
      setAddressState((prev) => {
        return {
          ...prev,
          hasGlobalError: true,
          isGeneratingInvoice: false,
        };
      });
    } else {
      setAddressState((prev) => {
        return {
          ...prev,
          ...stateTracker,
          isGeneratingInvoice: false,
        };
      });
    }
  }
}
