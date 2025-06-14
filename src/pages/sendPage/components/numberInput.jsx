import { useEffect, useState } from "react";

import CustomNumberKeyboard from "../../../components/customNumberKeyboard/customNumberKeyboard";
import { useGlobalContextProvider } from "../../../contexts/masterInfoObject";

export default function NumberInputSendPage({
  setPaymentInfo,
  paymentInfo,
  fiatStats,
}) {
  console.log(paymentInfo, "y");
  const { masterInfoObject } = useGlobalContextProvider();
  const [amount, setAmount] = useState(paymentInfo?.sendAmount);
  console.log(amount, "heysasdkfknsd");
  useEffect(() => {
    setPaymentInfo((prev) => {
      return { ...prev, sendAmount: amount };
    });
  }, [amount]);

  // Effect to update amount when paymentInfo.sendAmount changes
  useEffect(() => {
    if (paymentInfo?.sendAmount !== amount) {
      setAmount(paymentInfo.sendAmount);
    }
  }, [paymentInfo?.sendAmount]);

  return (
    <CustomNumberKeyboard
      showDot={masterInfoObject.userBalanceDenomination === "fiat"}
      keyboardContianerClassName={"custon-keyboard-styles"}
      setAmountValue={setAmount}
      amount={amount}
    />
  );
}
