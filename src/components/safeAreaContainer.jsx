import "./style.css";

export default function SafeAreaComponent({ children }) {
  return <div className="safeAreaContainer">{children}</div>;
}
