import { initializeFirebase } from "../../db/initializeFirebase";
import { getPublicKey, privateKeyFromSeedWords } from "./seed";
export default async function initializeUserSettings(mnemoinc) {
  try {
    let needsToUpdate = false;
    let tempObject = {};

    const privateKey = mnemoinc ? privateKeyFromSeedWords(mnemoinc) : null;
    const publicKey = privateKey ? getPublicKey(privateKey) : null;

    if (!privateKey || !publicKey) throw Error("Failed to retrieve keys");

    await initializeFirebase(publicKey, privateKey);

    console.log(privateKey, mnemoinc, publicKey);
  } catch (err) {
    console.log("initialzie user settings error", err);
  }
}
