// SlideUpPage.jsx
import { motion } from "framer-motion";
import BackArrow from "../../components/backArrow/backArrow";
import { useNavigate } from "react-router-dom";
import lightningIcon from "../../assets/lightningBoltDark.png";
import bitcoinIcon from "../../assets/chainDark.png";
import sparkIcon from "../../assets/SparkAsteriskBlack.png";
import "./style.css";
import SafeAreaComponent from "../../components/safeAreaContainer";
import { useEffect, useState } from "react";

export default function SwitchReceiveOption() {
  const [selectedOption, setSelectedOption] = useState("");
  const naigate = useNavigate();

  useEffect(() => {
    if (!selectedOption) return;
    naigate("/receive", {
      state: { selectedRecieveOption: selectedOption },
      replace: true,
    });
  }, [selectedOption]);
  return (
    <motion.div
      className="sliderContainer"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.5 }}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        zIndex: 1000,
        flex: 1,
      }}
    >
      <SafeAreaComponent>
        <BackArrow />
        <div className="optionsContainer">
          <div
            onClick={() => setSelectedOption("lightning")}
            className="option"
          >
            <img src={lightningIcon} alt="" />
            <p>Lightning | best for small payments</p>
          </div>
          <div onClick={() => setSelectedOption("bitcoin")} className="option">
            <img src={bitcoinIcon} alt="" />
            <p>Bitcoin | best for large payments</p>
          </div>
          <div onClick={() => setSelectedOption("spark")} className="option">
            <img src={sparkIcon} alt="" />
            <p>Spark </p>
          </div>
        </div>
      </SafeAreaComponent>
    </motion.div>
  );
}
