import * as alfa from "@siteimprove/alfa-chai";
import { Future } from "@siteimprove/alfa-future";
import rules from "@siteimprove/alfa-rules";
import { WebElement } from "@siteimprove/alfa-webdriver";

import * as chai from "chai";
import { persist } from "common/persist";

export const config: WebdriverIO.Config = {
  runner: "local",
  tsConfigPath: "./tsconfig.json",
  specs: ["./test/*.ts"],
  capabilities: [
    {
      browserName: "chrome",
      "goog:chromeOptions": {
        args: [
          "headless",
          "disable-gpu",
          "--no-sandbox",
          "--disable-dev-shm-usage",
        ],
      },
    },
  ],
  logLevel: "info",
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: "mocha",
  reporters: ["spec"],
  mochaOpts: { ui: "bdd", timeout: 60000 },
  before: function () {
    chai.use(
      alfa.Chai.createPlugin(
        (value: WebElement.Type) =>
          Future.from(WebElement.toPage(value, browser)),
        rules.filter((rule) => !rule.uri.includes("r111")),
        [persist(() => "test/outcomes/page.spec.json")],
      ),
    );
  },
};
