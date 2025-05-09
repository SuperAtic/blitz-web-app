import { getSparkTransactions } from "./spark";
import { getAllSparkTransactions } from "./txStorage";

const BATCH_SIZE = 500;
const MAX_GAP = 1;
export const restoreSparkTxState = async () => {
  let resotredTxs = [];
  try {
    let start = 0;
    let noProofsFoundCounter = 0;
    const noProofsFoundLimit = MAX_GAP;
    const savedTxs = await getAllSparkTransactions();
    if (savedTxs) {
      const txCount = savedTxs.filter((tx) => {
        if (tx?.type === "PREIMAGE_SWAP" && tx?.status === "INVOICE_CREATED")
          return;
        else return true;
      }).length;
      start = txCount - 10;
    }

    console.log("start");

    do {
      const txs = await getSparkTransactions(start + BATCH_SIZE, start);
      const newTxs = [...txs.transfers];

      if (newTxs.length) {
        console.log(`Restored ${newTxs.length} transactions`);
        noProofsFoundCounter = 0;
        resotredTxs.push(...newTxs);
      } else {
        noProofsFoundCounter++;
        console.log(
          `No transactions found in batch starting at ${start - BATCH_SIZE}`
        );
      }
      start = start + BATCH_SIZE;
    } while (noProofsFoundCounter < noProofsFoundLimit);

    return { txs: resotredTxs };
  } catch (error) {
    console.error("Error in spark restore history state:", error);
    return { txs: [] };
  }
};
