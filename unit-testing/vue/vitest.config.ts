import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["**/*.spec.ts?(x)"],
    environment: "jsdom",
    setupFiles: "./setup.ts",
  },
});
