import "./login.css";
import BackArrow from "../../components/backArrow/backArrow";

import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { decrypt, encrypt } from "../../functions/encription";

import { useAuth } from "../../contexts/authContext";
import Storage from "../../functions/localStorage";
function Login() {
  const navigate = useNavigate();
  const { login, setMnemoinc } = useAuth();
  const [password, setPassword] = useState("");

  const handlePassEncription = () => {
    if (!password) return;

    const storedKey = Storage.getItem("walletKey");

    const decryted = decrypt(storedKey, password);
    if (!decryted) {
      navigate("/error", { state: { errorMessage: "Incorrect password" } });
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
        <button
          style={{
            opacity: !password ? 0.5 : 1,
          }}
          onClick={handlePassEncription}
        >
          Unlock wallet
        </button>
      </div>
    </div>
  );
}

export default Login;
