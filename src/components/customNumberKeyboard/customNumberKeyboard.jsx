const KEYBOARD_KEYS = [1, 2, 3, 4, 5, 6, 7, 8, 9, "C", 0, "back"];
import { useCallback } from "react";
import deleteIcon from "../../assets/leftCheveronDark.png";
import "./style.css";
import numberConverter from "../../functions/numberConverter";
export default function CustomNumberKeyboard({
  setAmountValue,
  containerClassName,
  keyClassName,
  frompage,
  showDot,
  usingForBalance,
  fiatStats,
}) {
  const addPin = useCallback(
    (id) => {
      console.log(id);
      if (id === "back") {
        setAmountValue((prev) => {
          return frompage === "sendingPage"
            ? String(prev / 1000).slice(0, String(prev / 1000).length - 1) *
                1000
            : String(prev).slice(0, String(prev).length - 1);
        });
        // } else setAmountValue(0);
      } else if (id === "C") {
        setAmountValue("");
      } else {
        setAmountValue((prev) => {
          let newNumber = "";

          if (frompage === "sendingPage") {
            newNumber = (String(prev / 1000) + id) * 1000;
          } else if (prev?.includes(".") && id === ".")
            newNumber = prev; //making sure only one decimal is in number
          else if (prev?.includes(".") && prev.split(".")[1].length > 1) {
            //controling length to max 2 digits after decimal
            newNumber = prev;
          } else {
            newNumber = String(prev) + id;
          }

          if (usingForBalance) {
            const convertedValue =
              showDot || showDot === undefined
                ? (SATSPERBITCOIN / (fiatStats?.value || 65000)) * newNumber
                : newNumber;

            numberConverter(
              newNumber,
              showDot || showDot === undefined ? "fiat" : "sats",
              undefined,
              fiatStats
            );
            console.log(fiatStats?.value);
            console.log(convertedValue, "CONVERTED VAL");
            const numberLength = integerPartLength(convertedValue);
            console.log(numberLength, "NUMBER LENGTH");
            if (convertedValue > 25_000_000) return prev;
          }

          return newNumber;
        });
      }
    },
    [frompage, setAmountValue, showDot, usingForBalance, fiatStats]
  );

  return (
    <div className={`number-keyboard ${containerClassName}`}>
      {KEYBOARD_KEYS.map((num) => (
        <button
          key={num}
          className={`keyboard-key ${keyClassName}`}
          onClick={() => addPin(num)}
        >
          {num === "back" ? <img src={deleteIcon} /> : num}
        </button>
      ))}
    </div>
  );
}
