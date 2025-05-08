import { EventEmitter } from "events";
import mergeTransactions from "./copyObject";

export const SQL_TABLE_NAME = "SPARK_TRANSACTIONS";
export const sparkTransactionsEventEmitter = new EventEmitter();
export const SPARK_TX_UPDATE_ENVENT_NAME = "UPDATE_SPARK_STATE";

let db;

// Initialize the IndexedDB database
export const initializeSparkDatabase = async () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(`${SQL_TABLE_NAME}_DB`, 1);

    request.onerror = (event) => {
      console.error("Database error:", event.target.error);
      reject(false);
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      console.log("Opened spark transaction database");
      resolve(true);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      const store = db.createObjectStore(SQL_TABLE_NAME, {
        keyPath: "id",
        autoIncrement: true,
      });

      // Create indexes for all queryable fields
      store.createIndex("spark_id", "spark_id", { unique: true });
      store.createIndex("created_at_time", "created_at_time", {
        unique: false,
      });
      store.createIndex("status", "status", { unique: false });
      // Add other indexes as needed for your queries
    };
  });
};

// Helper function to wrap IDB operations in promises
const idbRequest = (storeName, mode, operation) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, mode);
    const store = transaction.objectStore(storeName);

    const request = operation(store);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const getAllSparkTransactions = async () => {
  try {
    const allTxns = await idbRequest(SQL_TABLE_NAME, "readonly", (store) => {
      return store.getAll();
    });

    // Sort by createdTime descending (newest first)
    return allTxns.sort((a, b) => b.updated_at_time - a.updated_at_time);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
};

export const updateSingleSparkTransaction = async (
  created_at_time,
  updates
) => {
  try {
    // First get the transaction by created_at_time
    const tx = await new Promise((resolve, reject) => {
      const transaction = db.transaction(SQL_TABLE_NAME, "readonly");
      const store = transaction.objectStore(SQL_TABLE_NAME);
      const index = store.index("created_at_time");

      const lowerBound = created_at_time - 5000;
      const upperBound = created_at_time + 5000;

      const range = IDBKeyRange.bound(lowerBound, upperBound, false, false);
      const request = index.openCursor(range);

      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          resolve(cursor.value); // return the first match within ±5s
        } else {
          resolve(null);
        }
      };

      request.onerror = (event) => {
        reject(event.target.error);
      };
    });

    if (!tx) {
      console.error(
        `Transaction with created_at_time ${created_at_time} not found`
      );
      return false;
    }

    // Update the transaction
    const updatedTx = {
      ...tx,
      ...updates,
      updated_at_time: new Date().getTime(),
    };

    await idbRequest(SQL_TABLE_NAME, "readwrite", (store) => {
      return store.put(updatedTx);
    });

    sparkTransactionsEventEmitter.emit(
      SPARK_TX_UPDATE_ENVENT_NAME,
      "transactions"
    );
    return true;
  } catch (error) {
    console.error(`Error updating transaction at ${created_at_time}:`, error);
    return false;
  }
};

export const bulkUpdateSparkTransactions = async (transactions) => {
  if (!Array.isArray(transactions) || transactions.length === 0) return;

  try {
    for (const tx of transactions) {
      const timeIdFormatting = new Date(tx.createdTime).getTime();

      console.log("timeIdFormmating for", tx.id);

      console.log("Checking for existing transaction with id:", tx.id);

      // Check if transaction exists by spark_id (tx.id)
      const existingTx = await new Promise((resolve, reject) => {
        const transaction = db.transaction(SQL_TABLE_NAME, "readonly");
        const store = transaction.objectStore(SQL_TABLE_NAME);
        const index = store.index("spark_id");

        const request = index.get(tx.id);
        request.onsuccess = (event) => resolve(event.target.result || null);
        request.onerror = (event) => reject(event.target.error);
      });

      const txData = {
        spark_id: tx.id,
        sender_identity_pubkey: tx.senderIdentityPublicKey,
        receiver_identity_pubkey: tx.receiverIdentityPublicKey,
        status: tx.status,
        created_at_time: timeIdFormatting,
        updated_at_time: new Date(tx.updatedTime ?? tx.createdTime).getTime(),
        expires_at_time: new Date(tx.expiryTime).getTime(),
        type: tx.type,
        transfer_direction: tx.transferDirection,
        total_sent: tx.totalValue,
        initial_sent: tx.initial_sent,
        description: tx.description,
        fee: tx.fee,
        address: tx.address,
      };

      if (existingTx) {
        const mergedTx = mergeTransactions(existingTx, txData);
        await idbRequest(SQL_TABLE_NAME, "readwrite", (store) => {
          return store.put(mergedTx);
        });
      } else {
        await idbRequest(SQL_TABLE_NAME, "readwrite", (store) => {
          return store.add(txData);
        });
      }
    }

    sparkTransactionsEventEmitter.emit(
      SPARK_TX_UPDATE_ENVENT_NAME,
      "transactions"
    );
    return true;
  } catch (error) {
    console.error("Error upserting transactions batch:", error);
    return false;
  }
};

export const addSingleSparkTransaction = async (tx) => {
  if (!tx || !tx.id) {
    console.error("Invalid transaction object");
    return false;
  }

  try {
    await idbRequest(SQL_TABLE_NAME, "readwrite", (store) => {
      return store.add({
        spark_id: tx.id,
        sender_identity_pubkey: tx.senderIdentityPublicKey,
        receiver_identity_pubkey: tx.receiverIdentityPublicKey,
        status: tx.status,
        created_at_time: new Date(tx.createdTime).getTime(),
        updated_at_time: new Date(tx.updatedTime ?? tx.createdTime).getTime(),
        expires_at_time: new Date(tx.expiryTime).getTime(),
        type: tx.type,
        transfer_direction: tx.transferDirection,
        total_sent: tx.totalValue,
        initial_sent: tx.initial_sent ?? 0,
        description: tx.description ?? "",
        fee: tx.fee ?? 0,
        address: tx.address ?? "",
      });
    });

    sparkTransactionsEventEmitter.emit(
      SPARK_TX_UPDATE_ENVENT_NAME,
      "transactions"
    );
    return true;
  } catch (error) {
    console.error("Error adding spark transaction:", error);
    return false;
  }
};

export const deleteSparkTransaction = async (id) => {
  try {
    await idbRequest(SQL_TABLE_NAME, "readwrite", (store) => {
      return store.delete(id);
    });
    sparkTransactionsEventEmitter.emit(
      SPARK_TX_UPDATE_ENVENT_NAME,
      "transactions"
    );
    return true;
  } catch (error) {
    console.error(`Error deleting transaction ${id}:`, error);
    return false;
  }
};

export const deleteSparkTransactionTable = async () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase(`${SQL_TABLE_NAME}_DB`);

    request.onsuccess = () => {
      console.log("Database deleted successfully");
      resolve(true);
    };

    request.onerror = (event) => {
      console.error("Error deleting database:", event.target.error);
      reject(false);
    };
  });
};

export const cleanStaleSparkLightningTransactions = async () => {
  try {
    const now = new Date().getTime();
    const allTransactions = await getAllSparkTransactions();

    const staleTransactions = allTransactions.filter(
      (tx) =>
        tx.status === "INVOICE_CREATED" &&
        tx.expires_at_time &&
        tx.expires_at_time < now
    );

    for (const tx of staleTransactions) {
      await deleteSparkTransaction(tx.id);
    }

    console.log(
      `Cleaned up ${staleTransactions.length} stale spark transactions`
    );
    return true;
  } catch (error) {
    console.error("Error cleaning stale spark transactions:", error);
    return false;
  }
};
