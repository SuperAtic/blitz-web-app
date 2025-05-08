import BackArrow from "../../components/backArrow/backArrow";
import { useSpark } from "../../contexts/sparkContext";
import "./settings.css";
import clipbardIcon from "../../assets/clipboardIcon.png";
import copyToClipboard from "../../functions/copyToClipboard";
import keyIcon from "../../assets/keyIcon.png";
import shareIcon from "../../assets/share.png";
import trashIcon from "../../assets/trashIcon.png";
import { useAuth } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
export default function SettingsHome() {
  const navigate = useNavigate();
  const { sparkInformation } = useSpark();
  const { logout, deleteWallet } = useAuth();
  console.log(sparkInformation);

  return (
    <div className="settingsPage">
      <div className="nav">
        <BackArrow />
        <h1>Settings</h1>
      </div>
      <div className="contentContainer">
        <div className="techincalContainer">
          <div className="technicalRow">
            <p className="techicalLabel">Spark address</p>
            <span
              onClick={() => copyToClipboard(sparkInformation.sparkAddress)}
              className="techicalData"
            >
              <p>
                {sparkInformation.sparkAddress.slice(0, 5)}...
                {sparkInformation.sparkAddress.slice(
                  sparkInformation.sparkAddress.length - 5
                )}
              </p>
              <img
                className="clipboardIcon"
                src={clipbardIcon}
                alt=""
                srcset=""
              />
            </span>
          </div>
          <div className="technicalRow">
            <p className="techicalLabel">Public key</p>
            <span
              onClick={() => copyToClipboard(sparkInformation.pubKey)}
              className="techicalData"
            >
              <p>
                {sparkInformation.pubKey.slice(0, 5)}...
                {sparkInformation.pubKey.slice(
                  sparkInformation.pubKey.length - 5
                )}
              </p>
              <img
                className="clipboardIcon"
                src={clipbardIcon}
                alt=""
                srcset=""
              />
            </span>
          </div>
        </div>
        <button onClick={() => navigate("/key")}>
          <img src={keyIcon} alt="" srcset="" /> Backup recovery phrase
        </button>
        <button onClick={logout}>
          <img
            style={{ transform: "rotate(90deg)" }}
            src={shareIcon}
            alt=""
            srcset=""
          />
          Logout
        </button>
        <button onClick={deleteWallet}>
          <img src={trashIcon} alt="" srcset="" /> Deleate wallet
        </button>
      </div>
    </div>
  );
}
