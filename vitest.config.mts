/// <reference types="vitest" />

import { resolve } from "path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
    watch: false,
    environment: "jsdom",
    reporters: ["verbose"],
    setupFiles: ["./vitest-setup.mts"],
  },
});
