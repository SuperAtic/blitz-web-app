export default async function processLNUrlWithdraw(input, context) {
  const {
    nodeInformation,
    masterInfoObject,
    navigate,
    goBackFunction,
    setLoadingMessage,
    sdk,
  } = context;
  setLoadingMessage("Starting LNURL withdrawl");
  try {
    const amountMsat = input.data.minWithdrawable;
    await sdk.lnurlWithdraw({
      data: input.data,
      amountMsat,
      description: "Withdrawl",
    });
  } catch (err) {
    console.log("process lnurl withdrawls error", err);
    goBackFunction(err.message);
  }
}
