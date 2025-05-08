import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ErrorScreen.css"; // Optional: extract styles here
import { AnimatePresence, motion } from "framer-motion";
export default function ErrorScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [visible, setVisible] = useState(true); // controls animation

  const errorMessage = location?.state?.errorMessage || "Something went wrong.";
  const navigationFunction = location?.state?.navigationFunction;
  const customNavigator = location?.state?.customNavigator;

  const handleNavigation = () => {
    setVisible(false); // trigger exit animation
  };

  const handleExitComplete = () => {
    // Navigate AFTER exit animation finishes
    if (navigationFunction) {
      navigationFunction.navigator(navigationFunction.destination);
      navigate(-1);
    } else if (customNavigator) {
      customNavigator();
    } else {
      navigate(-1);
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
