/// <reference types="node" />
/// <reference types="mocha" />

import { Refinement } from "@siteimprove/alfa-refinement";
import { Conformance, Criterion } from "@siteimprove/alfa-wcag";
import * as chai from "chai";
import * as playwright from "playwright";

import { Future } from "@siteimprove/alfa-future";
import { Playwright } from "@siteimprove/alfa-playwright";

import * as alfa from "@siteimprove/alfa-chai";

const { and } = Refinement;

import rules from "@siteimprove/alfa-rules";

import { persist } from "../../../common/persist";

// Filtering rules to only keep the A and AA ones
const AArules = rules.filter((rule) =>
  rule.requirements.some(and(Criterion.isCriterion, Conformance.isAA()))
);

// Creating a Chai plugin which only uses A/AA rules.
chai.use(
  alfa.Chai.createPlugin(
    (value: Playwright.Type) => Future.from(Playwright.toPage(value)),
    AArules,
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
