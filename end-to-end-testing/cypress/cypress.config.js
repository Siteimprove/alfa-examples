import { defineConfig } from "cypress";

export default defineConfig({
  fixturesFolder: "fixtures",
  screenshotsFolder: "screenshots",
  videosFolder: "videos",

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile: "support.js",
    specPattern: "test/**.spec.js",
  },
});
