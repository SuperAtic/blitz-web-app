import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import copyToClipboard from "../../../functions/copyToClipboard";
import "./buttonContainer.css";

export default function ReceiveButtonsContainer({
  generatingInvoiceQRCode,
  generatedAddress,
  receiveOption,
  initialSendAmount,
  description,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="receiveButtonContainer">
      <button
        onClick={() =>
          navigate(`/receiveAmount`, {
            state: {
              receiveOption,
              from: "receivePage",
            },
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
          copyToClipboard(generatedAddress, navigate, location);
        }}
      >
        Copy
      </button>

      <button
        onClick={() =>
          navigate(`/receive-options`, {
            state: {
              receiveOption,
              amount: initialSendAmount,
              description: description,
            },
          })
        }
      >
        Choose format
      </button>
    </div>
  );
}
