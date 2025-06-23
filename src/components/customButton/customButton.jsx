import { Colors } from "../../constants/theme";
import FullLoadingScreen from "../fullLoadingScreen/fullLoadingScreen";
import ThemeText from "../themeText/themeText";
import "./style.css";

export default function CustomButton({
  buttonStyles,
  textStyles,
  actionFunction,
  textContent,
  useLoading,
  buttonClassName,
  textClassName,
}) {
  return (
    <button
      onClick={() => {
        if (!actionFunction) return;
        actionFunction();
      }}
      style={{ ...buttonStyles }}
      className={`customButton ${buttonClassName}`}
    >
      {useLoading ? (
        <FullLoadingScreen
          showText={false}
          size="small"
          loadingColor={Colors.light.text}
        />
      ) : (
        <ThemeText
          className={textClassName}
          textContent={textContent}
          textStyles={{
            color: Colors.light.text,
            ...textStyles,
          }}
        />
      )}
    </button>
  );
}
