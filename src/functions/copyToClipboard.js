export default async function copyToClipboard(data, navigate, location) {
  try {
    await navigator.clipboard.writeText(data);
    // alert("Copied to clipboard!");
    navigate("/error", {
      state: {
        errorMessage: "Copied to clipboard!",
        background: location,
      },
    });
  } catch (err) {
    console.error("Failed to copy: ", err);
    navigate("/error", {
      state: {
        errorMessage: "Error with copy.",
        background: location,
      },
    });
  }
}
