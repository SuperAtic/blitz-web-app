import { useEffect, useState } from "react";
import "./send.css";
import { useLocation, useNavigate } from "react-router-dom";
import BackArrow from "../../components/backArrow/backArrow";
import { decodeLNPayment } from "../../functions/sendPayment";
import { sparkPaymenWrapper } from "../../functions/payments";
export default function SendPage() {
  const location = useLocation();
  const params = location.state || {};
  const [paymentInfo, setPaymentInfo] = useState({});
  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();

  console.log(params, paymentInfo, import.meta.env.VITE_BLITZ_SPARK_ADDRESS);
  useEffect(() => {
    async function decodeSendAddress() {
      try {
        const lightningPayment = await decodeLNPayment(params.btcAddress);
        if (lightningPayment) {
          setPaymentInfo(lightningPayment);
          return;
        }
      } catch (err) {
        console.log("Error decoding payment", err);
        navigate("/error", {
          state: {
            errorMessage: "Error decoding payment.",
            navigateBack: "wallet",
          },
        });
      }
    }
    decodeSendAddress();
  }, [params]);

  const handleSend = async () => {
    if (isSending) return;
    try {
      setIsSending(true);
      if (paymentInfo.paymentType === "lightning") {
        const response = await sparkPaymenWrapper({
          address: paymentInfo.invoice,
          paymentType: "lightning",
          amountSats: paymentInfo.amount / 1000,
          fee: paymentInfo?.fee + paymentInfo?.supportFee,
          memo: paymentInfo?.description,
          passedSupportFee: paymentInfo?.supportFee,
        });

        console.log(response);
        if (response.didWork) {
          navigate("/confirm-page", {
            state: {
              for: "paymentsucceed",
              information: {
                error: "",
                fee: paymentInfo?.fee + paymentInfo?.supportFee,
                type: "Lightning",
                totalValue: paymentInfo.amount / 1000,
              },
            },
          });
        } else {
          navigate("/confirm-page", {
            state: {
              for: "paymentFailed",
              information: {
                error: response.error,
                fee: 0,
                type: "Lightning",
                totalValue: paymentInfo.amount / 1000,
              },
            },
          });
        }
      }
    } catch (err) {
      console.log(err);
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
  return (
    <div className="sendContainer">
      <BackArrow />

      <div className="paymentInfoContainer">
        <h1 className="paymentAmount">{paymentInfo.amount / 1000} sats</h1>
        <p className="paymentFeeDesc">Fee & speed</p>
        <p className="paymentFeeVal">
          {(paymentInfo?.fee || 0) + (paymentInfo?.supportFee || 0)} sats and
          Instant
        </p>
        <button onClick={handleSend}>
          {isSending ? "Sending..." : "Send Payment"}
        </button>
      </div>
    </div>
  );
}
