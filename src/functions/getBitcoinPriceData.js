export default async function getBitcoinPriceData() {
  try {
    const response = await fetch("https://blockchain.info/ticker");
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error getting bitcoin price data", err);
  }
}
