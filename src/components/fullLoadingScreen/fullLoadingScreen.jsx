import { Colors } from "../../constants/theme";
import { useThemeContext } from "../../contexts/themeContext";
import ActivityIndicator from "../activityIndicator/activityIndicator";
import ThemeText from "../themeText/themeText";
import "./style.css";

export default function FullLoadingScreen({
  text,
  containerStyles,
  reversed,
  textStyles,
  showLoadingIcon = true,
  size = "large",
  loadingColor,
  showText = true,
}) {
  const { theme } = useThemeContext();
  return (
    <div id="fullLoadingScreenContainer" style={{ ...containerStyles }}>
      {showLoadingIcon && (
        <ActivityIndicator
          color={loadingColor ? loadingColor : Colors.light.text}
          size={size}
        />
      )}
      {showText && (
        <ThemeText textStyles={{ ...textStyles }} textContent={text} />
      )}
    </div>
  );
}
