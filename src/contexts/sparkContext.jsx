import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import Storage from "../functions/localStorage";
import { useAuth } from "./authContext";
import {
  getSparkAddress,
  getSparkBalance,
  getSparkIdentityPublicKey,
  getSparkTransactions,
  initializeSparkWallet,
  sparkWallet,
  useSparkPaymentType,
} from "../functions/spark";
import {
  bulkUpdateSparkTransactions,
  getAllSparkTransactions,
  initializeSparkDatabase,
  SPARK_TX_UPDATE_ENVENT_NAME,
  sparkTransactionsEventEmitter,
} from "../functions/txStorage";
import { restoreSparkTxState } from "../functions/restore";
import mergeTransactions from "../functions/copyObject";

const SparkContext = createContext();

export const useSpark = () => useContext(SparkContext);

export const SparkProvier = ({ children, navigate }) => {
  const [sparkInformation, setSparkInformation] = useState({
    balance: 0,
    trasactions: [],
    isConnected: null,
    pubKey: "",
    sparkAddress: "",
  });

  const clearSparkSession = () => {
    initWalletRef.current = false;
    setSparkInformation({
      balance: 0,
      trasactions: [],
      isConnected: null,
      pubKey: "",
      sparkAddress: "",
    });
  };

  const { authState, mnemoinc } = useAuth();
  const initWalletRef = useRef(null);
  const transactionListeners = useRef(null);

  console.log(sparkInformation, "spark information");

  const handleTransactionUpdate = async (recevedTxId) => {
    try {
      // First we need to get recent spark transfers
      const [transactions, txs] = await Promise.all([
        getSparkTransactions(5, undefined),
        getAllSparkTransactions(),
      ]);

      console.log(transactions, "stored transactions");
      if (!transactions)
        throw new Error("Unable to get transactions from spark");
      const { transfers } = transactions;
      console.log(transfers, recevedTxId);
      const selectedSparkTransaction = transfers.find(
        (tx) => tx.id === recevedTxId
      );

      // Posibly need to format spark transactions to match DB
      // {
      //   id: string;
      //   senderIdentityPublicKey: string;
      //   receiverIdentityPublicKey: string;
      //   status: string;
      //   createdTime: number | string; // timestamp or ISO string
      //   updatedTime?: number | string;
      //   type: string;
      //   transferDirection: string;
      //   totalValue: number;
      //   initial_sent?: number;
      //   description?: string;
      //   fee?: number;
      // }

      if (!selectedSparkTransaction || !txs)
        throw new Error("Not able to get recent transfer");

      const savedTransaction =
        txs.find((tx) => {
          return (
            tx.total_sent == selectedSparkTransaction?.totalValue &&
            tx.type == selectedSparkTransaction?.type &&
            tx.transfer_direction == selectedSparkTransaction?.transferDirection
          );
        }) || {};

      const merged = mergeTransactions(
        savedTransaction,
        selectedSparkTransaction
      );

      // This will update lightning txs to add the reqiured information but save the payumetn description. And this will add spark or bitcoin transactions since no previous information is added
      const response = await bulkUpdateSparkTransactions([merged]);

      console.log("bulnk update response", response);
      if (response) {
        const txs = await getAllSparkTransactions();
        return txs;
      } else false;
    } catch (err) {
      console.log("Handle incoming transaction error", err);
    }
  };
  const handleIncomingPayment = async (transferId) => {
    const balance = (await getSparkBalance()) || { balance: 0 };
    const storedTransaction = await handleTransactionUpdate(transferId);
    setSparkInformation((prev) => {
      return {
        ...prev,
        balance: balance.balance,
        trasactions: storedTransaction ? storedTransaction : prev.trasactions,
      };
    });
    //Go to confirm page when receiving new tx
    const tx = storedTransaction.find((item) => item.spark_id === transferId);

    navigate("/confirm-page", {
      state: {
        for: "invoicePaid",
        information: {
          error: "",
          fee: 0,
          type: useSparkPaymentType(tx),
          totalValue: tx.total_sent,
        },
      },
    });
  };

  const setWalletState = async () => {
    const txs = await getAllSparkTransactions();
    const balance = await getSparkBalance();
    const id = await getSparkIdentityPublicKey();
    const sparkAddress = await getSparkAddress();
    console.log(balance?.balance, txs, balance);
    setSparkInformation({
      isConnected: true,
      balance: balance ? balance.balance : 0,
      trasactions: txs,
      pubKey: id,
      sparkAddress,
    });
  };
  useEffect(() => {
    if (!authState.isAuthenticated || !mnemoinc) return;
    if (initWalletRef.current) return;
    initWalletRef.current = true;

    async function initalize() {
      const response = await initializeSparkDatabase();
      await initializeSparkWallet(mnemoinc);
      const restored = await restoreSparkTxState();
      console.log(restored);
      await bulkUpdateSparkTransactions(restored.txs);

      if (response) {
        setWalletState();
      }
    }
    initalize();
  }, [authState]);

  useEffect(() => {
    if (!sparkInformation.isConnected) return;
    if (transactionListeners.current) return;
    transactionListeners.current = true;
    console.log("Adding event listeners...");

    sparkTransactionsEventEmitter.on(
      SPARK_TX_UPDATE_ENVENT_NAME,
      setWalletState
    );
    sparkWallet.on("transfer:claimed", (transferId, balance) => {
      console.log(`Transfer ${transferId} claimed. New balance: ${balance}`);
      handleIncomingPayment(transferId);
    });
    sparkWallet.on("deposit:confirmed", (transferId, balance) => {
      console.log(`Transfer ${transferId} claimed. New balance: ${balance}`);
      handleIncomingPayment(transferId);
    });
    return () => {
      // console.log("removing event listeners...");
      // sparkWallet.off("transfer:claimed");
      // sparkWallet.off("deposit:confirmed");
    };
  }, [sparkInformation]);

  return (
    <SparkContext.Provider
      value={{ sparkInformation, setSparkInformation, clearSparkSession }}
    >
      {children}
    </SparkContext.Provider>
  );
};
