import { Colors } from "../../constants/theme";
import { useThemeContext } from "../../contexts/themeContext";

export default function ThemeText({ textContent, colorOverride }) {
  const { theme } = useThemeContext();
  return (
    <p style={{ color: colorOverride ? colorOverride : Colors[theme].blue }}>
      {textContent}
    </p>
  );
}
