import { useNavigate } from "react-router-dom";
import "./login.css";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="loginComponenet">
      <h1>Blitz</h1>

      <div className="buttonContainer">
        <button onClick={() => navigate("/disclaimer")}>Make new wallet</button>
        <button onClick={() => navigate("/restore")}>Enter seed phrase</button>
      </div>
      <p>Your Wallet, your coins, 100% open-source</p>
    </div>
  );
}

export default Home;
