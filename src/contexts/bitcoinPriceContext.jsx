import React, { createContext, useState, useEffect, useContext } from "react";

const BitcoinPriceContext = createContext();

export const useBitcoinPriceContext = () => useContext(BitcoinPriceContext);

export const BitcoinPriceProvider = ({ children }) => {
  const [bitcoinPriceArray, setBitcoinPriceArray] = useState([]);
  const [selectedBitcoinPrice, setSelectedBitcionPrice] = useState({});

  const toggleSelectedBitcoinPrice = (newPriceObject) => {
    setSelectedBitcionPrice(newPriceObject);
  };

  return (
    <BitcoinPriceContext.Provider
      value={{
        bitcoinPriceArray,
        selectedBitcoinPrice,
        toggleSelectedBitcoinPrice,
        setBitcoinPriceArray,
      }}
    >
      {children}
    </BitcoinPriceContext.Provider>
  );
};
