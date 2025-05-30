"use strict";
import { HDKey } from "@scure/bip32";
import {
  entropyToMnemonic,
  generateMnemonic,
  mnemonicToSeedSync,
} from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english";
import { getPublicKey, getSharedSecret } from "@noble/secp256k1";
import { bytesToHex, hexToBytes } from "@noble/hashes/utils";

function generateBitcoinKeyPair() {
  const mnemoinc = generateMnemonic(wordlist);
  const seed = mnemonicToSeedSync(mnemoinc);

  const root = HDKey.fromMasterSeed(seed);

  const child = root.derive("m/44'/0'/0'/0/0");
  const privateKey = child.privateKey;

  const publicKey = getPublicKey(privateKey, true);

  return {
    privateKey: bytesToHex(privateKey),
    publicKey: bytesToHex(publicKey),
  };
}

function getSharedKey(userPrivKey, backendPubKey) {
  const sharedSecret = getSharedSecret(
    hexToBytes(userPrivKey),
    hexToBytes(backendPubKey),
    true
  );

  const mnemonic = entropyToMnemonic(sharedSecret.slice(0, 32), wordlist);

  return mnemonic;
}

export { generateBitcoinKeyPair, getSharedKey };
