import type { KnipConfig } from "knip";

const entry = ["test/**/*.spec.ts", "test/**/*.spec.tsx"];
const project = ["**/*.ts", "**/*.tsx"];

const config: KnipConfig = {
  workspaces: {
    ".": {
      entry: ["common/*.ts"],
      project: ["common/**/*.ts"],
      ignoreDependencies: ["prettier"],
    },
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
    },
    "unit-testing/*": { entry, project },
    "unit-testing/angular": { entry: ["components/*.ts", "setup.ts"], project },
    "unit-testing/react": { entry: ["components/*.tsx", "setup.ts"], project },
    "unit-testing/vue": { entry: ["components/*.ts", "setup.ts"], project },
    // "packages/alfa-cascade": {
    //   entry,
    //   project,
    //   // For some reason, knip doesn't detect that Bucket is used in the test
    //   // file and needs to be exported for that.
    //   ignore: ["src/ancestor-filter.ts"],
    // },
    // "packages/alfa-device": { entry: [...entry, "src/native.ts!"], project },
    // "packages/alfa-dom": {
    //   entry: [
    //     ...entry,
    //     "src/h.ts!",
    //     "src/jsx.ts!",
    //     "src/jsx-runtime.ts!",
    //     "src/native.ts!",
    //   ],
    //   project,
    // },
    // "packages/alfa-web": { entry: [...entry, "src/native.ts!"], project },
  },
};

export default config;
