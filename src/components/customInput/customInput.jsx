import "./style.css";

export default function CustomInput({
  onchange,
  placeholder,
  value,
  textInputClassName = "",
  customInputStyles = {},
  containerClassName = "",
  containerStyles = {},
  onFocus,
  onBlur,
  multiline = false, // <-- NEW prop
}) {
  const commonProps = {
    value,
    onChange: (e) => onchange(e.target.value),
    placeholder,
    className: `description-input ${textInputClassName}`,
    onFocus: () => onFocus?.(true),
    onBlur: () => onBlur?.(false),
    style: {
      ...customInputStyles,
      resize: "none", // <-- Prevents resize
    },
  };

  return (
    <div
      style={{ ...containerStyles }}
      className={`custom-description-input-container ${containerClassName}`}
    >
      {multiline ? (
        <textarea {...commonProps} />
      ) : (
        <input type="text" {...commonProps} />
      )}
    </div>
  );
}
