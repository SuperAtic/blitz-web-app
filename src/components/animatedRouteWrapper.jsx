import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function AnimatedRouteWrapper({
  children,
  initialAnimation,
  animate,
  exitAnimation,
}) {
  const location = useLocation();

  return (
    <motion.div
      key={location.pathname}
      initial={initialAnimation}
      animate={animate}
      exit={exitAnimation}
      transition={{ duration: 0.5 }}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </motion.div>
  );
}
