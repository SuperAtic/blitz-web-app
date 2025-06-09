import "./style.css";

export default function SafeAreaComponent({ children, addedClassName }) {
  return (
    <div className={`safeAreaContainer ${addedClassName || ""}`}>
      {children}
    </div>
  );
}
