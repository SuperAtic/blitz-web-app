import { useEffect, useState } from "react";
import "./send.css";
import { useLocation, useNavigate } from "react-router-dom";
import BackArrow from "../../components/backArrow/backArrow";
import { processInputType } from "../../functions/sendPayment";
import { sparkPaymenWrapper } from "../../functions/payments";
import { useSpark } from "../../contexts/sparkContext";
export default function SendPage() {
  const location = useLocation();
  const params = location.state || {};
  const [paymentInfo, setPaymentInfo] = useState({});
  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();
  const { sparkInformation } = useSpark();

  console.log(params, paymentInfo, import.meta.env.VITE_BLITZ_SPARK_ADDRESS);
  useEffect(() => {
    async function decodeSendAddress() {
      try {
        const decodedInvoice = await processInputType(
          params.btcAddress,
          paymentInfo
        );
        if (!decodedInvoice) throw new Error("Invalid address");
        setPaymentInfo(decodedInvoice);
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
          amountSats: paymentInfo.amount,
          fee: paymentInfo?.fee + paymentInfo?.supportFee,
          memo: paymentInfo?.description,
          passedSupportFee: paymentInfo?.supportFee,
          userBalance: sparkInformation.balance,
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

  const handleSave = async () => {
    try {
      const decodedInvoice = await processInputType(
        params.btcAddress,
        paymentInfo
      );
      if (!decodedInvoice) throw new Error("Invalid address");
      setPaymentInfo(decodedInvoice);
    } catch (err) {
      console.log("Error decoding payment", err);
      navigate("/error", {
        state: {
          errorMessage: "Error decoding payment.",
          navigateBack: "wallet",
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
  return (
    <div className="sendContainer">
      <BackArrow />

      <div className="paymentInfoContainer">
        <h1 className="paymentAmount">
          {paymentInfo.amount || 0} {""}sats
        </h1>
        <p className="paymentFeeDesc">Fee & speed</p>
        <p className="paymentFeeVal">
          {(paymentInfo?.fee || 0) + (paymentInfo?.supportFee || 0)} sats and
          Instant
        </p>
        {paymentInfo?.canEdit && (
          <div
            style={{ marginBottom: 0, marginTop: "auto" }}
            className="number-keyboard"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, "C", 0, "⌫"].map((num) => (
              <button
                key={num}
                className="keyboard-key"
                onClick={() => {
                  if (num === "⌫") {
                    setPaymentInfo((prev) => {
                      return {
                        ...prev,
                        amount: String(prev.amount).slice(0, -1),
                      };
                    });
                    // setAmountValue((prev) => prev.slice(0, -1));
                  } else if (num === "C" && inputDenomination === "sats") {
                    setPaymentInfo((prev) => {
                      return {
                        ...prev,
                        amount: "",
                      };
                    });
                    // setAmountValue("");
                  } else {
                    setPaymentInfo((prev) => {
                      return {
                        ...prev,
                        amount: String(prev.amount) + num,
                      };
                    });
                    // setAmountValue((prev) => prev + num);
                  }
                }}
              >
                {num}
              </button>
            ))}
          </div>
        )}
        <button
          style={{ marginTop: paymentInfo?.canEdit ? 0 : "auto" }}
          onClick={() => {
            if (paymentInfo?.canEdit) {
              handleSave();
            } else {
              handleSend();
            }
          }}
        >
          {paymentInfo?.canEdit
            ? "Save"
            : isSending
            ? "Sending..."
            : "Send Payment"}
        </button>
      </div>
    </div>
  );
}
