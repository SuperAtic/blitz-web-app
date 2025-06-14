import React, { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import "./style.css";
import BackArrow from "../../components/backArrow/backArrow";
import deleteIcon from "../../assets/leftCheveronDark.png";
import FormattedSatText from "../../components/formattedSatText/formattedSatText";
import { SATSPERBITCOIN } from "../../constants";
import { useNodeContext } from "../../contexts/nodeContext";
import convertNumberForTextInput from "../../functions/convertNumberForTextInput";
import { useGlobalContextProvider } from "../../contexts/masterInfoObject";
import CustomNumberKeyboard from "../../components/customNumberKeyboard/customNumberKeyboard";
import CustomButton from "../../components/customButton/customButton";

const EditReceivePaymentInformation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { masterInfoObject } = useGlobalContextProvider();
  const { fiatStats } = useNodeContext();
  const props = location.state;

  const receiveOption = props?.receiceOption;
  const fromPage = props?.fromPage;

  const [amountValue, setAmountValue] = useState("");
  const [isKeyboardFocused, setIsKeyboardFocused] = useState(false);
  const [paymentDescription, setPaymentDescription] = useState("");

  const [inputDenomination, setInputDenomination] = useState(
    masterInfoObject.userBalanceDenomination != "fiat" ? "sats" : "fiat"
  );
  console.log(amountValue, "amount value");

  const localSatAmount =
    Number(
      inputDenomination === "sats"
        ? Number(amountValue)
        : Math.round(SATSPERBITCOIN / (fiatStats?.value || 65000)) * amountValue
    ) || 0;

  console.log(fromPage, "testing");
  const handleSubmit = () => {
    if (!Number(localSatAmount)) return;
    console.log("Running in edit payment information submit function");

    navigate(`/receive`, {
      state: {
        amount: Number(localSatAmount),
        description: paymentDescription,
        receiveOption: receiveOption || "lightning",
        navigateHome: fromPage !== "homepage",
      },
      replace: fromPage !== "homepage",
    });

    setAmountValue("");
  };

  return (
    <div className="edit-receive-container">
      <BackArrow />
      <div className="balanceContainer">
        <div
          onClick={() => {
            setInputDenomination((prev) => (prev === "sats" ? "fiat" : "sats"));
            setAmountValue(
              convertNumberForTextInput(
                amountValue,
                inputDenomination,
                fiatStats
              ) || ""
            );
          }}
          className="scroll-content"
        >
          <FormattedSatText
            containerStyles={{
              opacity: !amountValue ? 0.5 : 1,
              cursor: "pointer",
            }}
            styles={{
              fontSize: "2.75rem",
              margin: 0,
            }}
            globalBalanceDenomination={inputDenomination}
            neverHideBalance={true}
            balance={localSatAmount}
          />
        </div>
        <FormattedSatText
          containerStyles={{
            opacity: !amountValue ? 0.5 : 1,
            cursor: "pointer",
          }}
          styles={{ fontSize: "1.2rem", margin: 0 }}
          globalBalanceDenomination={
            inputDenomination === "sats" ? "fiat" : "sats"
          }
          neverHideBalance={true}
          balance={localSatAmount}
        />
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

      <CustomNumberKeyboard
        containerClassName={"custom-number-keyboard-container"}
        setAmountValue={setAmountValue}
        showDot={inputDenomination === "fiat"}
        fiatStats={fiatStats}
      />
      {/* {!isKeyboardFocused && ( */}
      {/* <div className="keyboard-container">
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
        </div> */}

      {/* </div> */}
      {/* )} */}
      <CustomButton
        actionFunction={handleSubmit}
        buttonStyles={{
          opacity: !Number(localSatAmount) ? 0.5 : 1,
          maxWidth: "200px",
          margin: "0 auto",
        }}
        textContent={"Request"}
      />
    </div>
  );
};

export default EditReceivePaymentInformation;
