import { useLocation, useNavigate } from "react-router-dom";
import SafeAreaComponent from "../../components/safeAreaContainer";
import { motion } from "framer-motion";
import BackArrow from "../../components/backArrow/backArrow";
import "./style.css";
import { Colors } from "../../constants/theme";
import check from "../../assets/check.svg";
import ThemeText from "../../components/themeText/themeText";
import FormattedSatText from "../../components/formattedSatText/formattedSatText";
import { useThemeContext } from "../../contexts/themeContext";
import { useEffect, useState } from "react";
import CustomButton from "../../components/customButton/customButton";

export default function ExpandedTxPage() {
  const location = useLocation();
  const props = location.state;
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(0);

  const transaction = props?.transaction;
  const paymentType = transaction.paymentType;

  const isFailed = transaction.paymentStatus === "failed";
  const isPending = transaction.paymentStatus === "pending";

  const paymentDate = new Date(transaction.details.time);

  const description = transaction.details.description;

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", (e) => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  return (
    <>
      <BackArrow backFunction={() => navigate(-1)} />
      <div className="expandedTxContainer">
        <div
          style={{ backgroundColor: Colors.light.expandedTxReceitBackground }}
          className="receiptContainer"
        >
          <div
            style={{ backgroundColor: Colors.light.background }}
            className="paymentStatusOuterContainer"
          >
            <div
              style={{
                backgroundColor: isPending
                  ? Colors.light.expandedTxPendingOuter
                  : isFailed
                  ? Colors.light.expandedTxFailed
                  : Colors.light.expandedTxConfimred,
              }}
              className="paymentStatusFirstCircle"
            >
              <div
                style={{
                  backgroundColor: isPending
                    ? Colors.light.expandedTxPendingInner
                    : isFailed
                    ? Colors.constants.cancelRed
                    : Colors.light.blue,
                }}
                className="paymentStatusSecondCircle"
              >
                <img
                  style={{
                    filter: `invert(91%) sepia(3%) saturate(0%) hue-rotate(321deg) brightness(91%) contrast(93%)`,
                  }}
                  className="paymentStatusIcon"
                  src={check}
                />
              </div>
            </div>
          </div>
          <ThemeText
            textStyles={{
              fontSize: "20px",
              textAlign: "center",
              marginTop: "20px",
            }}
            textContent={`${
              transaction.details.direction === "OUTGOING" ? "Sent" : "Received"
            } amount`}
          />
          <FormattedSatText
            containerStyles={{ marginTop: "-5px" }}
            neverHideBalance={true}
            styles={{
              fontSize: "40px",
              margin: 0,
            }}
            balance={transaction.details.amount}
          />
          <div className="paymentStatusTextContanier">
            <ThemeText textContent={"Payment status"} />
            <div
              className="paymentStatusPillContiner"
              style={{
                backgroundColor: isPending
                  ? Colors.light.expandedTxPendingOuter
                  : isFailed
                  ? Colors.light.expandedTxFailed
                  : Colors.light.expandedTxConfimred,
              }}
            >
              <ThemeText
                textStyles={{
                  color: isPending
                    ? Colors.light.expandedTxPendingInner
                    : isFailed
                    ? Colors.constants.cancelRed
                    : Colors.light.blue,
                }}
                textContent={
                  isPending ? "Pending" : isFailed ? "Failed" : "Successful"
                }
              />
            </div>
          </div>
          <Border windowWidth={windowWidth} />
          <div className="infoGridContainer">
            <ThemeText textContent={"Time"} />
            <ThemeText
              textStyles={{ textAlign: "right" }}
              textContent={`${
                paymentDate.getHours() <= 9
                  ? "0" + paymentDate.getHours()
                  : paymentDate.getHours()
              }:${
                paymentDate.getMinutes() <= 9
                  ? "0" + paymentDate.getMinutes()
                  : paymentDate.getMinutes()
              }`}
            />
            <ThemeText textContent={"Fee"} />
            <FormattedSatText
              containerStyles={{ justifyContent: "end" }}
              styles={{ testAlign: "right" }}
              neverHideBalance={true}
              balance={isFailed ? 0 : transaction.details.fee}
            />
            <ThemeText textContent={"Type"} />
            <ThemeText
              textStyles={{
                textAlign: "right",
                textTransform: "capitalize",
              }}
              textContent={paymentType}
            />
          </div>
          {description && (
            <div className="descriptionContainer">
              <ThemeText textContent={"Memo"} />
              <div
                className="descriptionScrollviewContainer"
                style={{ backgroundColor: Colors.light.background }}
              >
                <ThemeText textContent={description} />
              </div>
            </div>
          )}
          <CustomButton
            actionFunction={() =>
              navigate("/technical-details", { state: { transaction } })
            }
            buttonStyles={{
              width: "auto",
              backgroundColor: Colors.light.blue,
              margin: "30px 0",
            }}
            textStyles={{ color: Colors.light.background }}
            textContent={"Technical details"}
          />
          <ReceiptDots windowWidth={windowWidth} />
        </div>
      </div>
    </>
  );
}

function Border({ windowWidth }) {
  console.log(windowWidth);
  const { theme } = useThemeContext();
  const dotsWidth = windowWidth * 0.95 - 30;
  const numDots = Math.floor(dotsWidth / 25);

  let dotElements = [];

  for (let index = 0; index < numDots; index++) {
    dotElements.push(
      <div
        key={index}
        style={{
          width: "20px",
          height: "2px",
          marginRight: "5px",
          backgroundColor: Colors.light.background,
        }}
      />
    );
  }

  return (
    <div className="borderElementsContainer">
      <div className="borderElementScroll">{dotElements}</div>
    </div>
  );
}

function ReceiptDots({ windowWidth }) {
  let dotElements = [];
  const dotsWidth = windowWidth;
  const numDots = Math.floor(dotsWidth / 20);

  for (let index = 0; index < numDots; index++) {
    dotElements.push(
      <div
        key={index}
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "10px",
          backgroundColor: Colors.light.background,
        }}
      />
    );
  }

  return (
    <div className="dotElementsContainer">
      <div className="borderElementScroll">{dotElements}</div>
    </div>
  );
}
