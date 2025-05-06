import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // replaces useNavigation
// import { useGlobalContextProvider } from "../../../context-store/context";
// import { ButtonsContainer } from "../../components/admin/homeComponents/receiveBitcoin";
// import { GlobalThemeView, ThemeText } from "../../functions/CustomElements";
// import FormattedSatText from "../../functions/CustomElements/satTextDisplay";
// import { useGlobaleCash } from "../../../context-store/eCash";
// import GetThemeColors from "../../hooks/themeColors";
// import ThemeImage from "../../functions/CustomElements/themeImage";
// import { initializeAddressProcess } from "../../functions/receiveBitcoin/addressGeneration";
// import FullLoadingScreen from "../../functions/CustomElements/loadingScreen";
// import QrCodeWrapper from "../../functions/CustomElements/QrWrapper";
// import { useNodeContext } from "../../../context-store/nodeContext";
// import { useAppStatus } from "../../../context-store/appStatus";
// import useHandleBackPressNew from "../../hooks/useHandleBackPressNew";
// import CustomButton from "../../functions/CustomElements/button";
// import { crashlyticsLogReport } from "../../functions/crashlyticsLogs";
// import { ICONS } from "../../constants";
import copyToClipboard from "../../functions/copyToClipboard";
import BackArrow from "../../components/backArrow/backArrow";
import QRCodeQrapper from "../../components/qrCode/qrCode";
import "./style.css";
import ReceiveButtonsContainer from "./components/buttonContainer";
import { initializeAddressProcess } from "../../functions/generateReceiveAddress";

export default function ReceiveQRPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const hasInitialized = useRef(false);

  //   const { masterInfoObject } = useGlobalContextProvider();
  //   const { minMaxLiquidSwapAmounts } = useAppStatus();
  //   const { nodeInformation } = useNodeContext();
  //   const { ecashWalletInformation } = useGlobaleCash();

  //   const currentMintURL = ecashWalletInformation.mintURL;
  //   const eCashBalance = ecashWalletInformation.balance;
  const initialSendAmount = location.state?.receiveAmount;
  const paymentDescription = location.state?.description;
  const selectedRecieveOption =
    location.state?.selectedRecieveOption || "Lightning";

  //   useHandleBackPressNew();

  const [addressState, setAddressState] = useState({
    selectedRecieveOption: selectedRecieveOption,
    isReceivingSwap: false,
    generatedAddress: "",
    isGeneratingInvoice: false,
    minMaxSwapAmount: { min: 0, max: 0 },
    swapPegInfo: {},
    errorMessageText: { type: null, text: "" },
    hasGlobalError: false,
    fee: 0,
  });

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;
    console.log(
      "REDERNG",
      initialSendAmount,
      paymentDescription,
      selectedRecieveOption
    );

    initializeAddressProcess({
      //   nodeInformation,
      userBalanceDenomination: "sats",
      receivingAmount: initialSendAmount,
      description: paymentDescription,
      masterInfoObject: {},
      //   minMaxSwapAmounts: minMaxLiquidSwapAmounts,
      //   mintURL: currentMintURL,
      setAddressState,
      selectedRecieveOption,
      navigate,
      //   eCashBalance,
    });
  }, [initialSendAmount, paymentDescription, selectedRecieveOption]);

  useEffect(() => {
    if (selectedRecieveOption !== "Bitcoin") return;
    requestAnimationFrame(() => {
      navigate("/error", {
        state: {
          errorMessage:
            "Currently, on-chain payment addresses are single-use only...",
        },
      });
    });
  }, [selectedRecieveOption]);

  return (
    <div className="receiveQrPage">
      <TopBar navigate={navigate} />

      <div className="receiveQrPageContent">
        <p className="selectedReceiveOption">{selectedRecieveOption}</p>
        <QrCode addressState={addressState} navigate={navigate} />

        <ReceiveButtonsContainer
          generatingInvoiceQRCode={addressState.isGeneratingInvoice}
          generatedAddress={addressState.generatedAddress}
        />

        <div style={{ marginBottom: "auto" }}></div>

        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p className="feeText">Fee:</p>
          <p className="feeText">0 sats</p>
        </div>
      </div>
    </div>
  );
}

function QrCode({ addressState, navigate }) {
  //   const { backgroundOffset } = GetThemeColors();

  if (addressState.isGeneratingInvoice) {
    return (
      <div className="qrCodeContainerReceivePage">
        <p>loading...</p>
      </div>
    );
  }

  if (!addressState.generatedAddress) {
    return (
      <div className="qrCodeContainerReceivePage">
        <p>
          {addressState.errorMessageText.text || "Unable to generate address"}
        </p>
      </div>
    );
  }

  return (
    <div className="qrCodeContainerReceivePage">
      <button
        onClick={() => copyToClipboard(addressState.generatedAddress, navigate)}
        style={{ all: "unset", cursor: "pointer", textAlign: "center" }}
      >
        <QRCodeQrapper data={addressState.generatedAddress} />
        {addressState.errorMessageText.text && (
          <p>{addressState.errorMessageText.text}</p>
        )}
      </button>
    </div>
  );
}

function TopBar() {
  return <BackArrow />;
}
