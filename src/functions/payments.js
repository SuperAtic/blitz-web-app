import { BLITZ_SUPPORT_DEFAULT_PAYMENT_DESCRIPTION } from "../constants";
import { SPARK_TO_LN_FEE, SPARK_TO_SPARK_FEE } from "../constants/math";
import mergeTransactions from "./copyObject";
import { getSparkTransactions, sendSparkPayment, sparkWallet } from "./spark";
import {
  addSingleSparkTransaction,
  bulkUpdateSparkTransactions,
} from "./txStorage";

export const sparkPaymenWrapper = async ({
  getFee = false,
  address,
  paymentType,
  amountSats = 0,
  exitSpeed = "FAST",
  masterInfoObject = {
    enabledDeveloperSupport: {
      baseFeePercent: 0.004,
      baseFee: 4,
      isEnabled: true,
    },
  },
  fee,
  memo,
  passedSupportFee,
  userBalance = 0,
}) => {
  try {
    console.log("Beginning spark payment");
    if (!sparkWallet) throw new Error("sparkWallet not initialized");
    const supportFee =
      Math.ceil(
        amountSats * masterInfoObject?.enabledDeveloperSupport.baseFeePercent
      ) + masterInfoObject?.enabledDeveloperSupport?.baseFee;

    if (getFee) {
      console.log("Calculating spark payment fee");
      let calculatedFee = 0;
      if (paymentType === "lightning") {
        const routingFee = await sparkWallet.getLightningSendFeeEstimate({
          encodedInvoice: address,
        });
        calculatedFee = routingFee + amountSats * SPARK_TO_LN_FEE;
      } else if (paymentType === "bitcoin") {
        const feeResponse = await sparkWallet.getWithdrawalFeeEstimate({
          amountSats,
          withdrawalAddress: address,
        });
        calculatedFee =
          feeResponse.speedFast.userFee.originalValue +
          feeResponse.speedFast.l1BroadcastFee.originalValue;
      } else {
        // Spark payments
        const feeResponse = await sparkWallet.getSwapFeeEstimate(amountSats);
        calculatedFee =
          feeResponse.feeEstimate.originalValue || SPARK_TO_SPARK_FEE;
      }
      return {
        didWork: true,
        fee: Math.round(calculatedFee),
        supportFee: Math.round(supportFee),
      };
    }

    let response;
    if (userBalance < amountSats + fee) throw new Error("Insufficient funds");

    // Handle the main payment first
    if (paymentType === "lightning") {
      const lightningPayResponse = await sparkWallet.payLightningInvoice({
        invoice: address,
      });

      response = await updatePaymentsState(
        lightningPayResponse,
        null,
        passedSupportFee,
        memo,
        address,
        "PREIMAGE_SWAP"
      );

      // Process support fee in the background if enabled
      if (masterInfoObject?.enabledDeveloperSupport?.isEnabled) {
        processSupportFeeInBackground(
          "lightning",
          response,
          supportFee,
          passedSupportFee
        );
      }
    } else if (paymentType === "bitcoin") {
      const onChainPayResponse = await sparkWallet.withdraw({
        onchainAddress: address,
        exitSpeed,
        amountSats,
      });

      response = await updatePaymentsState(
        onChainPayResponse,
        null,
        passedSupportFee,
        memo,
        address,
        "BITCOIN_WITHDRAWAL"
      );

      // Process support fee in the background if enabled
      if (masterInfoObject?.enabledDeveloperSupport?.isEnabled) {
        processSupportFeeInBackground(
          "bitcoin",
          response,
          supportFee,
          passedSupportFee
        );
      }
    } else {
      const sparkPayResponse = await sendSparkPayment({
        receiverSparkAddress: address,
        amountSats,
      });
      if (!response)
        response = await updatePaymentsState(
          sparkPayResponse,
          null,
          passedSupportFee,
          memo,
          address,
          "SPARK_SEND"
        );

      // Process support fee in the background if enabled
      if (masterInfoObject?.enabledDeveloperSupport?.isEnabled) {
        processSupportFeeInBackground(
          "spark",
          response,
          supportFee,
          passedSupportFee
        );
      }
    }

    return { didWork: true, response };
  } catch (err) {
    console.log("Send lightning payment error", err);
    return { didWork: false, error: err.message };
  }
};

