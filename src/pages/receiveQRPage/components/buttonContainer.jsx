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
          navigate("/receiveAmount", {
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
        onClick={() => {
          if (!generatedAddress) return;
          copyToClipboard(generatedAddress);
        }}
      >
        Copy
      </button>

      <button onClick={() => navigate("/receive-options")}>
        Choose format
      </button>
    </div>
  );
}
