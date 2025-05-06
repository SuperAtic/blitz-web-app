export default async function copyToClipboard(data) {}
{
  try {
    await navigator.clipboard.writeText(data.join(" "));
    alert("Copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
}
