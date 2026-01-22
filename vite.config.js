import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Todo-App-/", // 👈 REQUIRED for GitHub Pages
});
