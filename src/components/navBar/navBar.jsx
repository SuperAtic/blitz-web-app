import BackArrow from "../backArrow/backArrow";
import "./navbar.css";
export default function PageNavBar({ text = "" }) {
  return (
    <div className="pageNavBar">
      <BackArrow />
      <p className="pageHeaderText">{text}</p>
    </div>
  );
}
