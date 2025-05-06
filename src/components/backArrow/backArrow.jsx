import { useNavigate } from "react-router-dom";
import backArrowIcon from "../../assets/arrow-left-blue.png";
import "./style.css";

export default function BackArrow({ backFunction }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        if (backFunction) {
          backFunction();
          return;
        }
        navigate(-1);
      }}
      className="backArrowContainer"
    >
      <img src={backArrowIcon} />
    </div>
  );
}
