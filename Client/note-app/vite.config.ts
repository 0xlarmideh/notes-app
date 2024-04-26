import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "/",
  server: {
    proxy: {
      "/api/notes": process.env.VITE_API_URL || "http://localhost:5000",
    },
  },
});
