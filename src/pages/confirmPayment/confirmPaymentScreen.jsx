import { motion } from "framer-motion";
import BackArrow from "../../components/backArrow/backArrow";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useMemo, useRef, useCallback } from "react";
import Lottie from "react-lottie-player";
import confirmTxAnimation from "../../assets/confirmTxAnimation.json";
import errorTxAnimation from "../../assets/errorTxAnimation.json";
import {
  applyErrorAnimationTheme,
  updateConfirmAnimation,
} from "../../functions/lottieViewColorTransformer";
import "./confirmPayment.css";

export default function ConfirmPayment() {
  const navigate = useNavigate();
  const location = useLocation();
  const animationRef = useRef(null);

  const paymentType = location.state?.for;
  const paymentInformation = location.state?.information;
  const formmatingType = location.state?.formattingType;
  console.log(paymentInformation);
  const didSucceed = !paymentInformation?.error;
  const paymentFee = paymentInformation?.fee;
  const paymentNetwork = paymentInformation.type || "";
  const errorMessage = paymentInformation?.error || "Unknown error";
  const amount = paymentInformation?.totalValue || 0;
  const showPendingMessage = false; // Replace with real logic if needed

  const confirmAnimation = useMemo(() => {
    return updateConfirmAnimation(confirmTxAnimation, "light");
  }, []);

  const errorAnimation = useMemo(() => {
    return applyErrorAnimationTheme(errorTxAnimation, "light");
  }, []);

  useEffect(() => {
    animationRef.current?.play();
  }, []);

  const handleBack = useCallback(() => {
    navigate("/wallet");
  }, [navigate]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }} // optional fade-out
      transition={{ duration: 0.3 }}
      className="receiveQrPage"
    >
      <BackArrow backFunction={() => navigate("/wallet")} />

      <div className="contentContainer">
        <Lottie
          className="confirmTxAnimation"
          ref={animationRef}
          animationData={didSucceed ? confirmAnimation : errorAnimation}
          play
          loop={false}
        />

        <h1 className="paymentStatus">
          {!didSucceed
            ? "Failed to send"
            : paymentType?.toLowerCase() === "paymentsucceed"
            ? "Sent successfully"
            : "Received successfully"}
        </h1>

        {didSucceed && <h2 className="amountText">{amount} sats</h2>}

        <p className="errorText">
          {didSucceed
            ? showPendingMessage
              ? "Your balance will be updated shortly"
              : ""
            : "There was an issue sending this payment, please try again."}
        </p>

        {didSucceed && (
          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: 200,
              }}
            >
              <p>Fee</p>
              <p>{paymentFee} sats</p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: 200,
              }}
            >
              <p>Type</p>
              <p className="paymentNetwork">{paymentNetwork}</p>
            </div>
          </div>
        )}

        {!didSucceed && (
          <div className="errorMessageTextContainer">
            <p>{errorMessage}</p>
          </div>
        )}

        {!didSucceed && (
          <button
            onClick={() => {
              const mailto = `mailto:blake@blitz-wallet.com?subject=Payment Failed&body=${encodeURIComponent(
                errorMessage
              )}`;
              window.location.href = mailto;
            }}
            style={{
              marginTop: 10,
              marginBottom: 20,
              background: "none",
              border: "none",
              color: "#007bff",
              cursor: "pointer",
            }}
          >
            Send report to developer
          </button>
        )}

        <button onClick={handleBack} className="continueBTN">
          Continue
        </button>
      </div>
    </motion.div>
  );
}
