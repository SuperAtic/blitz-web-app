import { useEffect, useRef, useState } from "react";
import MascotWalking from "../../components/mascotWalking";
import "./style.css";
import ThemeText from "../../components/themeText/themeText";

export default function LoadingScreen() {
  const didInitializeMessageIntervalRef = useRef(false);
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
  return (
    <div id="loadingScreenContainer">
      <div className="mascotContainer">
        <MascotWalking />
      </div>
      <ThemeText textContent={loadingMessage} />
    </div>
  );
}
