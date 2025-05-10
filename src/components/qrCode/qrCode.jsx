import { QRCodeSVG } from "qrcode.react";
import logo from "../../assets/qrImage.png";
import "./style.css";
export default function QRCodeQrapper({ data }) {
  return (
    <div className="qrContainer">
      <div className="imageContainer">
        <img src={logo} />
      </div>
      <QRCodeSVG
        height={"100%"}
        width={"100%"}
        bgColor="transparent"
        value={data}
      />
    </div>
  );
}
