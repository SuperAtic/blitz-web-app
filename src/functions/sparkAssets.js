import { IssuerSparkWallet } from "@buildonspark/issuer-sdk";
export let sparkTokenWallet = null;

export const initializeSparTokenkWallet = async (mnemonic) => {
  try {
    const { wallet: w } = await IssuerSparkWallet.initialize({
      mnemonicOrSeed: mnemonic,
      options: {
        network: "MAINNET",
      },
    });
    sparkTokenWallet = w;

    console.log("Wallet initialized:");
    return { isConnected: true };
  } catch (err) {
    console.log("Initialize spark wallet error", err);
    return { isConnected: false }; //make sure to switch back to false
  }
};

export const fundL1TokenAddress = async () => {
  try {
    if (!sparkTokenWallet) throw new Error("sparkTokenWallet not initialized");
    const l1Address = await sparkTokenWallet.getTokenL1Address();
    return l1Address;
  } catch (err) {
    console.log("fund l1 token address error", err);
  }
};

export const brodcastTokenAnnouncement = async ({
  tokenName,
  tokenTicker,
  decimals,
  maxSupply,
  isFreezable = false,
}) => {
  try {
    if (!sparkTokenWallet) throw new Error("sparkTokenWallet not initialized");
    console.log({
      tokenName,
      tokenTicker,
      decimals,
      maxSupply,
      isFreezable,
    });
    console.log("Type of decimals:", typeof decimals); // Should be "number"
    console.log("Is safe integer:", Number.isSafeInteger(decimals)); // Should be true

    const announcementTx = await sparkTokenWallet.announceTokenL1({
      tokenName,
      tokenTicker,
      decimals: Number(decimals),
      maxSupply,
      isFreezable,
    });
    console.log("Announcement TX:", announcementTx);
    return announcementTx;
  } catch (err) {
    console.log("Braodcast token announcement tx error", err);
  }
};

export const mintSparkToken = async (tokenNumber) => {
  try {
    if (!sparkTokenWallet) throw new Error("sparkTokenWallet not initialized");

    const transactionId = await sparkTokenWallet.mintTokens(tokenNumber);
    console.log("Announcement TX:", transactionId);
    return transactionId;
  } catch (err) {
    console.log("mint spark token error", err);
  }
};
export const getTokenPublicKey = async () => {
  try {
    if (!sparkTokenWallet) throw new Error("sparkTokenWallet not initialized");

    const tokenPublicKey = await sparkTokenWallet.getIdentityPublicKey();
    console.log("Token pubkey:", tokenPublicKey);
    return tokenPublicKey;
  } catch (err) {
    console.log("get token pub key error", err);
  }
};
export const sendSparkToken = async ({
  tokenPublicKey,
  tokenAmount,
  receiverSparkAddress,
}) => {
  try {
    if (!sparkTokenWallet) throw new Error("sparkTokenWallet not initialized");

    const transactionId = await sparkTokenWallet.transferTokens({
      tokenPublicKey,
      tokenAmount,
      receiverSparkAddress,
    });

    console.log("Spark Transaction ID:", transactionId);
    return transactionId;
  } catch (err) {
    console.log("get token pub key error", err);
  }
};
export const burnSparkTokens = async (amountToBurn) => {
  try {
    if (!sparkTokenWallet) throw new Error("sparkTokenWallet not initialized");

    const transactionId = await sparkTokenWallet.burnTokens(amountToBurn);

    console.log("Spark Transaction ID:", transactionId);
    return transactionId;
  } catch (err) {
    console.log("burn token error", err);
  }
};
export const getSparkTokenBalance = async () => {
  try {
    if (!sparkTokenWallet) throw new Error("sparkTokenWallet not initialized");

    const balance = await sparkTokenWallet.getBalance();
    console.log("token balance", balance);
    return balance.tokenBalance;
  } catch (err) {
    console.log("burn token error", err);
  }
};
