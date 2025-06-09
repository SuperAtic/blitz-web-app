import { useEffect, useState } from "react";
import "./send.css";
import { useLocation, useNavigate } from "react-router-dom";
import BackArrow from "../../components/backArrow/backArrow";
import { processInputType } from "../../functions/sendPayment";
import walletIcon from "../../assets/adminHomeWallet_dark.png";
import arrowIcon from "../../assets/arrow-left-blue.png";
import deleteIcon from "../../assets/leftCheveronDark.png";
import { sparkPaymenWrapper } from "../../functions/spark/payments";
import { useSpark } from "../../contexts/sparkContext";
import FullLoadingScreen from "../../components/fullLoadingScreen/fullLoadingScreen";
import { Colors } from "../../constants/theme";
import hasAlredyPaidInvoice from "../../functions/sendBitcoin/hasPaid";
import { useGlobalContextProvider } from "../../contexts/masterInfoObject";
import { useNodeContext } from "../../contexts/nodeContext";
import { useAppStatus } from "../../contexts/appStatus";
import ErrorWithPayment from "./components/errorScreen";
import decodeSendAddress from "../../functions/sendBitcoin/decodeSendAdress";
import { SATSPERBITCOIN } from "../../constants";

export default function SendPage() {
  const location = useLocation();
  const params = location.state || {};

  const {
    btcAddress: btcAdress,
    fromPage,
    publishMessageFunc,
    comingFromAccept,
    enteredPaymentInfo,
    errorMessage: globalError,
  } = params;
  const [paymentInfo, setPaymentInfo] = useState({});
  const { masterInfoObject, toggleMasterInfoObject } =
    useGlobalContextProvider();
  const { liquidNodeInformation, fiatStats } = useNodeContext();
  const { minMaxLiquidSwapAmounts } = useAppStatus();
  const [isSendingPayment, setIsSendingPayment] = useState(false);
  const [paymentDescription, setPaymentDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(globalError);
  const [loadingMessage, setLoadingMessage] = useState(
    "Getting invoice information"
  );
  const navigate = useNavigate();
  const { sparkInformation } = useSpark();

  const sendingAmount = paymentInfo?.sendAmount || 0;
  const isBTCdenominated =
    masterInfoObject.userBalanceDenomination === "hidden" ||
    masterInfoObject.userBalanceDenomination === "sats";
  const canEditPaymentAmount = paymentInfo?.canEditPayment;
  const convertedSendAmount = isBTCdenominated
    ? Math.round(Number(sendingAmount))
    : Math.round((SATSPERBITCOIN / fiatStats?.value) * Number(sendingAmount));

  const isLightningPayment = paymentInfo?.paymentNetwork === "lightning";
  const isLiquidPayment = paymentInfo?.paymentNetwork === "liquid";
  const isBitcoinPayment = paymentInfo?.paymentNetwork === "Bitcoin";
  const isSparkPayment = paymentInfo?.paymentNetwork === "spark";

  const paymentFee =
    (paymentInfo?.paymentFee || 0) + (paymentInfo?.supportFee || 0);
  const canSendPayment =
    Number(sparkInformation.balance) >= Number(sendingAmount) + paymentFee &&
    sendingAmount != 0; //ecash is built into ln
  console.log(
    canSendPayment,
    "can send payment",
    sparkInformation.balance,
    sendingAmount,
    paymentFee,
    sendingAmount,
    paymentInfo
  ); //ecash is built into ln);
  const isUsingSwapWithZeroInvoice =
    paymentInfo?.paymentNetwork === "lightning" &&
    paymentInfo.type === "bolt11" &&
    !paymentInfo?.data?.invoice.amountMsat;

  useEffect(() => {
    async function decodePayment() {
      // const didPay = hasAlredyPaidInvoice({
      //   scannedAddress: btcAdress,
      //   sparkInformation,
      // });

      // if (didPay) {
      //   errorMessageNavigation("You have already paid this invoice");
      //   return;
      // }

      console.log({
        fiatStats,
        btcAdress,
        goBackFunction: errorMessageNavigation,
        setPaymentInfo,
        liquidNodeInformation,
        masterInfoObject,
        // setWebViewArgs,
        navigate,
        maxZeroConf:
          minMaxLiquidSwapAmounts?.submarineSwapStats?.limits?.maximalZeroConf,
        comingFromAccept,
        enteredPaymentInfo,
        setLoadingMessage,
        paymentInfo,
        fromPage,
        publishMessageFunc,
      });

      await decodeSendAddress({
        fiatStats,
        btcAdress,
        goBackFunction: errorMessageNavigation,
        setPaymentInfo,
        liquidNodeInformation,
        masterInfoObject,
        // setWebViewArgs,
        // webViewRef,
        navigate,
        maxZeroConf:
          minMaxLiquidSwapAmounts?.submarineSwapStats?.limits?.maximalZeroConf,
        comingFromAccept,
        enteredPaymentInfo,
        setLoadingMessage,
        paymentInfo,
        fromPage,
        publishMessageFunc,
      });
    }
    setTimeout(decodePayment, 1000);
  }, []);

  const handleSend = async () => {
    if (isSendingPayment || !paymentInfo.paymentType) return;
    setIsSendingPayment(true);

    try {
      const response = await sparkPaymenWrapper({
        address: paymentInfo.invoice,
        paymentType: paymentInfo.paymentType,
        amountSats: Number(paymentInfo.amount),
        fee: (paymentInfo.fee || 0) + (paymentInfo.supportFee || 0),
        memo: paymentInfo.description,
        passedSupportFee: paymentInfo.supportFee,
        userBalance: sparkInformation.balance,
      });

      navigate("/confirm-page", {
        state: {
          for: response.didWork ? "paymentsucceed" : "paymentFailed",
          information: {
            error: response.error || "",
            fee: response.didWork
              ? (paymentInfo.fee || 0) + (paymentInfo.supportFee || 0)
              : 0,
            type: paymentInfo.paymentType,
            totalValue: paymentInfo.amount,
          },
        },
      });
    } catch (err) {
      console.error("Payment send error", err);
    }
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const decodedInvoice = await processInputType(
        params.btcAddress,
        paymentInfo
      );
      if (!decodedInvoice) throw new Error("Invalid address");
      setPaymentInfo(decodedInvoice);
      setIsLoading(false);
    } catch (err) {
      console.error("Error saving payment info", err);
      setIsLoading(false);
      navigate("/error", {
        state: {
          errorMessage: "Error decoding payment.",
          navigateBack: "wallet",
          background: location,
        },
      });
    }
  };

  if (!Object.keys(paymentInfo).length && !errorMessage)
    return (
      <FullLoadingScreen
        loadingColor={Colors.light.blue}
        text={loadingMessage}
      />
    );

  if (errorMessage) {
    console.log("RUNNING ERROR COMPONENT");
    return <ErrorWithPayment reason={errorMessage} />;
  }

  const totalFee = (paymentInfo.fee || 0) + (paymentInfo.supportFee || 0);

  const handleKeypad = (key) => {
    setPaymentInfo((prev) => {
      if (key === "delete") {
        return { ...prev, amount: String(prev.amount).slice(0, -1) };
      } else if (key === "C" && inputDenomination === "sats") {
        return { ...prev, amount: "" };
      } else {
        return { ...prev, amount: String(prev.amount) + key };
      }
    });
  };
  console.log(paymentInfo);
  return (
    <div className="sendContainer">
      <NabBar sparkInformation={sparkInformation} />
      <div className="paymentInfoContainer">
        <h1 className="paymentAmount">{paymentInfo.amount || 0} sats</h1>
        {!paymentInfo.canEdit && (
          <>
            <p className="paymentFeeDesc">Fee & speed</p>
            <p className="paymentFeeVal">{totalFee} sats and Instant</p>
          </>
        )}

        {paymentInfo.canEdit && (
          <div
            style={{ marginBottom: 0, marginTop: "auto" }}
            className="number-keyboard"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, "C", 0, "delete"].map((num) => (
              <button
                key={num}
                className="keyboard-key"
                onClick={() => handleKeypad(num)}
              >
                {num === "delete" ? <img src={deleteIcon} /> : num}
              </button>
            ))}
          </div>
        )}

        <button
          style={{ marginTop: paymentInfo.canEdit ? 0 : "auto" }}
          onClick={paymentInfo.canEdit ? handleSave : handleSend}
          disabled={isSendingPayment}
        >
          {paymentInfo.canEdit
            ? isLoading
              ? "Loading..."
              : "Save"
            : isSendingPayment
            ? "Sending..."
            : "Send Payment"}
        </button>
      </div>
    </div>
  );
  function goBackFunction() {
    navigate(-1);
  }
  function errorMessageNavigation(reason) {
    setErrorMessage(reason);
    setPaymentInfo({});
  }
}

function NabBar({ sparkInformation }) {
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <img onClick={() => navigate(-1)} src={arrowIcon} alt="" />
      <div className="label">
        <img src={walletIcon} alt="" />
        <p>{sparkInformation.balance} stats</p>
      </div>
    </div>
  );
}
