export default function hasAlredyPaidInvoice({
  scannedAddress,
  sparkInformation,
}) {
  try {
    return !!sparkInformation.transactions.find((tx) => {
      const details = JSON.parse(tx.details);
      return (
        tx.paymentType === "lightning" && details.address == scannedAddress
      );
    });
  } catch (err) {
    console.log("already paid invoice error", err);

    return false;
  }
}
