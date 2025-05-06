import { QRCodeSVG } from "qrcode.react";
import "./style.css";
export default function QRCodeQrapper({ data }) {
  return (
    <div className="qrContainer">
      <QRCodeSVG
        height={"100%"}
        width={"100%"}
        bgColor="transparent"
        value={data}
      />
    </div>
  );
}
