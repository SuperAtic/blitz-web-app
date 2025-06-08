import { useEffect, useState } from "react";
import "./send.css";
import { useLocation, useNavigate } from "react-router-dom";
import BackArrow from "../../components/backArrow/backArrow";
import { processInputType } from "../../functions/sendPayment";
import walletIcon from "../../assets/adminHomeWallet_dark.png";
import arrowIcon from "../../assets/arrow-left-blue.png";
import deleteIcon from "../../assets/leftCheveronDark.png";
import { sparkPaymenWrapper } from "../../functions/spark/payments";
import { useSpark } from "../../contexts/sparkContext";

export default function SendPage() {
  const location = useLocation();
  const params = location.state || {};
  const [paymentInfo, setPaymentInfo] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { sparkInformation } = useSpark();

  useEffect(() => {
    async function decodeSendAddress() {
      try {
        const decodedInvoice = await processInputType(params.btcAddress, {});
        if (!decodedInvoice) throw new Error("Invalid address");
        setPaymentInfo(decodedInvoice);
      } catch (err) {
        console.error("Error decoding payment", err);
        navigate("/error", {
          state: {
            errorMessage: "Error decoding payment.",
            navigateBack: "wallet",
            background: location,
          },
        });
      }
    }

    decodeSendAddress();
  }, [params, navigate]);

  const handleSend = async () => {
    if (isSending || !paymentInfo.paymentType) return;
    setIsSending(true);

    try {
      const response = await sparkPaymenWrapper({
        address: paymentInfo.invoice,
        paymentType: paymentInfo.paymentType,
        amountSats: Number(paymentInfo.amount),
        fee: (paymentInfo.fee || 0) + (paymentInfo.supportFee || 0),
        memo: paymentInfo.description,
        passedSupportFee: paymentInfo.supportFee,
        userBalance: sparkInformation.balance,
      });

      navigate("/confirm-page", {
        state: {
          for: response.didWork ? "paymentsucceed" : "paymentFailed",
          information: {
            error: response.error || "",
            fee: response.didWork
              ? (paymentInfo.fee || 0) + (paymentInfo.supportFee || 0)
              : 0,
            type: paymentInfo.paymentType,
            totalValue: paymentInfo.amount,
          },
        },
      });
    } catch (err) {
      console.error("Payment send error", err);
    }
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const decodedInvoice = await processInputType(
        params.btcAddress,
        paymentInfo
      );
      if (!decodedInvoice) throw new Error("Invalid address");
      setPaymentInfo(decodedInvoice);
      setIsLoading(false);
    } catch (err) {
      console.error("Error saving payment info", err);
      setIsLoading(false);
      navigate("/error", {
        state: {
          errorMessage: "Error decoding payment.",
          navigateBack: "wallet",
          background: location,
        },
      });
    }
  };

  if (!Object.keys(paymentInfo).length) {
    return (
      <div className="sendContainer">
        <BackArrow />
        <p className="decodeInvoiceLoadingText">
          Getting invoice information...
        </p>
      </div>
    );
  }

  const totalFee = (paymentInfo.fee || 0) + (paymentInfo.supportFee || 0);

  const handleKeypad = (key) => {
    setPaymentInfo((prev) => {
      if (key === "delete") {
        return { ...prev, amount: String(prev.amount).slice(0, -1) };
      } else if (key === "C" && inputDenomination === "sats") {
        return { ...prev, amount: "" };
      } else {
        return { ...prev, amount: String(prev.amount) + key };
      }
    });
  };
  console.log(paymentInfo);
  return (
    <div className="sendContainer">
      <NabBar sparkInformation={sparkInformation} />
      <div className="paymentInfoContainer">
        <h1 className="paymentAmount">{paymentInfo.amount || 0} sats</h1>
        {!paymentInfo.canEdit && (
          <>
            <p className="paymentFeeDesc">Fee & speed</p>
            <p className="paymentFeeVal">{totalFee} sats and Instant</p>
          </>
        )}

        {paymentInfo.canEdit && (
          <div
            style={{ marginBottom: 0, marginTop: "auto" }}
            className="number-keyboard"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, "C", 0, "delete"].map((num) => (
              <button
                key={num}
                className="keyboard-key"
                onClick={() => handleKeypad(num)}
              >
                {num === "delete" ? <img src={deleteIcon} /> : num}
              </button>
            ))}
          </div>
        )}

        <button
          style={{ marginTop: paymentInfo.canEdit ? 0 : "auto" }}
          onClick={paymentInfo.canEdit ? handleSave : handleSend}
          disabled={isSending}
        >
          {paymentInfo.canEdit
            ? isLoading
              ? "Loading..."
              : "Save"
            : isSending
            ? "Sending..."
            : "Send Payment"}
        </button>
      </div>
    </div>
  );
}

function NabBar({ sparkInformation }) {
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <img onClick={() => navigate(-1)} src={arrowIcon} alt="" />
      <div className="label">
        <img src={walletIcon} alt="" />
        <p>{sparkInformation.balance} stats</p>
      </div>
    </div>
  );
}
