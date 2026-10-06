import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Two static pages: the game at "/" and the designer at "/designer/".
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        designer: resolve(__dirname, "designer/index.html"),
      },
    },
  },
});
