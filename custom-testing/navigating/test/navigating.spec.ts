/// <reference types="node" />
/// <reference types="mocha" />

import { Future } from "@siteimprove/alfa-future";
import { Playwright } from "@siteimprove/alfa-playwright";

import * as chai from "chai";
import * as path from "node:path";
import * as url from "node:url";
import * as playwright from "playwright";

import * as alfa from "@siteimprove/alfa-chai";

// Only checking color contrast in this example
import { Rules } from "@siteimprove/alfa-rules";
const R69 = Rules.get("R69").getUnsafe();

// Creating a Chai plugin which only uses R69.
chai.use(
  alfa.Chai.createPlugin(
    (value: Playwright.Type) => Future.from(Playwright.toPage(value)),
    [R69],
    []
  )
);

const { expect } = chai;

// TODO: This should be replaced with import.meta.dirname once we switch to Node 22
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("Navigating between pages", () => {
  let browser: playwright.Browser;
  let page: playwright.Page;
  let document: playwright.JSHandle;

  before(async () => {
    browser = await playwright.chromium.launch();
    page = await browser.newPage();

    await page.goto(
      url.pathToFileURL(path.join(__dirname, "fixtures", "page1.html")).href
    );

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
