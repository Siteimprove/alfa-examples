/// <reference types="node" />
/// <reference types="mocha" />

import * as act from "@siteimprove/alfa-act";
import { Color } from "@siteimprove/alfa-css";
import { Element, Text } from "@siteimprove/alfa-dom";
import { Future } from "@siteimprove/alfa-future";
import { Hashable } from "@siteimprove/alfa-hash";
import { None, Some } from "@siteimprove/alfa-option";
import { Playwright } from "@siteimprove/alfa-playwright";
import { Refinement } from "@siteimprove/alfa-refinement";
import rules, { Question } from "@siteimprove/alfa-rules";

import * as chai from "chai";
import * as playwright from "playwright";

import * as alfa from "@siteimprove/alfa-chai";

import { persist } from "common/persist";

const { and } = Refinement;

// Creating a Chai plugin which uses all rules.
chai.use(
  alfa.Chai.createPlugin(
    (value: Playwright.Type) => Future.from(Playwright.toPage(value)),
    rules.filter((rule) => !rule.uri.includes("r111")),
    [persist(() => "test/outcomes/page.spec.json")]
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
  await browser.close();
}

/**
 * Building an Oracle for the question "background-colors" on text within
 * an element with class "hello".
 *
 * The URI of the question is linked to the expected type of answer (here,
 * Iterable<Color>). So passing in the wrong kind of answer result in a type
 * error at build time.
 *
 * Here, the oracle is wrapped in a function that adds a parameter to tweak the
 * answer; this is just to demonstrate what happens when cantTell outcomes
 * resolve to Failed (see the test below).
 *
 * Such a parameter can also be used to inject answers to all questions, see
 * https://github.com/Siteimprove/alfa/blob/main/packages/alfa-rules/test/common/oracle.ts
 * for a more complete Oracle building (although it does only check the URI
 * of the question (not its subject), and therefore isn't well suited on larger
 * tests where the same question might be asked with different subjects).
 */
function oracle<I, T extends Hashable, S>(
  color: "blue" | "white" = "white"
): act.Oracle<I, T, Question.Metadata, S> {
  return (rule, question) => {
    // Checking the question URI to know what to answer
    if (question.uri === "background-colors") {
      if (
        // Checking the subject of the question, so that the answer may depend on it.
        // In that case, the background colour is known for elements with a class
        // of "hello" (and their text node children).
        Text.isText(question.subject) &&
        question.subject
          .parent()
          .some(
            and(Element.isElement, (element) =>
              element.classes.includes("hello")
            )
          )
      ) {
        // The result needs to be wrapped in all the layers needed by the
        // interviews…
        // * calling `Some.of` leaves the possibility to not answer the question
        //   by returning `None` instead;
        // * calling `Future.now` is needed because the interview process is
        //   asynchronous (e.g. it can be done "live" in a command line),
        //   therefore the Oracle itself needs to be asynchronous.
        return Future.now(Some.of([Color.named(color).resolve()]));
      }
    }

    // Leave any other question unanswered.
    return Future.now(None);
  };
}

/**
 * fixtures/page.html has a cantTell outcome on colour contrast rules. An
 * oracle needs to be built and passed to the test in order to fully audit the
 * page.
 */
describe("page.html", () => {
  beforeEach(setup);
  afterEach(teardown);

  // By default, only Failed outcomes are considered
  it("should not have any Failed outcome", async () => {
    const document = await load("page.html");
    await expect(document).to.be.accessible();
  });

  // Keeping the cantTell outcomes will fail the test
  it("should have some cantTell outcome", async () => {
    const document = await load("page.html");
    await expect(document).not.to.be.accessible({
      // Keep every cantTell outcome
      filterCantTell: () => true,
    });
  });

  // Answering the question gets rid of the cantTell outcome
  it("should be accessible on white background", async () => {
    const document = await load("page.html");
    await expect(document).to.be.accessible({
      oracle: oracle(),
      // Keep every cantTell outcome
      filterCantTell: () => true,
    });
  });

  it("should not be accessible on blue background", async () => {
    const document = await load("page.html");
    await expect(document).not.to.be.accessible({
      oracle: oracle("blue"),
    });
  });
});
