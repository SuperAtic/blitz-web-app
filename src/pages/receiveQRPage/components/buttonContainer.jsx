import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import copyToClipboard from "../../../functions/copyToClipboard";
import "./buttonContainer.css";
import CustomButton from "../../../components/customButton/customButton";

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
      <CustomButton
        actionFunction={() =>
          navigate(`/receiveAmount`, {
            state: {
              receiveOption,
              from: "receivePage",
            },
          })
        }
        textContent={"Edit"}
      />
      <CustomButton
        buttonStyles={{ opacity: generatingInvoiceQRCode ? 0.5 : 1 }}
        actionFunction={() => {
          if (!generatedAddress) return;
          copyToClipboard(generatedAddress, navigate, location);
        }}
        textContent={"Copy"}
      />

      <CustomButton
        actionFunction={() =>
          navigate(`/receive-options`, {
            state: {
              receiveOption,
              amount: initialSendAmount,
              description: description,
            },
          })
        }
        textContent={"Choose format"}
      />
    </div>
  );
}
