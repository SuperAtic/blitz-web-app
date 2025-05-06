import CryptoJS from "crypto-js";

const encrypt = (mnemonic, password) => {
  return CryptoJS.AES.encrypt(mnemonic, password).toString();
};

const decrypt = (cipherText, password) => {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, password);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (err) {
    console.log("decrypto error", err);
  }
};

export { encrypt, decrypt };
