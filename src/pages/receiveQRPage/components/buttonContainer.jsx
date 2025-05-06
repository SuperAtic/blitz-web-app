import React from "react";
import { useNavigate } from "react-router-dom";

import copyToClipboard from "../../../functions/copyToClipboard";
import "./buttonContainer.css";

export default function ReceiveButtonsContainer({
  generatingInvoiceQRCode,
  generatedAddress,
}) {
  const navigate = useNavigate();

  return (
    <div className="receiveButtonContainer">
      <button
        onClick={() =>
          navigate("/edit-receive", {
            state: { from: "receivePage" },
          })
        }
      >
        Edit
      </button>
      <button
        style={{
          opacity: generatingInvoiceQRCode ? 0.5 : 1,
        }}
        onClick={() => copyToClipboard(generatedAddress)}
      >
        Copy
      </button>

      <button onClick={() => navigate("/switch-receive-option")}>
        Choose format
      </button>
    </div>
  );
}
