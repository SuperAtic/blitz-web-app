import { Colors } from "../../constants/theme";
import { useThemeContext } from "../../contexts/themeContext";

export default function ThemeText({
  textContent,
  colorOverride,
  textStyles,
  className,
}) {
  const { theme } = useThemeContext();
  return (
    <p
      className={`${className || ""}`}
      style={{
        color: colorOverride ? colorOverride : Colors[theme].text,
        ...textStyles,
      }}
    >
      {textContent}
    </p>
  );
}
