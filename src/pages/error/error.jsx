import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ErrorScreen.css"; // Optional: extract styles here
import { AnimatePresence, motion } from "framer-motion";
export default function ErrorScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [visible, setVisible] = useState(true); // controls animation

  const errorMessage = location?.state?.errorMessage || "Something went wrong.";
  const navigateBack = location?.state?.navigateBack;

  const handleNavigation = () => {
    setVisible(false); // trigger exit animation
  };

  const handleExitComplete = () => {
    switch (navigateBack) {
      case "wallet":
        navigate("/wallet");
        break;
      case "homePage":
        navigate("/");
        break;
      // Add other cases as needed
      default:
        navigate(-1); // Default: go back one step in history
    }
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && (
        <motion.div
          className="error-screen-overlay"
          onClick={handleNavigation}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="error-content"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <p className="error-message">{errorMessage}</p>
            <div className="error-divider" />
            <button className="error-ok-button" onClick={handleNavigation}>
              OK
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
