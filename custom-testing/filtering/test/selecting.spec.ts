/// <reference types="node" />
/// <reference types="mocha" />

/**
 * Mock up test file to illustrate pre-selecting rules in a test, rather than
 * filtering outcomes.
 *
 * This does create problem if trying to share the same chai instance and
 * therefore is not enabled by default.
 */

/*
import { Future } from "@siteimprove/alfa-future";
import { Playwright } from "@siteimprove/alfa-playwright";

import * as chai from "chai";
import * as playwright from "playwright";

import * as alfa from "@siteimprove/alfa-chai";

import rules, { Scope } from "@siteimprove/alfa-rules";

import { persist } from "../../../common/persist";

// Filtering rules to only keep the ones that apply to components
const componentRules = rules.filter((rule) =>
  rule.hasTag((tag) => tag.equals(Scope.Component))
);

// Creating a Chai plugin which only uses component rules.
chai.use(
  alfa.Chai.createPlugin(
    (value: Playwright.Type) => Future.from(Playwright.toPage(value)),
    componentRules,
    [persist(() => "test/outcomes/selecting.spec.json")]
  )
);

const { expect } = chai;

describe("Pre-selecting rules", () => {
  let browser: playwright.Browser;
  let page: playwright.Page;
  let document: playwright.JSHandle;

  before(async () => {
    browser = await playwright.chromium.launch();
    page = await browser.newPage();

    await page.goto(`file://${require.resolve("./fixtures/scope.html")}`);

    document = await page.evaluateHandle(() => window.document);
  });

  after(async () => {
    await browser.close();
  });

  it("should be accessible", async () => {
    await expect(document).to.be.accessible();
  });
});
*/
