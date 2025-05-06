import { useNavigate } from "react-router-dom";
import arrow from "../../../../assets/arrow-left-blue.png";
import Qr from "../../../../assets/scanQRCodeLight.png";
import "./style.css";
export default function SendAndRequestBtns() {
  const naigate = useNavigate();
  return (
    <div className="sendAndRequstContainer">
      <div className="buttonContainer buttonWhite">
        <img className="buttonImage send" src={arrow} alt="small arrow" />
      </div>
      <div className="buttonContainer buttonBlue">
        <img className="buttonImage" src={Qr} alt="small arrow" />
      </div>
      <div
        onClick={() => naigate("/receiveAmount")}
        className="buttonContainer buttonWhite"
      >
        <img className="buttonImage request" src={arrow} alt="small arrow" />
      </div>
    </div>
  );
}