// Helper function to process support fee in the background
const processSupportFeeInBackground = async (
  paymentType,
  mainPaymentResponse,
  supportFee,
  passedSupportFee
) => {
  try {
    const supportFeeResponse = await sendSparkPayment({
      receiverSparkAddress: import.meta.env.VITE_BLITZ_SPARK_ADDRESS,
      amountSats: supportFee,
    });

    // Wait a bit to allow the transaction to be registered
    await new Promise((res) => setTimeout(res, 1000));

    // Get recent transactions to find our support fee transaction
    const transactionResponse = await getSparkTransactions(5);
    if (!transactionResponse) return;

    const { transfers: transactions } = transactionResponse;
    const txHistorySupport =
      transactions.find(
        (tx) =>
          Math.abs(
            new Date(tx.createdTime).getTime() -
              new Date(supportFeeResponse.createdTime).getTime()
          ) < 10000 &&
          (tx.receiverIdentityPublicKey ===
            import.meta.env.VITE_BLITZ_SPARK_PUBKEY ||
            tx.receiver_identity_pubkey ===
              import.meta.env.VITE_BLITZ_SPARK_PUBKEY_OLD)
      ) || {};

    const supportStoredPayment = {
      ...mergeTransactions(supportFeeResponse, txHistorySupport),
      description: BLITZ_SUPPORT_DEFAULT_PAYMENT_DESCRIPTION,
      address: import.meta.env.VITE_BLITZ_SPARK_ADDRESS,
      fee: SPARK_TO_SPARK_FEE,
    };

    // Update just the support fee transaction
    await bulkUpdateSparkTransactions([supportStoredPayment]);

    console.log("Support fee processed successfully in the background");
  } catch (error) {
    console.error("Failed to process support fee in background:", error);
    // Note: We intentionally don't throw the error since this is a background process
    // and shouldn't affect the user's main payment flow
  }
};

export const sparkReceivePaymentWrapper = async ({
  amountSats,
  memo,
  paymentType,
}) => {
  try {
    if (!sparkWallet) throw new Error("sparkWallet not initialized");
    if (paymentType === "lightning") {
      const invoice = await sparkWallet.createLightningInvoice({
        amountSats,
        memo,
      });
      // SAVE TEMP TX TO DATABASE HERE
      const tempTransaction = {
        id: invoice.id,
        senderIdentityPublicKey: "",
        receiverIdentityPublicKey: "",
        status: invoice.status,
        createdTime: invoice.invoice.createdAt,
        updatedTime: invoice.invoice.updatedAt,
        expiryTime: invoice.invoice.expiresAt,
        type: "PREIMAGE_SWAP",
        transferDirection: "INCOMING",
        totalValue: amountSats,
        initial_sent: amountSats,
        description: memo || "",
        fee: 0,
        address: invoice.invoice.encodedInvoice,
      };
      await addSingleSparkTransaction(tempTransaction);
      return {
        didWork: true,
        data: invoice,
        invoice: invoice.invoice.encodedInvoice,
      };
    } else if (paymentType === "bitcoin") {
      // Handle storage of tx when claiming in spark context
      const depositAddress = await sparkWallet.getSingleUseDepositAddress();
      return {
        didWork: true,
        invoice: depositAddress,
      };
    } else {
      // No need to save address since it is constant
      const sparkAddress = await sparkWallet.getSparkAddress();
      return {
        didWork: true,
        invoice: sparkAddress,
      };
    }
  } catch (err) {
    console.log("Receive spark payment error", err);
    return { didWork: false, error: err.message };
  }
};

const updatePaymentsState = async (
  outgoingPayment,
  supportFeePayment,
  fee,
  memo,
  address,
  type
) => {
  try {
    await new Promise((res) => setTimeout(res, 1000));
    const transactionResponse = await getSparkTransactions(5);
    if (!transactionResponse) throw new Error("Not able to get transactions");
    const { transfers: transactions } = transactionResponse;
    const txHistoryOutgoing =
      transactions.find((tx) => {
        return (
          Math.abs(
            new Date(tx.createdTime).getTime() -
              new Date(outgoingPayment.createdAt).getTime()
          ) < 10000 &&
          tx.receiverIdentityPublicKey !==
            import.meta.env.VITE_BLITZ_SPARK_PUBKEY &&
          tx.receiver_identity_pubkey !==
            import.meta.env.VITE_BLITZ_SPARK_PUBKEY_OLD
        );
      }) || {};

    const storedPayment = {
      ...mergeTransactions(outgoingPayment, txHistoryOutgoing),
      fee: fee,
      address,
      description: memo,
    };

    const updates = supportFeePayment
      ? [
          storedPayment,
          {
            ...mergeTransactions(supportFeePayment, {}),
            description: BLITZ_SUPPORT_DEFAULT_PAYMENT_DESCRIPTION,
            address: import.meta.env.VITE_BLITZ_SPARK_ADDRESS,
            fee: SPARK_TO_SPARK_FEE,
          },
        ]
      : [storedPayment];

    console.log(updates, "payment storage object updates");
    await bulkUpdateSparkTransactions(updates);
    return storedPayment;
  } catch (err) {
    console.log("update payment state error", err);
    return outgoingPayment;
  }
};
