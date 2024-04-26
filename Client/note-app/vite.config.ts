import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "/",
  server: {
    proxy: {
      "/api/notes":
        "https://notes-app-zc9a.onrender.com" || "http://localhost:5000",
    },
  },
});
