/// <reference types="mocha" />

import * as chai from "chai";
import * as puppeteer from "puppeteer";

import { Future } from "@siteimprove/alfa-future";
import { Puppeteer } from "@siteimprove/alfa-puppeteer";

import * as alfa from "@siteimprove/alfa-chai";
import rules from "@siteimprove/alfa-rules";

import { persist } from "../../../common/persist";

chai.use(
  alfa.Chai.createPlugin(
    (value: Puppeteer.Type) => Future.from(Puppeteer.toPage(value)),
    rules,
    [persist(() => "test/outcomes/page.spec.json")]
  )
);

const { expect } = chai;

describe("page.html", () => {
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;
  let document: puppeteer.JSHandle;

  before(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();

    await page.goto(`file://${require.resolve("./fixtures/page.html")}`);

    document = await page.evaluateHandle(() => window.document);
  });

  after(async () => {
    await browser.close();
  });

  it("should be accessible", async () => {
    await expect(document).to.be.accessible();
  });
});
