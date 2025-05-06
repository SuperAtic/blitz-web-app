export default function customUUID() {
  try {
    crypto.randomUUID();
    return crypto.randomUUID();
  } catch (err) {
    console.log(err);
    return false;
  }
}
