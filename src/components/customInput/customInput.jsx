import "./style.css";
export default function CustomInput({
  onchange,
  placeholder,
  value,
  textInputClassName,
  containerClassName,
  onFocus,
  onBlur,
}) {
  console.log(containerClassName);
  return (
    <div className={`custom-description-input-container ${containerClassName}`}>
      <input
        type="text"
        value={value}
        onChange={(e) => onchange(e.target.value)}
        placeholder={placeholder}
        className={`description-input ${textInputClassName}`}
        onFocus={() => onFocus && onFocus(true)}
        onBlur={() => onblur && onBlur(false)}
      />
    </div>
  );
}
