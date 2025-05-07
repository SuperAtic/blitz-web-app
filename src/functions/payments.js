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
}) => {
  try {
    console.log("Begining spark payment");
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
      return { didWork: true, fee: Math.round(calculatedFee + supportFee) };
    }

    let response;
    let supportFeeResponse;

    if (paymentType === "lightning") {
      const [lightningPayResponse, supportFeeRes] = await Promise.all([
        sparkWallet.payLightningInvoice({
          invoice: address,
        }),
        masterInfoObject?.enabledDeveloperSupport?.isEnabled
          ? sendSparkPayment({
              receiverSparkAddress: import.meta.env.VITE_BLITZ_SPARK_ADDRESS,
              amountSats: supportFee,
            })
          : Promise.resolve(null),
      ]);
      supportFeeResponse = supportFeeRes;
      response = await updatePaymentsState(
        lightningPayResponse,
        supportFeeRes,
        fee,
        memo,
        address,
        "PREIMAGE_SWAP"
      );
    } else if (paymentType === "bitcoin") {
      // make sure to import exist speed
      const [onChainPayResponse, supportFeeRes] = await Promise.all([
        sparkWallet.withdraw({
          onchainAddress: address,
          exitSpeed,
          amountSats,
        }),
        masterInfoObject?.enabledDeveloperSupport?.isEnabled
          ? sendSparkPayment({
              receiverSparkAddress: import.meta.env.VITE_BLITZ_SPARK_ADDRESS,
              amountSats: supportFee,
            })
          : Promise.resolve(null),
      ]);
      supportFeeResponse = supportFeeRes;
      response = await updatePaymentsState(
        onChainPayResponse,
        supportFeeRes,
        fee,
        memo,
        address,
        "BITCOIN_WITHDRAWAL"
      );
    } else {
      const [sparkPayResponse, supportFeeRes] = await Promise.all([
        sendSparkPayment({ receiverSparkAddress: address, amountSats }),
        masterInfoObject?.enabledDeveloperSupport?.isEnabled
          ? sendSparkPayment({
              receiverSparkAddress: import.meta.env.VITE_BLITZ_SPARK_ADDRESS,
              amountSats: supportFee,
            })
          : Promise.resolve(null),
      ]);

      supportFeeResponse = supportFeeRes;
      response = await updatePaymentsState(
        sparkPayResponse,
        supportFeeRes,
        fee,
        memo,
        address,
        "SPARK_SEND"
      );
    }

    return { didWork: true, response, supportFeeResponse };
  } catch (err) {
    console.log("Send lightning payment error", err);
    return { didWork: false, error: err.message };
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
      console.log("SAVING");
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
        transferDirection: "OUTGOING",
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
  outgoinPayment,
  supportFeePayment,
  fee,
  memo,
  address,
  type
) => {
  try {
    await new Promise((res) => setTimeout(res, 1000));
    const transactionResponse = await getSparkTransactions(5);
    if (!transactionResponse) throw new Error("Not able to get transactins");
    const { transfers: transactions } = transactionResponse;

    const txHistoryOutgoing =
      transactions.find((tx) => {
        return (
          Math.abs(
            new Date(tx.createdTime).getTime() -
              new Date(outgoinPayment.createdAt).getTime()
          ) < 10000 &&
          tx.receiverIdentityPublicKey !==
            import.meta.env.VITE_BLITZ_SPARK_PUBKEY
        );
      }) || {};
    const txHistorySupport = supportFeePayment
      ? transactions.find(
          (tx) =>
            Math.abs(
              new Date(tx.createdTime).getTime() -
                new Date(supportFeePayment.createdTime).getTime()
            ) < 10000 &&
            tx.receiverIdentityPublicKey ===
              import.meta.env.VITE_BLITZ_SPARK_PUBKEY
        ) || {}
      : null;

    const storedPayment = {
      ...mergeTransactions(outgoinPayment, txHistoryOutgoing),
      fee: fee,
      address,
      description: memo,
    };
    const supportStoredPayment = supportFeePayment
      ? {
          ...mergeTransactions(supportFeePayment, txHistorySupport),
          description: BLITZ_SUPPORT_DEFAULT_PAYMENT_DESCRIPTION,
          address: import.meta.env.VITE_BLITZ_SPARK_ADDRESS,
          fee: SPARK_TO_SPARK_FEE,
        }
      : null;

    const updates = supportStoredPayment
      ? [storedPayment, supportStoredPayment]
      : [storedPayment];

    console.log(updates, "payment storeage objesct updates");
    await bulkUpdateSparkTransactions(updates);

    return storedPayment;
  } catch (err) {
    console.log("update payment state error", err);
    return outgoinPayment;
  }
};
