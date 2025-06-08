import "./style.css";
export default function ActivityIndicator({ color, size = "small" }) {
  return (
    <div
      style={{
        width: "small" ? "20px" : "40px",
        height: "small" ? "20px" : "40px",
        border: color,
        borderTop: color,
      }}
      id="activityIndicator"
    ></div>
  );
}
