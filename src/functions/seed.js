import * as secp from "@noble/secp256k1";
import { HDKey } from "@scure/bip32";
import { mnemonicToSeedSync } from "@scure/bip39";

// === Key derivation ===
export function privateKeyFromSeedWords(mnemonic, passphrase) {
  let root = HDKey.fromMasterSeed(mnemonicToSeedSync(mnemonic, passphrase));
  let privateKey = root.derive(`m/44'/1237'/0'/0/0`).privateKey;
  if (!privateKey) throw new Error("could not derive private key");
  return secp.etc.bytesToHex(privateKey);
}

export function getPublicKey(privateKey) {
  const pubkeyBytes = secp.getPublicKey(privateKey, true); // compressed
  console.log(secp.etc.bytesToHex(pubkeyBytes));
  return secp.etc.bytesToHex(pubkeyBytes).slice(2);
}
