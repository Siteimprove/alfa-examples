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

// Creating a Chai plugin which only uses R69.
chai.use(
  alfa.Chai.createPlugin(
    (value: Playwright.Type) => Future.from(Playwright.toPage(value)),
    [R69],
    []
  )
);

const { expect } = chai;

describe("Navigating between pages", () => {
  let browser: playwright.Browser;
  let page: playwright.Page;
  let document: playwright.JSHandle;

  before(async () => {
    browser = await playwright.chromium.launch();
    page = await browser.newPage();

    await page.goto(`file://${require.resolve("./fixtures/page1.html")}`);

    document = await page.evaluateHandle(() => window.document);
  });

  after(async () => {
    await browser.close();
  });

  it("only the first page should be accessible", async () => {
    // Checking the first page
    await expect(document).to.be.accessible();

    // Clicking link
    const link = page.locator("#next");
    await link.click();

    // Checking the second page
    document = await page.evaluateHandle(() => window.document);
    await expect(document).not.to.be.accessible();
  });
});
