import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";

import { useAuth } from "./authContext";
import {
  claimSparkBitcoinL1Transaction,
  getSparkAddress,
  getSparkBalance,
  getSparkIdentityPublicKey,
  getSparkTransactions,
  getUnusedSparkBitcoinL1Address,
  initializeSparkWallet,
  querySparkBitcoinL1Transaction,
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
import { getLatestDepositTxId } from "@buildonspark/spark-sdk";

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
  const depositAddressIntervalRef = useRef(null);

  const handleTransactionUpdate = async (recevedTxId) => {
    try {
      // First we need to get recent spark transfers
      const [transactions, txs] = await Promise.all([
        getSparkTransactions(5, undefined),
        getAllSparkTransactions(),
      ]);

      if (!transactions)
        throw new Error("Unable to get transactions from spark");
      const { transfers } = transactions;

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
      const connectionResponse = await initializeSparkWallet(mnemoinc);

      if (response && connectionResponse.isConnected) {
        const restored = await restoreSparkTxState();

        await bulkUpdateSparkTransactions(restored.txs);
        setWalletState();
      } else {
        setSparkInformation((prev) => ({
          ...prev,
          isConnected: false,
        }));
      }
    }
    initalize();
  }, [authState]);

  // useEffect(() => {
  //   if (!sparkInformation.isConnected) return;
  //   if (transactionListeners.current) return;
  //   transactionListeners.current = true;
  //   console.log("Adding event listeners...");

  //   sparkTransactionsEventEmitter.on(
  //     SPARK_TX_UPDATE_ENVENT_NAME,
  //     setWalletState
  //   );
  //   sparkWallet.on("transfer:claimed", (transferId, balance) => {
  //     console.log(`Transfer ${transferId} claimed. New balance: ${balance}`);
  //     handleIncomingPayment(transferId);
  //   });
  //   sparkWallet.on("deposit:confirmed", (transferId, balance) => {
  //     console.log(`Transfer ${transferId} claimed. New balance: ${balance}`);
  //     handleIncomingPayment(transferId);
  //   });
  //   return () => {
  //     // console.log("removing event listeners...");
  //     // sparkWallet.off("transfer:claimed");
  //     // sparkWallet.off("deposit:confirmed");
  //   };
  // }, [sparkInformation]);

  useEffect(() => {
    const onTransferClaimed = (transferId, balance) => {
      console.log(`Transfer ${transferId} claimed. New balance: ${balance}`);
      handleIncomingPayment(transferId);
    };

    const onDepositConfirmed = (transferId, balance) => {
      console.log(`Deposit ${transferId} confirmed. New balance: ${balance}`);
      handleIncomingPayment(transferId);
    };

    const addListeners = async () => {
      console.log("Adding listeners...");
      sparkWallet.on("transfer:claimed", onTransferClaimed);
      sparkWallet.on("deposit:confirmed", onDepositConfirmed);
      console.log("Listeners added");
      if (!transactionListeners.current) {
        console.log("blocking first listeners run");
        transactionListeners.current = true;
        return;
      }
      const restored = await restoreSparkTxState();
      console.log(restored, "restore resposne");
      if (restored.txs.length) {
        await bulkUpdateSparkTransactions(restored.txs);
        const tx = restored.txs[0];
        console.log(tx, "got transaction");
        navigate("/confirm-page", {
          state: {
            for:
              tx.transfer_direction === "INCOMING"
                ? "invoicePaid"
                : "paymentsucceed",
            information: {
              error: "",
              fee: 0,
              type: useSparkPaymentType(tx),
              totalValue: tx.totalValue,
            },
          },
        });
      }

      console.log(transactionListeners.current);
    };

    const removeListeners = () => {
      console.log("removing listeners...");
      sparkWallet.off("transfer:claimed", onTransferClaimed);
      sparkWallet.off("deposit:confirmed", onDepositConfirmed);
      console.log("Listeners removed");
    };

    const handleTabBlur = () => removeListeners();
    const handleTabFocus = () => addListeners();
    const handleBeforeUnload = () => removeListeners();

    if (!sparkWallet) return;

    // Initial attach
    addListeners();
    window.addEventListener("blur", handleTabBlur);
    window.addEventListener("focus", handleTabFocus);
    window.addEventListener("beforeunload", handleBeforeUnload);
    sparkTransactionsEventEmitter.on(
      SPARK_TX_UPDATE_ENVENT_NAME,
      setWalletState
    );

    // return () => {
    //   removeListeners();
    //   window.removeEventListener("blur", handleTabBlur);
    //   window.removeEventListener("focus", handleTabFocus);
    //   window.removeEventListener("beforeunload", handleBeforeUnload);
    // };
  }, [sparkWallet, handleIncomingPayment]);

  useEffect(() => {
    // Interval to check deposit addresses to see if they were paid
    const handleDepositAddressCheck = async () => {
      try {
        console.log("l1Deposit check running....");
        const depoistAddresses = await getUnusedSparkBitcoinL1Address();
        console.log("Reteived deposit addresses", depoistAddresses);
        if (!depoistAddresses || !depoistAddresses.length) return;
        const newTransactions = await Promise.all(
          depoistAddresses.map(async (address) => {
            const result = await querySparkBitcoinL1Transaction(address);
            console.log("bitcoin address query result", result);
            if (result) {
              const response = await claimSparkBitcoinL1Transaction(address);
              // make sure to add address to tx item and format it like it needs to be for the sql database
              console.log("Bitcoin claim response", response);
              if (!response) return false;
              return { ...response, address: address, fee: 0 };
            }
          })
        );
        const filteredTxs = newTransactions.filter(Boolean);

        await bulkUpdateSparkTransactions(filteredTxs);

        // Eventualy save the claimed txs to the transaction array
      } catch (err) {
        console.log("Handle deposit address check error", err);
      }
    };

    if (depositAddressIntervalRef.current) {
      clearInterval(depositAddressIntervalRef.current);
    }

    return;
    depositAddressIntervalRef.current = setInterval(
      handleDepositAddressCheck,
      1_000 * 60
    );
  }, []);

  return (
    <SparkContext.Provider
      value={{ sparkInformation, setSparkInformation, clearSparkSession }}
    >
      {children}
    </SparkContext.Provider>
  );
};
