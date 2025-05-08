import { useEffect, useState } from "react";
import "./send.css";
import { useLocation, useNavigate } from "react-router-dom";
import BackArrow from "../../components/backArrow/backArrow";
// import bolt11 from "bolt11";
import { decode } from "light-bolt11-decoder";
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
          fee: paymentInfo?.fee,
          memo: paymentInfo?.description,
        });

        console.log(response);
        if (response.didWork) {
          navigate("/confirm-page", {
            state: {
              for: "",
              information: {
                error: "",
                fee: paymentInfo?.fee,
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
        <p>Loading</p>
      </div>
    );
  }
  return (
    <div className="sendContainer">
      <BackArrow />

      <div className="paymentInfoContainer">
        <h1>{paymentInfo.amount / 1000} sats</h1>
        <p>Fee: {paymentInfo.fee} sats</p>
      </div>
      <button onClick={handleSend}>
        {isSending ? "Sending" : "Send Payment"}
      </button>
    </div>
  );
}
