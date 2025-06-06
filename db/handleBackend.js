import { httpsCallable } from "firebase/functions";

import { functions } from "./initializeFirebase";
import {
  decryptMessage,
  encryptMessage,
} from "../src/functions/encodingAndDecoding";

export default async function fetchBackend(
  method,
  data,
  privateKey,
  publicKey
) {
  try {
    const message = await encodeRequest(privateKey, data);

    if (!message) throw new Error("Unable to encode request");
    const responseData = {
      em: message,
      publicKey,
    };
    console.log("function call data", responseData);

    const response = await httpsCallable(functions, method)(responseData);

    console.log(response);
    const dm = await decodeRequest(privateKey, response.data);
    console.log("decoded response", dm);

    return dm;
  } catch (err) {
    console.log("backend fetch wrapper error", err);
    return false;
  }
}
async function encodeRequest(privateKey, data) {
  try {
    const encription = await encryptMessage(
      privateKey,
      import.meta.env.VITE_BACKEND_PUB_KEY,
      JSON.stringify(data)
    );

    return encription;
  } catch (err) {
    console.log("backend fetch wrapper error", err);
    return false;
  }
}
async function decodeRequest(privateKey, data) {
  try {
    const message = await decryptMessage(
      privateKey,
      import.meta.env.VITE_BACKEND_PUB_KEY,
      data
    );
    const parsedMessage = JSON.parse(message);

    return parsedMessage;
  } catch (err) {
    console.log("backend fetch wrapper error", err);
    return false;
  }
}
