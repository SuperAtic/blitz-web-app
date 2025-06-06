import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Storage from "../functions/localStorage";
import { deleteSparkTransactionTable } from "../functions/txStorage";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children, navigate }) => {
  // const navigate = useNavigate();
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    lastSession: null,
    walletKey: null,
  });
  const [mnemoinc, setMnemoinc] = useState("");

  const login = (walletKey) => {
    Storage.setItem("walletKey", walletKey);

    Storage.setItem("lastSession", Date.now().toString());

    setAuthState({
      isAuthenticated: true,
      walletKey,
      lastSession: Date.now().toString(),
    });
    navigate("/connecting");
  };

  const deleteWallet = () => {
    Storage.removeItem("walletKey");
    Storage.removeItem("lastSession");
    deleteSparkTransactionTable();
    setAuthState({
      isAuthenticated: false,
      walletKey: null,
      lastSession: null,
    });
    navigate("/");
  };

  const logout = () => {
    Storage.removeItem("lastSession");
    setAuthState({
      isAuthenticated: false,
      walletKey: null,
      lastSession: null,
    });
    navigate("/login");
  };

  const updateSession = () => {
    const currentTime = Date.now();
    Storage.setItem("lastSession", currentTime.toString());

    setAuthState((prevState) => ({
      ...prevState,
      lastSession: currentTime.toString(),
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        login,
        logout,
        updateSession,
        setMnemoinc,
        mnemoinc,
        setAuthState,
        deleteWallet,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
