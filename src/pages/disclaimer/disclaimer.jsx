import BackArrow from "../../components/backArrow/backArrow";
import disclaimerKeys from "../../assets/disclaimerKeys.png";
import "./style.css";
import { useNavigate } from "react-router-dom";

function DisclaimerPage() {
  const navigate = useNavigate();
  return (
    <div className="disclaimerContainer">
      <BackArrow />
      <div className="disclaimerContentContainer">
        <h1>Self-custodial</h1>
        <p className="recoveryText">
          Blitz cannot access your funds or help recover them if lost. By
          continuing, you agree to Blitz Wallet's terms and conditions.
        </p>
        <div className="imgContainer">
          <img loading="lazy" src={disclaimerKeys} />
        </div>
        <p className="quoteText">
          "With great power comes great responsibility" - Uncle Ben
        </p>
        <button onClick={() => navigate("/createAccount")}>Next</button>
        <a href="https://blitz-wallet.com/pages/terms/">Terms and Conditions</a>
      </div>
    </div>
  );
}

export default DisclaimerPage;
