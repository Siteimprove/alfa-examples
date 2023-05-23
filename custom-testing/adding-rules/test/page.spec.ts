/// <reference types="node" />
/// <reference types="mocha" />

import { Diagnostic, Rule } from "@siteimprove/alfa-act";
import { Element, Node } from "@siteimprove/alfa-dom";
import { Refinement } from "@siteimprove/alfa-refinement";
import { Err, Ok } from "@siteimprove/alfa-result";
import { Page } from "@siteimprove/alfa-web";

import { Future } from "@siteimprove/alfa-future";
import { Playwright } from "@siteimprove/alfa-playwright";

import * as chai from "chai";
import * as playwright from "playwright";

import * as alfa from "@siteimprove/alfa-chai";

import rules from "@siteimprove/alfa-rules";

import { persist } from "../../../common/persist";

const { and } = Refinement;

/**
 * Creating a rule with:
 * * Applicability: any <img> element;
 * * Expectation: the target does not specify both `alt` and `aria-label` attributes
 */
const myRule = Rule.Atomic.of<Page, Element>({
  uri: "custom:no-alt-and-aria-label",
  evaluate({ document }) {
    return {
      applicability() {
        return document
          .descendants(Node.fullTree)
          .filter(and(Element.isElement, Element.hasName("img")));
      },

      expectations(target) {
        const alt = target.attribute("alt");
        const ariaLabel = target.attribute("aria-label");

        if (alt.isSome() && ariaLabel.isSome()) {
          return {
            1: Err.of(
              Diagnostic.of("The image has both an `alt` and an `aria-label`")
            ),
          };
        } else
          return {
            1: Ok.of(
              Diagnostic.of(
                "The image does not have both an `alt` and an `aria-label`"
              )
            ),
          };
      },
    };
  },
});

// adding myRule to the default ruleset
const allRules = rules.append(myRule);

// Creating a Chai plugin which runs all rules (default and custom).
chai.use(
  alfa.Chai.createPlugin(
    (value: Playwright.Type) => Future.from(Playwright.toPage(value)),
    allRules,
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

  // due to the custom new rule, the page fails the check.
  it("should not be accessible", async () => {
    await expect(document).not.to.be.accessible();
  });
});
