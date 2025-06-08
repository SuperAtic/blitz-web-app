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
}) {
  console.log(textStyles);
  return (
    <button
      onClick={() => {
        if (!actionFunction) return;
        actionFunction();
      }}
      id="customButton"
      style={{ ...buttonStyles }}
    >
      {useLoading ? (
        <FullLoadingScreen
          showText={false}
          size="small"
          loadingColor={Colors.light.text}
        />
      ) : (
        <ThemeText
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
