import { QRCodeSVG } from "qrcode.react";
import logo from "../../assets/qrImage.png";
import "./style.css";
export default function QRCodeQrapper({ data }) {
  return (
    <div className="qrContainer">
      <QRCodeSVG
        height={"100%"}
        width={"100%"}
        bgColor="transparent"
        value={data}
        imageSettings={{
          src: logo,
          width: 20,
          height: 20,
          excavate: true,
        }}
      />
    </div>
  );
}
