import { getLatestDepositTxId, SparkWallet } from "@buildonspark/spark-sdk";
import { getAllSparkTransactions } from "./txStorage";
import { TransferType } from "@buildonspark/spark-sdk/proto/spark";
// import {
//   BLITZ_SUPPORT_DEFAULT_PAYMENT_DESCRIPTION,
//   IS_DONTATION_PAYMENT_BUFFER,
// } from "../../constants";

export let sparkWallet = null;

export const initializeSparkWallet = async (mnemonic) => {
  try {
    const { wallet: w } = await SparkWallet.initialize({
      mnemonicOrSeed: mnemonic,
      options: { network: "MAINNET" },
    });
    sparkWallet = w;

    console.log("Wallet initialized:");
    return { isConnected: true };
  } catch (err) {
    console.log("Initialize spark wallet error", err);
    return { isConnected: false }; //make sure to switch back to false
  }
};
export const sparkListeners = async () => {
  try {
    if (!sparkWallet) throw new Error("sparkWallet not initialized");
    return await sparkWallet.listeners("transfer:claimed");
  } catch (err) {
    console.log("Get spark balance error", err);
  }
};
export const removeTransferClaimed = async () => {
  try {
    if (!sparkWallet) throw new Error("sparkWallet not initialized");
    const [transferClaimedListener] = await sparkListeners();
    return sparkWallet.off("transfer:claimed", transferClaimedListener);
  } catch (err) {
    console.log("Get spark balance error", err);
  }
};
export const cleanupSparkConnections = async () => {
  try {
    if (!sparkWallet) throw new Error("sparkWallet not initialized");
    return await sparkWallet.cleanupConnections();
  } catch (err) {
    console.log("Get spark balance error", err);
  }
};
export const getSparkLightningSendRequest = async (id) => {
  try {
    if (!sparkWallet) throw new Error("sparkWallet not initialized");
    return await sparkWallet.getLightningSendRequest(id);
  } catch (err) {
    console.log("Get spark balance error", err);
  }
};
export const getSparkCooperativeExitRequest = async (id) => {
  try {
    if (!sparkWallet) throw new Error("sparkWallet not initialized");
    return await sparkWallet.getCoopExitRequest(id);
  } catch (err) {
    console.log("Get spark balance error", err);
  }
};

export const getSparkIdentityPublicKey = async () => {
  try {
    if (!sparkWallet) throw new Error("sparkWallet not initialized");
    return await sparkWallet.getIdentityPublicKey();
  } catch (err) {
    console.log("Get spark balance error", err);
  }
};

export const getSparkLightningRequest = async (requestID) => {
  try {
    if (!sparkWallet) throw new Error("sparkWallet not initialized");
    return await sparkWallet.getLightningReceiveRequest(requestID);
  } catch (err) {
    console.log("Get spark balance error", err);
  }
};
export const getSparkBalance = async () => {
  try {
    if (!sparkWallet) throw new Error("sparkWallet not initialized");
    const balance = await sparkWallet.getBalance();
    return balance;
  } catch (err) {
    console.log("Get spark balance error", err);
  }
};

export const getSparkBitcoinL1Address = async () => {
  try {
    if (!sparkWallet) throw new Error("sparkWallet not initialized");
    return await sparkWallet.getSingleUseDepositAddress();
  } catch (err) {
    console.log("Get Bitcoin mainchain address error", err);
  }
};
export const getUnusedSparkBitcoinL1Address = async () => {
  try {
    if (!sparkWallet) throw new Error("sparkWallet not initialized");
    return (await sparkWallet.getUnusedDepositAddresses()) || [];
  } catch (err) {
    console.log("Get Bitcoin mainchain address error", err);
  }
};

export const querySparkBitcoinL1Transaction = async (depositAddress) => {
  try {
    if (!sparkWallet) throw new Error("sparkWallet not initialized");
    return await getLatestDepositTxId(depositAddress);
  } catch (err) {
    console.log("Get latest deposit address information error", err);
  }
};

export const claimSparkBitcoinL1Transaction = async (depositAddress) => {
  try {
    if (!sparkWallet) throw new Error("sparkWallet not initialized");
    const txId = await querySparkBitcoinL1Transaction(depositAddress);
    return await Promise.all([
      txId ? sparkWallet.claimDeposit(txId) : Promise.resolve(null),
    ]);
  } catch (err) {
    console.log("Claim bitcoin mainnet payment error", err);
  }
};
export const claimSparkBitcoinL1TransactionWithTxID = async (txid) => {
  try {
    if (!sparkWallet) throw new Error("sparkWallet not initialized");
    const response = await sparkWallet.claimDeposit(txid);
    return response;
  } catch (err) {
    console.log("Claim bitcoin mainnet payment error", err);
  }
};
export const getSparkAddress = async () => {
  try {
    if (!sparkWallet) throw new Error("sparkWallet not initialized");
    return await sparkWallet.getSparkAddress();
  } catch (err) {
    console.log("Get spark address error", err);
  }
};

export const sendSparkPayment = async ({
  receiverSparkAddress,
  amountSats,
}) => {
  try {
    if (!sparkWallet) throw new Error("sparkWallet not initialized");
    return await sparkWallet.transfer({ receiverSparkAddress, amountSats });
  } catch (err) {
    console.log("Send spark payment error", err);
    throw new Error(err.message);
  }
};

