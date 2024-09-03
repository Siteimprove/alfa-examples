/// <reference types="node" />
/// <reference types="mocha" />

import { Outcome } from "@siteimprove/alfa-act";
import { Future } from "@siteimprove/alfa-future";
import { Hashable } from "@siteimprove/alfa-hash";
import { Iterable } from "@siteimprove/alfa-iterable";
import { Playwright } from "@siteimprove/alfa-playwright";
import { Refinement } from "@siteimprove/alfa-refinement";
import { Conformance, Criterion, Technique } from "@siteimprove/alfa-wcag";

import * as chai from "chai";
import * as playwright from "playwright";

import * as alfa from "@siteimprove/alfa-chai";

import rules, { Scope } from "@siteimprove/alfa-rules";

import { persist } from "common/persist";

const { and } = Refinement;

// Creating a Chai plugin which uses all rules.
chai.use(
  alfa.Chai.createPlugin(
    (value: Playwright.Type) => Future.from(Playwright.toPage(value)),
    rules.filter((rule) => !rule.uri.includes("r111")),
    [persist(() => "test/outcomes/filtering.spec.json")]
  )
);

const { expect } = chai;

// Test setup
let browser: playwright.Browser;
let page: playwright.Page;

async function load(file: string): Promise<playwright.JSHandle> {
  const path = `./fixtures/${file}`;
  await page.goto(`file://${require.resolve(path)}`);

  return page.evaluateHandle(() => window.document);
}

async function setup(): Promise<void> {
  browser = await playwright.chromium.launch();
  page = await browser.newPage();
}

async function teardown(): Promise<void> {
  browser.close();
}

/**
 * fixtures/page.html is fully accessible
 */
describe("page.html", () => {
  before(setup);
  after(teardown);

  it("should be fully accessible", async () => {
    const document = await load("page.html");
    await expect(document).to.be.accessible();
  });
});

/**
 * fixtures/conformance.html is only AA accessible
 */
describe("conformance.html", () => {
  beforeEach(setup);
  afterEach(teardown);

  // When keeping all outcomes, the test fails.
  it("should not be fully accessible", async () => {
    const document = await load("conformance.html");
    await expect(document).not.to.be.accessible();
  });

  // When filtering to only keep outcomes mapping to AA requirements (include
  // A and AA Success Criteria), the test pass.

  // Level AA conformance is EAA and WAD requirement
  function aaFilter<T extends Hashable>(outcome: Outcome<unknown, T>): boolean {
    return outcome.rule.hasRequirement(
      and(Criterion.isCriterion, Conformance.isAA())
    );
  }

  it("should be AA accessible", async () => {
    const document = await load("conformance.html");
    await expect(document).to.be.accessible({
      filter: aaFilter,
    });
  });

  // Other examples of filters, based on conformance:
  // Only keep the outcomes failing a WCAG 2.0 Success Criterion.
  function wcag20Filter<T extends Hashable>(
    outcome: Outcome<unknown, T>
  ): boolean {
    return outcome.rule.hasRequirement(
      and(Criterion.isCriterion, (criterion) =>
        Iterable.some(criterion.versions, (version) => version === "2.0")
      )
    );
  }

  // Only keep the outcomes failing a WCAG 2.0 AA Success Criterion (ADA requirement)
  function wcag20aaFilter<T extends Hashable>(
    outcome: Outcome<unknown, T>
  ): boolean {
    return outcome.rule.hasRequirement(
      and(Criterion.isCriterion, Conformance.isAA("2.0"))
    );
  }

  // Only keep the outcomes failing a WCAG technique
  function techniquesFilter<T extends Hashable>(
    outcome: Outcome<unknown, T>
  ): boolean {
    return outcome.rule.hasRequirement(Technique.isTechnique);
  }
});

/**
 * fixtures/scope.html contains a single component and fails rules that only
 * make sense in the context of a full page (e.g. skip link, …)
 */
describe("scope.html", () => {
  beforeEach(setup);
  afterEach(teardown);

  // When keeping all outcomes, the test fails.
  it("should not be an accessible page", async () => {
    const document = await load("scope.html");
    await expect(document).not.to.be.accessible();
  });

  // When filtering to only keep outcomes about components, the test passes.
  function componentFilter<T extends Hashable>(
    outcome: Outcome<unknown, T>
  ): boolean {
    return outcome.rule.hasTag((tag) => tag.equals(Scope.Component));
  }

  it("should be an accessible component", async () => {
    const document = await load("scope.html");
    await expect(document).to.be.accessible({
      filter: componentFilter,
    });
  });
});
