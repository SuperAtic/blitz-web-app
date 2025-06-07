import { useEffect, useRef, useState } from "react";
import MascotWalking from "../../components/mascotWalking";
import "./style.css";
import ThemeText from "../../components/themeText/themeText";
import getBitcoinPriceData from "../../functions/getBitcoinPriceData";
import { useBitcoinPriceContext } from "../../contexts/bitcoinPriceContext";
import { useAuth } from "../../contexts/authContext";
import initializeUserSettings from "../../functions/initializeUserSettings";
import { useKeysContext } from "../../contexts/keysContext";
import { useGlobalContextProvider } from "../../contexts/masterInfoObject";
import { useGlobalAppData } from "../../contexts/appDataContext";
import { useGlobalContacts } from "../../contexts/globalContacts";
import { initializeDatabase } from "../../functions/messaging/cachedMessages";
import { initializePOSTransactionsDatabase } from "../../functions/pos";
import { initializeSparkDatabase } from "../../functions/spark/transactions";

export default function LoadingScreen() {
  const didInitializeMessageIntervalRef = useRef(false);
  const didInitializeWalletRef = useRef(false);
  const { toggleMasterInfoObject, masterInfoObject, setMasterInfoObject } =
    useGlobalContextProvider();
  const { mnemoinc } = useAuth();
  const { toggleContactsPrivateKey } = useKeysContext();
  const { toggleGlobalContactsInformation, globalContactsInformation } =
    useGlobalContacts();
  const { toggleGlobalAppDataInformation } = useGlobalAppData();
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
      try {
        const [didOpen, posTransactions, sparkTxs] = await Promise.all([
          initializeDatabase(),
          initializePOSTransactionsDatabase(),
          initializeSparkDatabase(),
        ]);
        if (!didOpen || !posTransactions || !sparkTxs)
          throw new Error("Database initialization failed");

        const initWallet = await initializeUserSettings(
          mnemoinc,
          toggleContactsPrivateKey,
          setMasterInfoObject,
          toggleGlobalContactsInformation,
          toggleGlobalAppDataInformation
        );
        const bitcoinPriceData = await getBitcoinPriceData();

        if (bitcoinPriceData && initWallet) {
          const priceArray = Object.values(bitcoinPriceData);
          const selectedPrice = priceArray.find(
            (item) => item.symbol.toLowerCase() === "usd"
          );
          setBitcoinPriceArray(priceArray);
          toggleSelectedBitcoinPrice({
            value: selectedPrice?.["15m"],
            symbol: "usd",
          });
        } else {
          console.log("ERRROR");
        }

        if (!mnemoinc) return;
        if (didInitializeWalletRef.current) return;
        didInitializeWalletRef.current = true;
      } catch (err) {
        console.log(err, "error loading data");
      }
    }
    retriveExternalData();
  }, [mnemoinc]);

  console.log(selectedBitcoinPrice, bitcoinPriceArray, masterInfoObject);
  return (
    <div id="loadingScreenContainer">
      <div className="mascotContainer">
        <MascotWalking />
      </div>
      <ThemeText textContent={loadingMessage} />
    </div>
  );
}
