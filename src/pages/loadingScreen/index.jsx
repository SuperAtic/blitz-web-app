import { useEffect, useRef, useState } from "react";
import MascotWalking from "../../components/mascotWalking";
import "./style.css";
import ThemeText from "../../components/themeText/themeText";
import getBitcoinPriceData from "../../functions/getBitcoinPriceData";
import { useBitcoinPriceContext } from "../../contexts/bitcoinPriceContext";
import { useAuth } from "../../contexts/authContext";
import initializeUserSettings from "../../functions/initializeUserSettings";

export default function LoadingScreen() {
  const didInitializeMessageIntervalRef = useRef(false);
  const didInitializeWalletRef = useRef(false);
  const { mnemoinc } = useAuth();
  const {
    setBitcoinPriceArray,
    toggleSelectedBitcoinPrice,
    bitcoinPriceArray,
    selectedBitcoinPrice,
  } = useBitcoinPriceContext();
  const [loadingMessage, setLoadingMessage] = useState(
    "Please don't leave the tab"
  );
  useEffect(() => {
    if (didInitializeMessageIntervalRef.current) return;
    didInitializeMessageIntervalRef.current = true;

    const intervalRef = setInterval(() => {
      console.log("runngin in the interval");
      setLoadingMessage((prev) =>
        prev === "Please don't leave the tab"
          ? "We are setting things up"
          : "Please don't leave the tab"
      );
    }, 5000);

    return () => clearInterval(intervalRef);
  }, []);

  useEffect(() => {
    async function retriveExternalData() {
      const initWallet = await initializeUserSettings(mnemoinc);
      const bitcoinPriceData = await getBitcoinPriceData();
      if (bitcoinPriceData) {
        const priceArray = Object.values(bitcoinPriceData);
        const selectedPrice = priceArray.find(
          (item) => item.symbol.toLowerCase() === "usd"
        );
        setBitcoinPriceArray(priceArray);
        toggleSelectedBitcoinPrice({
          value: selectedPrice?.["15m"],
          symbol: "usd",
        });
      }
    }
    if (!mnemoinc) return;
    if (didInitializeWalletRef.current) return;
    didInitializeWalletRef.current = true;
    retriveExternalData();
  }, [mnemoinc]);

  console.log(selectedBitcoinPrice, bitcoinPriceArray);
  return (
    <div id="loadingScreenContainer">
      <div className="mascotContainer">
        <MascotWalking />
      </div>
      <ThemeText textContent={loadingMessage} />
    </div>
  );
}
