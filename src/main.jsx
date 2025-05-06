import "./index.css";
import App from "./App.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

import SafeAreaComponent from "./components/safeAreaContainer.jsx";
import CreateSeed from "./pages/createSeed/createSeed.jsx";
import DisclaimerPage from "./pages/disclaimer/disclaimer.jsx";
import CreatePassword from "./pages/createPassword/createPassword.jsx";
import { AuthProvider } from "./contexts/authContext.jsx";
import AuthGate from "./components/authGate.jsx";
import Home from "./pages/home/home.jsx";
import Login from "./pages/login/login.jsx";
import { SparkProvier } from "./contexts/sparkContext.jsx";
import WalletHome from "./pages/wallet/wallet.jsx";
import EditReceivePaymentInformation from "./pages/receiveAmount/receiveAmount.jsx";
import ReceiveQRPage from "./pages/receiveQRPage/receiveQRPage.jsx";
import Camera from "./pages/camera/camera.jsx";

function Root() {
  const navigate = useNavigate();

  return (
    <AuthProvider navigate={navigate}>
      <SparkProvier navigate={navigate}>
        <AuthGate />
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <SafeAreaComponent>
                <Home />
              </SafeAreaComponent>
            }
          />

          <Route
            path="/disclaimer"
            element={
              <SafeAreaComponent>
                <DisclaimerPage />
              </SafeAreaComponent>
            }
          />
          <Route
            path="/createAccount"
            element={
              <SafeAreaComponent>
                <CreateSeed />
              </SafeAreaComponent>
            }
          />
          <Route
            path="/createPassword"
            element={
              <SafeAreaComponent>
                <CreatePassword />
              </SafeAreaComponent>
            }
          />
          <Route
            path="/login"
            element={
              <SafeAreaComponent>
                <Login />
              </SafeAreaComponent>
            }
          />

          <Route
            path="/wallet"
            element={
              <SafeAreaComponent>
                <WalletHome />
              </SafeAreaComponent>
            }
          />
          <Route
            path="/receiveAmount"
            element={
              <SafeAreaComponent>
                <EditReceivePaymentInformation />
              </SafeAreaComponent>
            }
          />
          <Route
            path="/receive"
            element={
              <SafeAreaComponent>
                <ReceiveQRPage />
              </SafeAreaComponent>
            }
          />
          <Route
            path="/camera"
            element={
              <SafeAreaComponent>
                <Camera />
              </SafeAreaComponent>
            }
          />
        </Routes>
      </SparkProvier>
    </AuthProvider>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </StrictMode>
);
