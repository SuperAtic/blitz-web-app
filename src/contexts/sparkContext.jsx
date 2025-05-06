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
  getSparkBalance,
  getSparkTransactions,
  initializeSparkWallet,
  sparkWallet,
} from "../functions/spark";
import {
  bulkUpdateSparkTransactions,
  getAllSparkTransactions,
  initializeSparkDatabase,
} from "../functions/txStorage";

const SparkContext = createContext();

export const useSpark = () => useContext(SparkContext);

export const SparkProvier = ({ children, navigate }) => {
  const [sparkInformation, setSparkInformation] = useState({
    balance: 0,
    trasactions: [],
    isConnected: null,
  });
  const { authState, mnemoinc } = useAuth();
  const initWalletRef = useRef(null);
  const transactionListeners = useRef(null);

  console.log(sparkInformation, "spark information");

  const handleTransactionUpdate = async (recevedTxId) => {
    try {
      // First we need to get recent spark transfers
      const transactions = await getSparkTransactions(5, undefined);
      console.log(transactions, "stored transactions");
      if (!transactions)
        throw new Error("Unable to get transactions from spark");
      const { transfers } = transactions;
      console.log(transfers, recevedTxId);
      const selectedSparkTransaction = transfers.filter(
        (tx) => tx.id === recevedTxId
      );

      console.log(selectedSparkTransaction, selectedSparkTransaction?.[0]);

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

      if (!selectedSparkTransaction.length)
        throw new Error("Not able to get recent transfer");

      // This will update lightning txs to add the reqiured information but save the payumetn description. And this will add spark or bitcoin transactions since no previous information is added
      const response = await bulkUpdateSparkTransactions(
        selectedSparkTransaction
      );

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
  };

  const setWalletState = async () => {
    const txs = await getAllSparkTransactions();
    const balance = await getSparkBalance();
    console.log(balance?.balance, txs, balance);
    setSparkInformation({
      isConnected: true,
      balance: balance ? balance.balance : 0,
      trasactions: txs,
    });
  };
  useEffect(() => {
    if (!authState.isAuthenticated || !mnemoinc) return;
    if (initWalletRef.current) return;
    initWalletRef.current = true;

    async function initalize() {
      const response = await initializeSparkDatabase();
      await initializeSparkWallet(mnemoinc);

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
    sparkWallet.on("transfer:claimed", (transferId, balance) => {
      console.log(`Transfer ${transferId} claimed. New balance: ${balance}`);
      handleIncomingPayment(transferId);
    });
    sparkWallet.on("deposit:confirmed", (transferId, balance) => {
      console.log(`Transfer ${transferId} claimed. New balance: ${balance}`);
      handleIncomingPayment(transferId);
    });
    return () => {
      sparkWallet.off("transfer:claimed");
      sparkWallet.off("deposit:confirmed");
    };
  }, [sparkInformation]);

  return (
    <SparkContext.Provider value={{ sparkInformation, setSparkInformation }}>
      {children}
    </SparkContext.Provider>
  );
};
