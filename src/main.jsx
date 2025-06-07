import "./fonts.css";
import "./index.css";
import App from "./App.jsx";
import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import SafeAreaComponent from "./components/safeAreaContainer.jsx";
import { AuthProvider } from "./contexts/authContext.jsx";
import AuthGate from "./components/authGate.jsx";
import { SparkWalletProvider } from "./contexts/sparkContext.jsx";
import { AnimatePresence } from "framer-motion";
import { NavigationStackProvider } from "./contexts/navigationLogger.jsx";

// Lazy-loaded pages
const CreateSeed = lazy(() => import("./pages/createSeed/createSeed.jsx"));
const DisclaimerPage = lazy(() => import("./pages/disclaimer/disclaimer.jsx"));
const CreatePassword = lazy(() =>
  import("./pages/createPassword/createPassword.jsx")
);
const Home = lazy(() => import("./pages/home/home.jsx"));
const Login = lazy(() => import("./pages/login/login.jsx"));
import WalletHome from "./pages/wallet/wallet.jsx";
// const WalletHome = lazy(() => import("./pages/wallet/wallet.jsx"));
const EditReceivePaymentInformation = lazy(() =>
  import("./pages/receiveAmount/receiveAmount.jsx")
);
const ReceiveQRPage = lazy(() =>
  import("./pages/receiveQRPage/receiveQRPage.jsx")
);
const Camera = lazy(() => import("./pages/camera/camera.jsx"));
const SwitchReceiveOption = lazy(() =>
  import("./pages/switchReceiveOption/switchReceiveOption.jsx")
);
const SendPage = lazy(() => import("./pages/sendPage/sendPage.jsx"));
import ConfirmPayment from "./pages/confirmPayment/confirmPaymentScreen.jsx";
import { ThemeContextProvider } from "./contexts/themeContext.jsx";
import LoadingScreen from "./pages/loadingScreen/index.jsx";
import { BitcoinPriceProvider } from "./contexts/bitcoinPriceContext.jsx";
import { KeysContextProvider } from "./contexts/keysContext.jsx";
import { GlobalContextProvider } from "./contexts/masterInfoObject.jsx";
import { GlobalAppDataProvider } from "./contexts/appDataContext.jsx";
import { GlobalContactsList } from "./contexts/globalContacts.jsx";
import { AppStatusProvider } from "./contexts/appStatus.jsx";
import { GLobalNodeContextProider } from "./contexts/nodeContext.jsx";
import { LiquidEventProvider } from "./contexts/liquidEventContext.jsx";
// const ConfirmPayment = lazy(() =>
//   import("./pages/confirmPayment/confirmPaymentScreen.jsx")
// );
const SettingsHome = lazy(() => import("./pages/settings/settings.jsx"));
const ViewMnemoinc = lazy(() => import("./pages/viewkey/viewKey.jsx"));
const RestoreWallet = lazy(() =>
  import("./pages/restoreWallet/restoreWallet.jsx")
);
const ErrorScreen = lazy(() => import("./pages/error/error.jsx"));
const ViewAllTxsPage = lazy(() =>
  import("./pages/viewAllTx/viewAllTxPage.jsx")
);

function Root() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <NavigationStackProvider>
      <KeysContextProvider>
        <GlobalContactsList>
          <AppStatusProvider>
            <ThemeContextProvider>
              <GLobalNodeContextProider>
                <SparkWalletProvider navigate={navigate}>
                  <GlobalContextProvider>
                    <BitcoinPriceProvider>
                      <GlobalAppDataProvider>
                        <LiquidEventProvider>
                          <AuthProvider navigate={navigate}>
                            <AuthGate />
                            <AnimatePresence mode="wait">
                              <Suspense
                                fallback={
                                  <SafeAreaComponent>
                                    <div
                                      style={{
                                        flex: 1,
                                        width: "100%",
                                        height: "100%",
                                        alignItems: "center",
                                        justifyContent: "center",
                                      }}
                                    >
                                      Loading...
                                    </div>
                                  </SafeAreaComponent>
                                }
                              >
                                <Routes
                                  location={location}
                                  key={location.pathname}
                                >
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
                                  <Route path="/camera" element={<Camera />} />
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
                                  <Route
                                    path="/viewAllTransactions"
                                    element={
                                      <SafeAreaComponent>
                                        <ViewAllTxsPage />
                                      </SafeAreaComponent>
                                    }
                                  />
                                  <Route
                                    path="/connecting"
                                    element={
                                      <SafeAreaComponent>
                                        <LoadingScreen />
                                      </SafeAreaComponent>
                                    }
                                  />
                                  <Route
                                    path="/error"
                                    element={<ErrorScreen />}
                                  />
                                </Routes>
                              </Suspense>
                            </AnimatePresence>
                          </AuthProvider>
                        </LiquidEventProvider>
                      </GlobalAppDataProvider>
                    </BitcoinPriceProvider>
                  </GlobalContextProvider>
                </SparkWalletProvider>
              </GLobalNodeContextProider>
            </ThemeContextProvider>
          </AppStatusProvider>
        </GlobalContactsList>
      </KeysContextProvider>
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
