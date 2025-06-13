import { useState } from "react";
import BackArrow from "../../components/backArrow/backArrow";
import { KeyContainer } from "../../components/keyContainer/keyContainer";
import { useAuth } from "../../contexts/authContext";
import "./viewKey.css";
import { useNavigate } from "react-router-dom";

export default function ViewMnemoinc() {
  const navigate = useNavigate();
  const { mnemoinc } = useAuth();
  const [shouldShowMnemoinc, setShouldShowMnemoinc] = useState(false);
  return (
    <div className="viewMnemoincContainer">
      <div
        style={{ top: shouldShowMnemoinc ? "200%" : 0 }}
        className="mnemoincCover"
      >
        <div className="coverContent">
          <p className="viewMnemoincText">
            Are you sure you want to show your recover phrase?
          </p>
          <div className="buttonContianer">
            <button onClick={() => setShouldShowMnemoinc(true)}>Yes</button>
            <button onClick={() => navigate(-1)}>No</button>
          </div>
        </div>
      </div>
      <p className="warning1">Keep this phrase in a secure and safe place</p>
      <p className="warning2">Do not share it with anyone!</p>
      <div className="mnemoincContainer">
        <KeyContainer keys={mnemoinc.split(" ")} />
      </div>
    </div>
  );
}
