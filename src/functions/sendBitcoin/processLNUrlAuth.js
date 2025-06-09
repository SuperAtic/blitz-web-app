export default async function processLNUrlAuth(input, context) {
  const { goBackFunction, navigate, setLoadingMessage, sdk } = context;
  try {
    setLoadingMessage("Starting LNURL auth");
    const result = await sdk.lnurlAuth(input.data);
    if (result.type?.toLowerCase() === "ok") {
      navigate("/wallet");
    } else {
      goBackFunction("Failed to authenticate LNURL");
    }
  } catch (err) {
    console.log(err);
    goBackFunction(err.message);
  }
}
