export default function mergeTransactions(oldTx, newTx) {
  const merged = { ...oldTx };
  for (const key in newTx) {
    if (newTx[key] !== undefined) {
      merged[key] = newTx[key];
    }
  }
  return merged;
}
