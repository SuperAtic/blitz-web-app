import { getBoltzApiUrl } from "./boltzEndpoitns";

export default async function getBoltzFeeRates() {
  try {
    const response = await fetch(
      `${getBoltzApiUrl(import.meta.env.VITE_BOLTZ_ENVIRONMENT)}/v2/chain/fees`
    );
    const data = await response.json();

    return data["L-BTC"];
  } catch (err) {
    return false;
    console.log(err);
  }
}
