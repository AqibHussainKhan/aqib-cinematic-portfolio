
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/aqib-cinematic-portfolio/",
  build: { emptyOutDir: true },
  plugins: [react(), tailwindcss()],
});
