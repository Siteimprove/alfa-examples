import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: [
      // Accessibility Code Checkers is not tested here since its tests are
      // intentionally failing.
      "custom-testing/test/**/*.spec.ts?(x)",
      "end-to-end-testing/test/**/*.spec.ts?(x)",
      "unit-testing/test/**/*.spec.ts?(x)",
    ],
    exclude: [
      // TODO
      "custom-testing/adding-rules",
      "custom-testing/answering",
      "custom-testing/crawling",
      "custom-testing/filtering",
      "custom-testing/interacting",
      "custom-testing/measuring-performances",
      "custom-testing/navigating",
      "custom-testing/scraping",
      "end-to-end-testing/cypress",
      "end-to-end-testing/fixtures",
      "end-to-end-testing/playwright",
      "end-to-end-testing/puppeteer",
      "end-to-end-testing/webdriver",
      "unit-testing/angular",
      "unit-testing/react",
      "unit-testing/vue",
    ],
    // Several tests, notably the ones that spawn a new browser instance, tend
    // to take a lot of time… Especially when launching all tests simultaneously.
    testTimeout: 60_000 /* ms */,
  },
});
