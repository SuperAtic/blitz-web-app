import "./login.css";
import BackArrow from "../../components/backArrow/backArrow";

import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { decrypt, encrypt } from "../../functions/encription";

import { useAuth } from "../../contexts/authContext";
import Storage from "../../functions/localStorage";
import SwipeButton from "../../components/swipeThumb/swipeThumb";
import { keyframes } from "@emotion/react";
import { useSpark } from "../../contexts/sparkContext";

function Login() {
  const navigate = useNavigate();
  const { login, setMnemoinc, deleteWallet, logout } = useAuth();
  const { clearSparkSession } = useSpark();
  const location = useLocation();

  const [password, setPassword] = useState("");

  const handlePassEncription = () => {
    if (!password) return;

    const storedKey = Storage.getItem("walletKey");

    const decryted = decrypt(storedKey, password);
    if (!decryted) {
      navigate("/error", {
        state: { errorMessage: "Incorrect password", background: location },
      });
      return;
    }
    setMnemoinc(decryted);
    login(storedKey);
  };
  return (
    <div className="passwordContainer">
      <div className="inputContainer">
        <p className="containerDescription">Enter Your Wallet Password</p>
        <p>Password</p>
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="initialPass"
          type="password"
          name=""
          id="inialPass"
        />
        <div className="buttonsContainer">
          <button
            style={{
              opacity: !password ? 0.5 : 1,
            }}
            onClick={handlePassEncription}
          >
            Unlock wallet
          </button>
          <button
            onClick={() => {
              deleteWallet();
              clearSparkSession();
              logout();
            }}
          >
            Delete wallet
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
