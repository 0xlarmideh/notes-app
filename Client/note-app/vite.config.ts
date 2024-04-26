import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { API_URL } from "./config.js";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "/",
  server: {
    proxy: {
      "/api/notes": "http://localhost:5000",
    },
  },
});
