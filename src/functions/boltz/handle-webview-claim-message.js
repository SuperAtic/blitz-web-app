import { getBoltzApiUrl } from "./boltzEndpoitns";
import Storage from "../localStorage";

export default function handleWebviewClaimMessage(
  // navigate,
  event
  // receiveingPage,
  // confirmFunction,
  // saveBotlzSwapIdFunction,
) {
  console.log(event.nativeEvent.data, "Webview claim message");
  (async () => {
    const data = JSON.parse(event.nativeEvent.data);
    try {
      if (data.error) throw Error(data.error);

      console.log(data, "WEBVIEW DATA");

      if (typeof data === "object" && data?.tx) {
        let didPost = false;
        let numberOfTries = 0;
        while (!didPost && numberOfTries < 5) {
          console.log("RUNNING BOLTZ POST");
          numberOfTries += 1;
          try {
            const fetchRequse = await fetch(
              `${getBoltzApiUrl(
                import.meta.env.VITE_BOLTZ_ENVIRONMENT
              )}/v2/chain/L-BTC/transaction`,
              {
                method: "POST",
                headers: {
                  accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  hex: data.tx,
                }),
              }
            );

            const response = await fetchRequse.json();

            if (response?.id) {
              didPost = true;
            } else await new Promise((resolve) => setTimeout(resolve, 5000));
          } catch (err) {
            console.log(err);
            // if (receiveingPage === 'loadingScreen') {
            //   confirmFunction(1);
            // }
          }
        }

        let savedClaimInfo = Storage.getItem("savedReverseSwapInfo") || [];
        let claimTxs = Storage.getItem("boltzClaimTxs") || [];

        savedClaimInfo = savedClaimInfo.filter(
          (claim) => claim?.swapInfo?.id !== data.id
        );

        Storage.setItem("savedReverseSwapInfo", savedClaimInfo);

        if (didPost) return;

        claimTxs.push([data.tx, new Date()]);

        Storage.setItem("boltzClaimTxs", claimTxs);
      }
    } catch (err) {
      console.log(err, "Webview claim error");
    }
  })();
}
