/// <reference types="mocha" />

import * as chai from "chai";
import * as path from "node:path";
import * as url from "node:url";
import puppeteer from "puppeteer";

import { Future } from "@siteimprove/alfa-future";
import { Puppeteer } from "@siteimprove/alfa-puppeteer";

import * as alfa from "@siteimprove/alfa-chai";
import rules from "@siteimprove/alfa-rules";

import { persist } from "common/persist";

chai.use(
  alfa.Chai.createPlugin(
    (value: Puppeteer.Type) => Future.from(Puppeteer.toPage(value)),
    rules.filter((rule) => !rule.uri.includes("r111")),
    [persist(() => "test/outcomes/page.spec.json")]
  )
);

const { expect } = chai;

// TODO: This should be replaced with import.meta.dirname once we switch to Node 22
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("page.html", () => {
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;
  let document: puppeteer.JSHandle;

  before(async () => {
    browser = await puppeteer.launch();
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
