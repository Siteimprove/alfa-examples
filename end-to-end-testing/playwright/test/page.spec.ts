/// <reference types="node" />
/// <reference types="mocha" />

import * as path from "node:path";
import * as url from "node:url";

import * as chai from "chai";
import * as playwright from "playwright";

import { Future } from "@siteimprove/alfa-future";
import { Playwright } from "@siteimprove/alfa-playwright";

import * as alfa from "@siteimprove/alfa-chai";
import rules from "@siteimprove/alfa-rules";

import { persist } from "common/persist";

// TODO: This should be replaced with import.meta.dirname once we switch to Node 22
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

chai.use(
  alfa.Chai.createPlugin(
    (value: Playwright.Type) => Future.from(Playwright.toPage(value)),
    rules.default.filter((rule) => !rule.uri.includes("r111")),
    [persist(() => "test/outcomes/page.spec.json")]
  )
);

const { expect } = chai;

describe("page.html", () => {
  let browser: playwright.Browser;
  let page: playwright.Page;
  let document: playwright.JSHandle;

  before(async () => {
    browser = await playwright.chromium.launch();
    page = await browser.newPage();

    await page.goto(
      url.pathToFileURL(
        path.join(__dirname, "..", "..", "fixtures", "page.html")
      ).href
    );

    document = await page.evaluateHandle(() => window.document);
  });

  after(async () => {
    await browser.close();
  });

  it("should be accessible", async () => {
    await expect(document).to.be.accessible();
  });
});
