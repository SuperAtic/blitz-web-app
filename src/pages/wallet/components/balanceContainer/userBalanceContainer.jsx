import FormattedSatText from "../../../../components/formattedSatText/formattedSatText";
import { useGlobalContextProvider } from "../../../../contexts/masterInfoObject";
import { useSpark } from "../../../../contexts/sparkContext";
import "./style.css";

export default function UserBalance() {
  const { sparkInformation } = useSpark();
  const { toggleMasterInfoObject, masterInfoObject } =
    useGlobalContextProvider();

  console.log(masterInfoObject);
  return (
    <div className="userBalanceContainer">
      <p>Total balance</p>
      <div
        onClick={() => {
          toggleMasterInfoObject({
            userBalanceDenomination:
              masterInfoObject.userBalanceDenomination === "sats"
                ? "fiat"
                : masterInfoObject.userBalanceDenomination === "fiat"
                ? "hidden"
                : "sats",
          });
        }}
        className="balanceContianer"
      >
        <FormattedSatText
          styles={{ fontSize: "2rem" }}
          balance={sparkInformation.balance}
        />
      </div>
    </div>
  );
}
