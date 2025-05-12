import {
  brodcastTokenAnnouncement,
  fundL1TokenAddress,
  getTokenPublicKey,
  mintSparkToken,
  sendSparkToken,
  sparkTokenWallet,
} from "../../functions/sparkAssets";

export default function AssetsHome() {
  return (
    <div className="assetsHome">
      <button
        onClick={async () => {
          const address = await fundL1TokenAddress();
          console.log(address);
        }}
      >
        Fund
      </button>
      <button
        onClick={async () => {
          console.log(!Number.isSafeInteger(6));
          const annoucementTx = await brodcastTokenAnnouncement({
            tokenName: "Btest",
            tokenTicker: "BTEST",
            decimals: 5,
            maxSupply: BigInt(100_000_000),
            isFreezable: false,
          });
          console.log(annoucementTx);
        }}
      >
        Create Token
      </button>
      <button
        onClick={async () => {
          const annoucementTx = await mintSparkToken(100_000);
          console.log(annoucementTx);
        }}
      >
        Mint
      </button>
      <button
        onClick={async () => {
          const pubKey = await getTokenPublicKey();
          const transactionId = await sendSparkToken({
            tokenPublicKey: pubKey,
            tokenAmount: BigInt(10_000),
            receiverSparkAddress:
              "sp1pgssyys32u2ygsl29k2025nk3zkmqc4egnk7c4xzraheg0w86hxleklz6hxww3",
          });

          console.log("Spark Transaction ID:", transactionId);
        }}
      >
        Send Token
      </button>
      <p>Asssets</p>
    </div>
  );
}
