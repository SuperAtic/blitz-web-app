import { useSpark } from "../../../../contexts/sparkContext";
import clipbardIcon from "../../../../assets/clipboardIcon.png";
import copyToClipboard from "../../../../functions/copyToClipboard";
import "./sparkInfo.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function SparkInformation() {
  const { sparkInformation } = useSpark();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div id="sparkInfoContainer">
      <div className="contentContainer">
        <div className="techincalContainer">
          <div className="technicalRow">
            <p className="techicalLabel">Spark address</p>
            <span
              onClick={() =>
                copyToClipboard(
                  sparkInformation.sparkAddress,
                  navigate,
                  location
                )
              }
              className="techicalData"
            >
              <p>
                {sparkInformation.sparkAddress.slice(0, 5)}...
                {sparkInformation.sparkAddress.slice(
                  sparkInformation.sparkAddress.length - 5
                )}
              </p>
              <img
                className="clipboardIcon"
                src={clipbardIcon}
                alt=""
                srcset=""
              />
            </span>
          </div>
          <div className="technicalRow">
            <p className="techicalLabel">Public key</p>
            <span
              onClick={() =>
                copyToClipboard(
                  sparkInformation.identityPubKey,
                  navigate,
                  location
                )
              }
              className="techicalData"
            >
              <p>
                {sparkInformation.identityPubKey.slice(0, 5)}...
                {sparkInformation.identityPubKey.slice(
                  sparkInformation.identityPubKey.length - 5
                )}
              </p>
              <img
                className="clipboardIcon"
                src={clipbardIcon}
                alt=""
                srcset=""
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
