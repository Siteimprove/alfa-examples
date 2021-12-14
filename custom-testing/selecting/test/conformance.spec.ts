/// <reference types="node" />
/// <reference types="mocha" />

import { Future } from "@siteimprove/alfa-future";
import { Iterable } from "@siteimprove/alfa-iterable";
import { Playwright } from "@siteimprove/alfa-playwright";
import { Refinement } from "@siteimprove/alfa-refinement";
import { Conformance, Criterion, Technique } from "@siteimprove/alfa-wcag";

import * as chai from "chai";
import * as playwright from "playwright";

import * as alfa from "@siteimprove/alfa-chai";

const { and } = Refinement;

import rules from "@siteimprove/alfa-rules";

import { persist } from "../../../common/persist";

// Filtering rules to only keep the A and AA ones (EAA and WAD requirement)
const AArules = rules.filter((rule) =>
  rule.hasRequirement(and(Criterion.isCriterion, Conformance.isAA()))
);

/**
 * Other possibilities to filter rules by their requirements
 */
// Filtering rules to only keep the WCAG 2.0 ones
const rules20 = rules.filter((rule) =>
  rule.hasRequirement(
    and(Criterion.isCriterion, (criterion) =>
      Iterable.some(criterion.versions, (version) => version === "2.0")
    )
  )
);

// Filtering rules to only keep the WCAG 2.0 AA ones (ADA requirement)
const AArules20 = rules.filter((rule) =>
  rule.hasRequirement(and(Criterion.isCriterion, Conformance.isAA("2.0")))
);

// Filtering rules to only keep those that match a WCAG technique
const techniqueRules = rules.filter((rule) =>
  rule.hasRequirement(Technique.isTechnique)
);

// Creating a Chai plugin which only uses A/AA rules.
chai.use(
  alfa.Chai.createPlugin(
    (value: Playwright.Type) => Future.from(Playwright.toPage(value)),
    AArules,
    [persist(() => "test/outcomes/conformance.spec.json")]
  )
);

const { expect } = chai;

describe("conformance.html", () => {
  let browser: playwright.Browser;
  let page: playwright.Page;
  let document: playwright.JSHandle;

  before(async () => {
    browser = await playwright.chromium.launch();
    page = await browser.newPage();

    await page.goto(`file://${require.resolve("./fixtures/conformance.html")}`);

    document = await page.evaluateHandle(() => window.document);
  });

  after(async () => {
    await browser.close();
  });

  it("should be accessible", async () => {
    await expect(document).to.be.accessible();
  });
});
