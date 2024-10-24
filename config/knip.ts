import type { KnipConfig } from "knip";

const entry = ["test/**/*.spec.ts", "test/**/*.spec.tsx"];
const project = ["**/*.ts", "**/*.tsx"];

const config: KnipConfig = {
  ignoreDependencies: ["prettier"],
  workspaces: {
    "accessibility-code-checker/*": { entry, project },
    "accessibility-code-checker/demo-page": { entry: "src/main.tsx", project },
    common: { entry: "persist.ts", project },
    "custom-testing/*": { entry, project },
    "custom-testing/crawling": { entry: ["crawling.ts"], project },
    "custom-testing/measuring-performances": {
      entry: ["performance.ts"],
      project,
    },
    "custom-testing/scraping": { entry: ["scraping.ts"], project },
    "end-to-end-testing/*": { entry, project },
    "end-to-end-testing/cypress": {
      cypress: {
        config: "cypress.json",
        entry: [...entry, "support.ts"],
        project,
      },
    },
    "end-to-end-testing/webdriver": {
      "webdriver-io": { config: ["wdio.conf.ts"], entry, project },
      ignoreDependencies: [
        // imported through the config file
        "chromedriver",
      ],
    },
    "unit-testing/*": { entry, project },
    "unit-testing/angular": { entry: ["components/*.ts", "setup.ts"], project },
    "unit-testing/react": { entry: ["components/*.tsx", "setup.ts"], project },
    "unit-testing/vue": {
      entry: ["components/*.ts", "jsdom-environment.ts", "setup.ts"],
      project,
    },
  },
};

export default config;
