/// <reference types="node" />
/// <reference types="mocha" />

import { Future } from "@siteimprove/alfa-future";
import { Playwright } from "@siteimprove/alfa-playwright";

import * as chai from "chai";
import * as playwright from "playwright";

import * as alfa from "@siteimprove/alfa-chai";

// Only checking color contrast in this example
import { Rules } from "@siteimprove/alfa-rules";
const R69 = Rules.get("R69").get();

import { persist } from "../../../common/persist";

// Creating a Chai plugin which only uses component rules.
chai.use(
  alfa.Chai.createPlugin(
    (value: Playwright.Type) => Future.from(Playwright.toPage(value)),
    [R69],
    [persist(() => "test/outcomes/page.spec.json")]
  )
);

const { expect } = chai;

describe("Interacting with a page", () => {
  let browser: playwright.Browser;
  let page: playwright.Page;
  let document: playwright.JSHandle;

  before(async () => {
    browser = await playwright.chromium.launch();
    page = await browser.newPage();

    await page.goto(`file://${require.resolve("./fixtures/page.html")}`);

    document = await page.evaluateHandle(() => window.document);
  });

  after(async () => {
    await browser.close();
  });

  it("should be accessible only in first state", async () => {
    // Checking the initial state
    await expect(document).to.be.accessible();

    // Filling field and clicking button
    const input = page.locator("#input");
    await input.fill("Jean-Yves");

    const button = page.locator("#submit");
    await button.click();

    // Checking the final state
    await expect(document).not.to.be.accessible();
  });
});
