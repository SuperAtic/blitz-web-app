import React, { useMemo } from "react";
import { wordlist } from "@scure/bip39/wordlists/english";

export default function SuggestedWordContainer({
  inputedKey,
  selectedKey,
  setInputedKey,
  keyRefs,
}) {
  const searchingWord = inputedKey[`key${selectedKey}`] || "";

  const suggestedWordElements = useMemo(() => {
    return wordlist
      .filter((word) =>
        word.toLowerCase().startsWith(searchingWord.toLowerCase())
      )
      .map((word) => (
        <button
          key={word}
          onClick={() => {
            setInputedKey((prev) => ({ ...prev, [`key${selectedKey}`]: word }));
            if (selectedKey === 12) {
              keyRefs.current[12]?.blur();
              return;
            }
            keyRefs.current[selectedKey + 1]?.focus();
          }}
          style={{
            minHeight: "60px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            marginTop: "auto",
          }}
        >
          <p>{word}</p>
        </button>
      ));
  }, [selectedKey, inputedKey, setInputedKey, keyRefs]);

  const containerStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  };

  const wordContainerBaseStyle = {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",

    borderStyle: "solid",
  };

  return (
    <div style={containerStyle}>
      {suggestedWordElements.length >= 3 ? (
        <>
          <div style={{ ...wordContainerBaseStyle, borderRightWidth: "1px" }}>
            {suggestedWordElements[0]}
          </div>
          <div style={{ ...wordContainerBaseStyle, borderRightWidth: "1px" }}>
            {suggestedWordElements[1]}
          </div>
          <div style={wordContainerBaseStyle}>{suggestedWordElements[2]}</div>
        </>
      ) : suggestedWordElements.length === 2 ? (
        <>
          <div style={{ ...wordContainerBaseStyle, borderRightWidth: "1px" }}>
            {suggestedWordElements[0]}
          </div>
          <div style={wordContainerBaseStyle}>{suggestedWordElements[1]}</div>
        </>
      ) : (
        <div style={wordContainerBaseStyle}>
          {suggestedWordElements.length === 0 ? (
            <div style={{ minHeight: "60px" }} />
          ) : (
            suggestedWordElements[0]
          )}
        </div>
      )}
    </div>
  );
}
