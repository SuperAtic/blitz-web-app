import SettingsIcon from "../../../../assets/settings.png";
import "./nav.css";

export default function WalletNavBar() {
  return (
    <div className="walletNavBar">
      <div></div>
      <img src={SettingsIcon} />
    </div>
  );
}
