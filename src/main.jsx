import "./index.css";
import App from "./App.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

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
import SwitchReceiveOption from "./pages/switchReceiveOption/switchReceiveOption.jsx";
import { AnimatePresence } from "framer-motion";
import SendPage from "./pages/sendPage/sendPage.jsx";
import ConfirmPayment from "./pages/confirmPayment/confirmPaymentScreen.jsx";
import SettingsHome from "./pages/settings/settings.jsx";
import ViewMnemoinc from "./pages/viewkey/viewKey.jsx";
import RestoreWallet from "./pages/restoreWallet/restoreWallet.jsx";
import ErrorScreen from "./pages/error/error.jsx";
import { NavigationStackProvider } from "./contexts/navigationLogger.jsx";

function Root() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <NavigationStackProvider>
      <AuthProvider navigate={navigate}>
        <SparkProvier navigate={navigate}>
          <AuthGate />
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
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
                path="/send"
                element={
                  <SafeAreaComponent>
                    <SendPage />
                  </SafeAreaComponent>
                }
              />
              <Route
                path="/receive-options"
                element={<SwitchReceiveOption />}
              />
              <Route
                path="/camera"
                element={
                  <SafeAreaComponent>
                    <Camera />
                  </SafeAreaComponent>
                }
              />
              <Route
                path="/confirm-page"
                element={
                  <SafeAreaComponent>
                    <ConfirmPayment />
                  </SafeAreaComponent>
                }
              />
              <Route
                path="/settings"
                element={
                  <SafeAreaComponent>
                    <SettingsHome />
                  </SafeAreaComponent>
                }
              />
              <Route
                path="/key"
                element={
                  <SafeAreaComponent>
                    <ViewMnemoinc />
                  </SafeAreaComponent>
                }
              />
              <Route
                path="/restore"
                element={
                  <SafeAreaComponent>
                    <RestoreWallet />
                  </SafeAreaComponent>
                }
              />
              <Route path="/error" element={<ErrorScreen />} />
            </Routes>
          </AnimatePresence>
        </SparkProvier>
      </AuthProvider>
    </NavigationStackProvider>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </StrictMode>
);
