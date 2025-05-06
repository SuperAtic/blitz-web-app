import React from "react";
import "./style.css";

export function KeyContainer(props) {
  let tempArr = [];

  const styles = {
    numberText: {
      marginRight: 10,
    },
    textInputStyle: {
      width: "90%",
      border: "none",
      background: "transparent",
      outline: "none",
    },
  };
  props.keys.forEach((element, id) => {
    tempArr.push(
      <div key={element} className="seedPill">
        <span className="seedText" style={styles.numberText}>
          {id}.
        </span>
        <input
          className="seedText"
          readOnly
          value={element}
          style={{
            ...styles.textInputStyle,
          }}
        />
      </div>
    );
  });

  return <div className="keyContainer">{tempArr}</div>;
}
