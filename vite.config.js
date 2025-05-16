import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {},
    // "navigator.product": JSON.stringify("Web"), // pretend we're not in React Native
  },
  resolve: {
    alias: {
      "react-native": path.resolve(__dirname, "empty-react-native.js"),
    },
  },
});
