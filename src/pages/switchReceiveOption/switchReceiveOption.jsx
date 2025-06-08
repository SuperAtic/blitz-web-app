// SlideUpPage.jsx
import BackArrow from "../../components/backArrow/backArrow";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import lightningIcon from "../../assets/lightningBoltDark.png";
import bitcoinIcon from "../../assets/chainDark.png";
import sparkIcon from "../../assets/SparkAsteriskBlack.png";
import "./style.css";

import { useEffect, useState } from "react";

export default function SwitchReceiveOption() {
  const [selectedOption, setSelectedOption] = useState("");
  const naigate = useNavigate();
  const location = useLocation();
  const props = location.state;

  const amount = props?.amount;
  const description = props?.description;

  useEffect(() => {
    if (!selectedOption) return;
    naigate(`/receive`, {
      state: {
        receiveOption: selectedOption,
        amount: Number(amount),
        description: description,
        navigateHome: true,
      },
      replace: true,
    });
  }, [selectedOption]);
  return (
    <div className="sliderContainer">
      <BackArrow />
      <div className="optionsContainer">
        <div onClick={() => setSelectedOption("lightning")} className="option">
          <img src={lightningIcon} alt="" />
          <p>Lightning | best for small payments</p>
        </div>
        {/* <div onClick={() => setSelectedOption("bitcoin")} className="option">
            <img src={bitcoinIcon} alt="" />
            <p>Bitcoin | best for large payments</p>
          </div> */}
        <div onClick={() => setSelectedOption("spark")} className="option">
          <img src={sparkIcon} alt="" />
          <p>Spark </p>
        </div>
      </div>
    </div>
  );
}
