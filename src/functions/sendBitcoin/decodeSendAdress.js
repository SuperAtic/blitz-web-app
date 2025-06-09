import { getLNAddressForLiquidPayment } from "./payments";
import processBitcoinAddress from "./processBitcoinAddress";
import processBolt11Invoice from "./processBolt11Invoice";
import processLNUrlAuth from "./processLNUrlAuth";
import processLNUrlPay from "./processLNUrlPay";
import processLNUrlWithdraw from "./processLNUrlWithdrawl";
import processLiquidAddress from "./processLiquidAddress";
// import processBolt12Offer from "./processBolt12Offer";
import { getLiquidSdk } from "../connectToLiquid";
import displayCorrectDenomination from "../displayCorrectDenomination";
import getLiquidAddressFromSwap from "../boltz/magicRoutingHints";
import { LIQUID_TYPES } from "../../constants";

export default async function decodeSendAddress(props) {
  let {
    btcAdress,
    goBackFunction,
    setPaymentInfo,
    liquidNodeInformation,
    masterInfoObject,
    // webViewRef,
    navigate,
    maxZeroConf,
    comingFromAccept,
    enteredPaymentInfo,
    setLoadingMessage,
    paymentInfo,
    parsedInvoice,
    fiatStats,
    fromPage,
    publishMessageFunc,
  } = props;

  try {
    // const sdk = getLiquidSdk();
    // Handle cryptoqr.net special case
    if (btcAdress.includes("cryptoqr.net")) {
      try {
        const [username, domain] = btcAdress.split("@");
        const response = await fetch(
          `https://${domain}/.well-known/lnurlp/${username}`
        );
        const data = await response.json();

        if (data.status === "ERROR") {
          goBackFunction(
            "Not able to get merchant payment information from invoice"
          );
          return;
        }

        const bolt11 = await getLNAddressForLiquidPayment(
          { data, type: "lnurlpay" },
          data.minSendable / 1000
        );

        if (!bolt11) throw new Error("Not able to parse invoice");

        const parsedInvoice = await sdk.parseInvoice(bolt11);

        if (parsedInvoice.amountMsat / 1000 >= maxZeroConf) {
          goBackFunction(
            `Cannot send more than ${displayCorrectDenomination({
              amount: maxZeroConf,
              nodeInformation,
              masterInfoObject,
            })} to a merchant`
          );
          return;
        }
        btcAdress = bolt11;
      } catch (err) {
        console.log("error getting cryptoQR", err);
        goBackFunction(
          `There was a problem getting the invoice for this address`
        );
        return;
      }
    }
    if (btcAdress.startsWith("spark:") || btcAdress.startsWith("sp1p")) {
      if (btcAdress.startsWith("spark:")) {
        const processedAddress = decodeBip21SparkAddress(btcAdress);
        parsedInvoice = {
          type: "Spark",
          address: {
            adress: processedAddress.address,
            message: processedAddress.options.message,
            label: processedAddress.options.label,
            network: "Spark",
            amount: processedAddress.options.amount * SATSPERBITCOIN,
          },
        };
      } else {
        parsedInvoice = {
          type: "Spark",
          address: {
            address: btcAdress,
            message: null,
            label: null,
            network: "Spark",
            amount: null,
          },
        };
      }
    }

    // const chosenPath = parsedInvoice
    //   ? Promise.resolve(parsedInvoice)
    //   : sdk.parse(btcAdress);

    let input = {
      type: "bolt11",
      invoice: {
        bolt11:
          "LNBC1P5YWH3JPP5JAAFXV03V34ZDAAXLRQN40VUXY0DXZSD6PKE6S6KULQGVCLSHRCSCQZYSSP5YFES0Y5EVYE43XZPSYYU3NLK3GE887Q9RRNZKDVDXEPJHCJ7YY8S9Q7SQQQQQQQQQQQQQQQQQQQSQQQQQYSGQDQQMQZ9GXQYJW5QRZJQWRYAUP9LH50KKRANZGCDNN2FGVX390WGJ5JD07RWR3VXEJE0GLCLLCM6EDLG4FELQQQQQLGQQQQQEQQJQHH7U43EQX8Q8P6CXGSX07SMF3EHENEW9LZNAXUGCNUUQYDADND4SCF2VQ85WU4U6QP405FUYU6MXV8J7UCE58V7MA4UA7LX9MSCPVZQPS3Q3E2",
        network: "bitcoin",
        payeePubkey:
          "029379fcb7a0e39a9f7b196ae5a4a533309bed0b0fb0ae271e5e1bd65bf45539f8",
        paymentHash:
          "977a9331f1646a26f7a6f8c13abd9c311ed30a0dd06d9d4356e7c08663f0b8f1",
        description: "",
        timestamp: 1749507634,
        expiry: 604800,
        routingHints: [
          {
            hops: [
              {
                srcNodeId:
                  "03864ef025fde8fb587d989186ce6a4a186895ee44a926bfc370e2c366597a3f8f",
                shortChannelId: "16718806x6026325x14840",
                feesBaseMsat: 1000,
                feesProportionalMillionths: 100,
                cltvExpiryDelta: 144,
              },
            ],
          },
        ],
        paymentSecret: [
          34, 115, 7, 146, 153, 97, 51, 88, 152, 65, 129, 9, 200, 207, 246, 138,
          50, 115, 248, 5, 24, 230, 43, 53, 141, 54, 67, 43, 226, 94, 33, 15,
        ],
        minFinalCltvExpiryDelta: 144,
      },
    };
    // try {
    //   input = await chosenPath;
    // } catch (err) {
    //   console.log(err, "parsing address error");
    //   return goBackFunction("Unable to parse address");
    // }
    console.log(input, "parsed input");

    if (input.type.toLowerCase() === LIQUID_TYPES.Bolt11.toLowerCase()) {
      try {
        const isMagicRoutingHint = await getLiquidAddressFromSwap(
          input.invoice.bolt11
        );
        if (isMagicRoutingHint) {
          const parsed = await sdk.parse(isMagicRoutingHint);
          input = parsed;
        }
      } catch (err) {
        goBackFunction("Failed to resolve embedded liquid address");
        return;
      }
    }

    let processedPaymentInfo;
    try {
      processedPaymentInfo = await processInputType(input, {
        fiatStats,
        liquidNodeInformation,
        masterInfoObject,
        navigate,
        goBackFunction,
        maxZeroConf,
        comingFromAccept,
        enteredPaymentInfo,
        setPaymentInfo,
        // webViewRef,
        setLoadingMessage,
        paymentInfo,
        fromPage,
        publishMessageFunc,
      });
    } catch (err) {
      return goBackFunction(err.message || "Error processing payment info");
    }

    if (processedPaymentInfo) {
      setPaymentInfo({ ...processedPaymentInfo, decodedInput: input });
    } else {
      return goBackFunction("Unable to process input");
    }
  } catch (err) {
    console.log(err, "Decoding send address erorr");
    goBackFunction(err.message);
    return;
  }
}

async function processInputType(input, context) {
  const { navigate, goBackFunction, setLoadingMessage } = context;
  setLoadingMessage("Getting invoice details");

  switch (input.type.toLowerCase()) {
    case LIQUID_TYPES.BitcoinAddress.toLowerCase():
      return await processBitcoinAddress(input, context);

    case LIQUID_TYPES.Bolt11.toLowerCase():
      return processBolt11Invoice(input, context);

    case LIQUID_TYPES.LnUrlAuth.toLowerCase():
      return await processLNUrlAuth(input, context);

    case LIQUID_TYPES.LnUrlPay.toLowerCase():
      return processLNUrlPay(input, context);

    case LIQUID_TYPES.LnUrlWithdraw.toLowerCase():
      return await processLNUrlWithdraw(input, context);

    case LIQUID_TYPES.LiquidAddress.toLowerCase():
      return processLiquidAddress(input, context);

    // case "bolt12offer":
    //   return processBolt12Offer(input, context);
    default:
      goBackFunction("Not a valid address type");
      return null;
  }
}
