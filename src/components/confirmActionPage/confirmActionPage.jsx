import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.css";
import { AnimatePresence, motion } from "framer-motion";

import { Colors } from "../../constants/theme";
import CustomButton from "../customButton/customButton";

export default function ConfirmActionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [visible, setVisible] = useState(true); // controls animation

  const {
    confirmHeader,
    confirmDescription: confirmMessage,
    fromRoute,
    navigateBack,
    customProps,
    useCustomProps,
    useProps,
  } = location.state;

  const handleExitComplete = () => {
    switch (navigateBack) {
      case "wallet":
        navigate("/wallet");
        break;
      case "homePage":
        navigate("/");
        break;
      case "settings-item":
        navigate("/settings-item", {
          state: {
            for: "backup wallet",
          },
          replace: true,
        });
        break;
      default:
        navigate(-1);
    }
  };

  const handleOkClick = (e) => {
    if (e) e.stopPropagation();
    setVisible(false);
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && (
        <motion.div
          onClick={(e) => handleOkClick(e)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: Colors.constants.halfModalBackground,
            zIndex: 2000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{ backgroundColor: Colors.dark.text }}
            className="confirm-action-content"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="confirm-action-header">{confirmHeader}</p>
            <p className="confirm-action-message">{confirmMessage}</p>

            <div
              className="confirm-action-button-container"
              style={{ alignSelf: "center" }}
            >
              <CustomButton
                actionFunction={() => {
                  if (fromRoute) {
                    if (useProps) {
                      navigate(
                        `/${fromRoute}`,
                        useCustomProps
                          ? { state: customProps, replace: true }
                          : { state: { confirmed: true }, replace: true }
                      );
                    } else {
                      navigate(`/${fromRoute}?confirmed=true`);
                    }
                    return;
                  }
                  handleOkClick();
                }}
                buttonStyles={{
                  backgroundColor: Colors.light.blue,
                  flex: 1,
                  margin: 5,
                }}
                textStyles={{ color: Colors.dark.text }}
                textContent={"Yes"}
              />
              <CustomButton
                actionFunction={handleOkClick}
                buttonStyles={{
                  backgroundColor: Colors.light.blue,
                  flex: 1,
                  margin: 5,
                }}
                textStyles={{ color: Colors.dark.text }}
                textContent={"No"}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
