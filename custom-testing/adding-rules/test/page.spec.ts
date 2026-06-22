import { Diagnostic, Rule } from "@siteimprove/alfa-act";
import { Element, Node } from "@siteimprove/alfa-dom";
import { Refinement } from "@siteimprove/alfa-refinement";
import { Err, Ok } from "@siteimprove/alfa-result";
import { Page } from "@siteimprove/alfa-web";

import { Playwright } from "@siteimprove/alfa-playwright";

import { afterEach, beforeEach, describe, expect, it } from "vitest";
import * as path from "node:path";
import * as url from "node:url";
import * as playwright from "playwright";

import * as alfa from "@siteimprove/alfa-vitest";

import rules from "@siteimprove/alfa-rules";

import { persist } from "common/persist";

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
              Diagnostic.of("The image has both an `alt` and an `aria-label`"),
            ),
          };
        } else
          return {
            1: Ok.of(
              Diagnostic.of(
                "The image does not have both an `alt` and an `aria-label`",
              ),
            ),
          };
      },
    };
  },
});

// adding myRule to the default ruleset
const allRules = rules.append(myRule);

// Creating a Vitest plugin which runs all rules (default and custom).
alfa.Vitest.createPlugin(Playwright.toPage, allRules, [
  persist(() => "test/outcomes/page.spec.json"),
]);

const __dirname = import.meta.dirname;

let browser: playwright.Browser;
let page: playwright.Page;
let document: playwright.JSHandle;

async function setup(): Promise<void> {
  browser = await playwright.chromium.launch();
  page = await browser.newPage();

  await page.goto(
    url.pathToFileURL(path.join(__dirname, "fixtures", "page.html")).href,
  );

  document = await page.evaluateHandle(() => window.document);
}

async function teardown(): Promise<void> {
  await browser.close();
}

describe("page.html", () => {
  beforeEach(setup, 60_000);
  afterEach(teardown);

  // due to the custom new rule, the page fails the check.
  it("should not be accessible", async () => {
    await expect(document).not.toBeAccessible();
  });
});
