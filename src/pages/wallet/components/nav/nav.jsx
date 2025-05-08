import { useNavigate } from "react-router-dom";
import SettingsIcon from "../../../../assets/settings.png";
import "./nav.css";

export default function WalletNavBar() {
  const navigate = useNavigate();
  return (
    <div className="walletNavBar">
      <div></div>

      <img onClick={() => navigate("/settings")} src={SettingsIcon} />
    </div>
  );
}
