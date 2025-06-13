import BackArrow from "../backArrow/backArrow";
import "./navbar.css";
export default function PageNavBar({ text = "", textClassName }) {
  return (
    <div className="pageNavBar">
      <BackArrow />
      <p className={`pageHeaderText ${textClassName}`}>{text}</p>
    </div>
  );
}
