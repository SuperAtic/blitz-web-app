import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useGlobalContext } from "../../../../contexts/GlobalContext";
// import { useNodeContext } from "../../../../contexts/NodeContext";
// import { useTranslation } from "react-i18next";
// import { 100_000_000 } from "../../../../constants";
import "./style.css";
import BackArrow from "../../components/backArrow/backArrow";
import deleteIcon from "../../assets/leftCheveronDark.png";

const EditReceivePaymentInformation = (props) => {
  const navigate = useNavigate();
  const [amountValue, setAmountValue] = useState("");
  const [isKeyboardFocused, setIsKeyboardFocused] = useState(false);
  const [paymentDescription, setPaymentDescription] = useState("");

  const fromPage = props.from;
  const [inputDenomination, setInputDenomination] = useState("sats");

  const localSatAmount = Number(amountValue);

  const handleSubmit = () => {
    if (!Number(localSatAmount)) return;
    console.log("Running in edit payment information submit function");

    navigate("/receive", {
      state: {
        receiveAmount: Number(localSatAmount),
        description: paymentDescription,
      },
      replace: fromPage !== "homepage",
    });

    setAmountValue("");
  };

  return (
    <div className="edit-receive-container">
      <BackArrow />
      <div className="scroll-content">
        <div className={`sat-value ${!amountValue ? "dimmed" : ""}`}>
          {`${localSatAmount} sats`}
        </div>
      </div>
      <div className="description-input-container">
        <input
          type="text"
          value={paymentDescription}
          onChange={(e) => setPaymentDescription(e.target.value)}
          placeholder={"Description..."}
          className="description-input"
          onFocus={() => setIsKeyboardFocused(true)}
          onBlur={() => setIsKeyboardFocused(false)}
        />
      </div>

      {/* {!isKeyboardFocused && ( */}
      <div className="keyboard-container">
        <div className="number-keyboard">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, "C", 0, "delete"].map((num) => (
            <button
              key={num}
              className="keyboard-key"
              onClick={() => {
                if (num === "delete") {
                  setAmountValue((prev) => prev.slice(0, -1));
                } else if (num === "C" && inputDenomination === "sats") {
                  setAmountValue("");
                } else {
                  setAmountValue((prev) => prev + num);
                }
              }}
            >
              {num === "delete" ? <img src={deleteIcon} /> : num}
            </button>
          ))}
        </div>

        <button
          className={`submit-button ${
            !Number(localSatAmount) ? "disabled" : ""
          }`}
          onClick={handleSubmit}
          disabled={!Number(localSatAmount)}
        >
          {"Request"}
        </button>
      </div>
      {/* )} */}
    </div>
  );
};

export default EditReceivePaymentInformation;
