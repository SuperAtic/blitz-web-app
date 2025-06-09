import Storage from "../localStorage";

export const saveClaimsToStorage = (claims) => {
  Storage.setItem("claims", claims);
};

export const readClaimsFromStorage = () => {
  const claims = Storage.getItem("claims");
  return claims ? claims : {};
};
