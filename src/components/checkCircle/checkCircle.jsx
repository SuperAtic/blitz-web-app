import "./style.css";
import checkMark from "../../assets/checkMark.png";
import { Colors } from "../../constants/theme";
export default function CheckCircle({ isActive, containerSize = 30 }) {
  return (
    <div
      style={{
        backgroundColor: isActive ? Colors.light.blue : "transparent",
        borderWidth: isActive ? 0 : "2px",
        borderColor: isActive ? "transparent" : Colors.light.text,
        height: containerSize,
        width: containerSize,
      }}
      id="customCheckCircle"
    >
      {isActive && <img src={checkMark} alt="" className="checkMark" />}
    </div>
  );
}
