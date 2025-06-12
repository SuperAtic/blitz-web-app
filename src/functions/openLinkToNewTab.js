export default function openLinkToNewTab(url, target = "_blank") {
  try {
    window.open(url, target);
  } catch (err) {
    console.log("Error opening link to new tab", err);
  }
}
