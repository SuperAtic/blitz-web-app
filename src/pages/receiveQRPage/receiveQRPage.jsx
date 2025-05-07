import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const [showReceiveOptions, setShowReceiveOptions] = useState(false);

  const initialSendAmount = location.state?.receiveAmount;
  const paymentDescription = location.state?.description;
  const selectedRecieveOption = (
    location.state?.selectedRecieveOption || "Lightning"
  ).toLowerCase();

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
      "RENDERING",
      initialSendAmount,
      paymentDescription,
      selectedRecieveOption
    );
    initializeAddressProcess({
      userBalanceDenomination: "sats",
      receivingAmount: initialSendAmount,
      description: paymentDescription,
      masterInfoObject: {},
      setAddressState,
      selectedRecieveOption,
      navigate,
    });
  }, [initialSendAmount, paymentDescription, selectedRecieveOption, navigate]);

  useEffect(() => {
    if (selectedRecieveOption !== "bitcoin") return;
    // requestAnimationFrame(() => {
    //   navigate("/error", {
    //     state: {
    //       errorMessage:
    //         "Currently, on-chain payment addresses are single-use only...",
    //     },
    //   });
    // });
  }, [selectedRecieveOption, navigate]);

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
