import { useSpark } from "../../../../contexts/sparkContext";
import "./style.css";

export default function UserBalance() {
  const { sparkInformation } = useSpark();
  return (
    <div className="userBalanceContainer">
      <p>Total balance</p>
      <h1>{sparkInformation.balance} sats</h1>
    </div>
  );
}
