import { SATSPERBITCOIN } from "../constants";

export default function convertNumberForTextInput(
  amountValue,
  inputDenomination,
  fiatStats
) {
  return !amountValue
    ? ""
    : inputDenomination === "fiat"
    ? String(
        Math.round(
          (SATSPERBITCOIN / (fiatStats?.value || 65000)) * Number(amountValue)
        )
      )
    : String(
        (
          ((fiatStats?.value || 65000) / SATSPERBITCOIN) *
          Number(amountValue)
        ).toFixed(2)
      );
}
