import "./style.css";
import BackArrow from "../../components/backArrow/backArrow";

import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { encrypt } from "../../functions/encription";
import Storage from "../../functions/localStorage";
import { useAuth } from "../../contexts/authContext";
function CreatePassword() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();
  const { mnemoinc } = location.state || {};
  const [password, setPassword] = useState({
    initialPass: "",
    checkPass: "",
  });

  const handlePassEncription = () => {
    if (
      !password.initialPass ||
      !password.checkPass ||
      password.initialPass !== password.checkPass
    )
      return;

    const encripted = encrypt(mnemoinc, password.checkPass);
    login(encripted);
  };
  return (
    <div className="passwordContainer">
      <BackArrow />

      <div className="inputContainer">
        <p className="containerDescription">Set Your Wallet Password</p>
        <p className="topText">
          This password encrypts your wallet locally. Choose a strong password.
        </p>
        <p>Password</p>
        <input
          onChange={(e) =>
            setPassword((prev) => ({ ...prev, initialPass: e.target.value }))
          }
          className="initialPass"
          type="password"
          name=""
          id="inialPass"
        />
        <p>Confirm Password</p>
        <input
          onChange={(e) =>
            setPassword((prev) => ({ ...prev, checkPass: e.target.value }))
          }
          type="password"
          name=""
          id="checkPass"
        />

        <button
          style={{
            opacity:
              !password.initialPass ||
              !password.checkPass ||
              password.initialPass !== password.checkPass
                ? 0.5
                : 1,
          }}
          onClick={handlePassEncription}
        >
          Create wallet
        </button>
      </div>
    </div>
  );
}

export default CreatePassword;
