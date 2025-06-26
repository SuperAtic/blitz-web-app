const r = async () => {
  try {
    return await navigator.clipboard.readText();
  } catch {
  }
};
export {
  r as g
};
