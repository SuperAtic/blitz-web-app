import "./style.css";
import BackArrow from "../../components/backArrow/backArrow";
import { useEffect, useState } from "react";
import { generateMnemonic } from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english";
import { KeyContainer } from "../../components/keyContainer/keyContainer";
import { useNavigate } from "react-router-dom";
import copyToClipboard from "../../functions/copyToClipboard";
function CreateSeed() {
  const navigate = useNavigate();
  const [seed, setSeed] = useState([]);
  useEffect(() => {
    async function generateSeed() {
      try {
        let generatedMnemonic = generateMnemonic(wordlist);
        const unuiqueKeys = new Set(generatedMnemonic.split(" "));

        if (unuiqueKeys.size !== 12) {
          let runCount = 0;
          let didFindValidMnemoinc = false;
          while (runCount < 50 && !didFindValidMnemoinc) {
            console.log(
              `Running retry for account mnemoinc count: ${runCount}`
            );
            runCount += 1;
            const newTry = generateMnemonic(wordlist);
            const uniqueItems = new Set(newTry.split(" "));
            if (uniqueItems.size != 12) continue;
            didFindValidMnemoinc = true;
            generatedMnemonic = newTry;
          }
        }

        const filtedMnemoinc = generatedMnemonic.split(" ");

        setSeed(filtedMnemoinc);
      } catch (err) {
        console.log("Error generating seed", err);
      }
    }
    generateSeed();
  }, []);

  return (
    <div className="seedContainer">
      <BackArrow />
      <p className="headerInfoText">
        This is your password to your money, if you lose it you will lose your
        money!
      </p>

      <div className="keyContainerWrapper">
        <KeyContainer keys={seed} />
      </div>
      <p className="firstWarningText">
        Write it down with a pen and paper and keep it safe!
      </p>
      <p className="secondWarningText">WE CAN NOT help you if you lose it</p>

      <div className="buttonsContainer">
        <button
          onClick={() => {
            copyToClipboard(seed.join(" "));
          }}
        >
          Copy
        </button>
        <button
          onClick={() =>
            navigate("/createPassword", {
              state: { mnemoinc: seed.join(" ") },
            })
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CreateSeed;
