import { getBoltzApiUrl } from "./boltzEndpoitns";

export const getSwapStatus = async (id) => {
  const response = await fetch(
    `${getBoltzApiUrl(import.meta.env.VITE_BOLTZ_ENVIRONMENT)}/v2/swap/${id}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );

  return response.json();
};
