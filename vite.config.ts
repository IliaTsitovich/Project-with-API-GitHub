/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Project-with-API-GitHub/",
  plugins: [react(), svgr({ include: "**/*.svg?react" })],
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
});
