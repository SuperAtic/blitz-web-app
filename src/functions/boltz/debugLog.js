export default function debugLog(message, data = null) {
  console.log(`🔍 [DEBUG] ${message}`, data || "");
}