export const sendSparkTokens = async ({
  tokenPublicKey,
  tokenAmount,
  receiverSparkAddress,
}) => {
  try {
    if (!sparkWallet) throw new Error("sparkWallet not initialized");
    return await sparkWallet.transferTokens({
      tokenPublicKey,
      tokenAmount,
      receiverSparkAddress,
    });
  } catch (err) {
    console.log("Send spark token error", err);
  }
};

export const getSparkLightningPaymentFeeEstimate = async (invoice) => {
  try {
    if (!sparkWallet) throw new Error("sparkWallet not initialized");
    return await sparkWallet.getLightningSendFeeEstimate({
      encodedInvoice: invoice,
    });
  } catch (err) {
    console.log("Get lightning payment fee error", err);
  }
};

export const getSparkBitcoinPaymentFeeEstimate = async ({
  amountSats,
  withdrawalAddress,
}) => {
  try {
    if (!sparkWallet) throw new Error("sparkWallet not initialized");
    return await sparkWallet.getCoopExitFeeEstimate({
      amountSats,
      withdrawalAddress,
    });
  } catch (err) {
    console.log("Get bitcoin payment fee estimate error", err);
  }
};

export const getSparkPaymentFeeEstimate = async (amountSats) => {
  try {
    if (!sparkWallet) throw new Error("sparkWallet not initialized");
    const feeResponse = await sparkWallet.getSwapFeeEstimate(amountSats);
    return feeResponse.feeEstimate.originalValue || SPARK_TO_SPARK_FEE;
  } catch (err) {
    console.log("Get bitcoin payment fee estimate error", err);
  }
};

export const receiveSparkLightningPayment = async ({ amountSats, memo }) => {
  try {
    if (!sparkWallet) throw new Error("sparkWallet not initialized");
    return await sparkWallet.createLightningInvoice({ amountSats, memo });
  } catch (err) {
    console.log("Receive lightning payment error", err);
  }
};

export const getSparkLightningPaymentStatus = async ({
  lightningInvoiceId,
}) => {
  try {
    if (!sparkWallet) throw new Error("sparkWallet not initialized");
    return await sparkWallet.getLightningReceiveRequest(lightningInvoiceId);
  } catch (err) {
    console.log("Get lightning payment status error", err);
  }
};

export const sendSparkLightningPayment = async ({ invoice, maxFeeSats }) => {
  try {
    if (!sparkWallet) throw new Error("sparkWallet not initialized");
    return await sparkWallet.payLightningInvoice({ invoice });
  } catch (err) {
    console.log("Send lightning payment error", err);
  }
};

export const getSparkTransactions = async (
  transferCount = 100,
  offsetIndex
) => {
  try {
    if (!sparkWallet) throw new Error("sparkWallet not initialized");
    return await sparkWallet.getTransfers(transferCount, offsetIndex);
  } catch (err) {
    console.log("Send lightning payment error", err);
  }
};
export const getCachedSparkTransactions = async () => {
  try {
    if (!sparkWallet) throw new Error("sparkWallet not initialized");
    const txResponse = await getAllSparkTransactions();
    if (!txResponse) throw new Error("Unable to get cached spark transactins");
    return txResponse;
  } catch (err) {
    console.log("Send lightning payment error", err);
  }
};
export const useSparkPaymentType = (tx) => {
  try {
    const isLightningPayment = tx.type === "PREIMAGE_SWAP";
    const isBitcoinPayment = tx.type == "COOPERATIVE_EXIT";
    const isSparkPayment = tx.type === "TRANSFER";

    return isLightningPayment
      ? "lightning"
      : isBitcoinPayment
      ? "bitcoin"
      : "spark";
  } catch (err) {
    console.log("Error finding which payment method was used", err);
  }
};

export const useIsSparkPaymentPending = (tx, transactionPaymentType) => {
  try {
    return (
      (transactionPaymentType === "bitcoin" &&
        tx.status === "TRANSFER_STATUS_SENDER_KEY_TWEAK_PENDING") ||
      (transactionPaymentType === "spark" &&
        (tx.status === "TRANSFER_STATUS_SENDER_KEY_TWEAKED" ||
          tx.status === "CREATING")) ||
      (transactionPaymentType === "lightning" &&
        tx.status === "LIGHTNING_PAYMENT_INITIATED")
    );
  } catch (err) {
    console.log("Error finding is payment method is pending", err);
    return "";
  }
};

export const useIsSparkPaymentFailed = (tx, transactionPaymentType) => {
  try {
    return (
      (transactionPaymentType === "bitcoin" &&
        tx.status === "TRANSFER_STATUS_RETURNED") ||
      (transactionPaymentType === "spark" &&
        tx.status === "TRANSFER_STATUS_RETURNED") ||
      (transactionPaymentType === "lightning" &&
        tx.status === "LIGHTNING_PAYMENT_INITIATED")
    );
  } catch (err) {
    console.log("Error finding is payment method is pending", err);
    return "";
  }
};

export const isSparkDonationPayment = (currentTx, lastTx) => {
  try {
    const currentTxTime = currentTx.created_at_time;
    const lastTxTime = lastTx.created_at_time;
    const differnce = Math.abs(currentTxTime - lastTxTime);
    const isUnmarkedDonation =
      differnce <= IS_DONTATION_PAYMENT_BUFFER &&
      tx?.receiverIdentityPublicKey === process.env.BLITZ_SPARK_PUBLICKEY;
    return (
      isUnmarkedDonation ||
      currentTx.description === BLITZ_SUPPORT_DEFAULT_PAYMENT_DESCRIPTION
    );
  } catch (err) {
    console.log("Error finding is payment method is pending", err);
    return false;
  }
};
