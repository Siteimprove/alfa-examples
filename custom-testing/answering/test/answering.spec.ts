/// <reference types="node" />
/// <reference types="mocha" />

import * as act from "@siteimprove/alfa-act";
import { Color, RGB } from "@siteimprove/alfa-css";
import { Element, Text } from "@siteimprove/alfa-dom";
import { Future } from "@siteimprove/alfa-future";
import { None, Some } from "@siteimprove/alfa-option";
import { Playwright } from "@siteimprove/alfa-playwright";
import { Refinement } from "@siteimprove/alfa-refinement";
import rules, { Question, Scope } from "@siteimprove/alfa-rules";
import { Resolver } from "@siteimprove/alfa-style";

import * as chai from "chai";
import * as playwright from "playwright";

import * as alfa from "@siteimprove/alfa-chai";

import { persist } from "../../../common/persist";

const { and } = Refinement;

// Creating a Chai plugin which uses all rules.
chai.use(
  alfa.Chai.createPlugin(
    (value: Playwright.Type) => Future.from(Playwright.toPage(value)),
    rules,
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
  browser.close();
}

/**
 * Building an Oracle for the question "first-tabbable-reference-is-main" on
 * an element with id "main"
 *
 * The questions used in the Oracle type link their "type" parameter to the
 * actual type of the answer provided (to ensure type safety during calls).
 * By wrapping the oracle in a closure, its free type parameter can be
 * automatically inferred; this avoids a rather heavy-handed typing of the
 * parameters.
 * In that case the closure also adds a parameter to tweak the answer; this is
 * just to demonstrate what happens when cantTell outcomes resolve to Failed.
 * The parameter can also be used to inject answers to all questions, see
 * https://github.com/Siteimprove/alfa/blob/main/packages/alfa-rules/test/common/oracle.ts
 * for a more complete Oracle building (although it does only check the URI
 * of the question and therefore isn't well suited on larger test where the
 * same question might be asked with different subjects)
 *
 * There is, however, no link between the URI of the question and its type
 * (nor the type of the subject). Hence, we need to manually do this bit of
 * type checking. Not checking question.type would result in a type error as
 * we need to ensure that only these questions get an iterable of colors as
 * answer…
 */
function oracle<I, T, S>(
  color: "blue" | "white" = "white"
): act.Oracle<I, T, Question, S> {
  return (rule, question) => {
    if (
      // Checking the question URI to know what to answer
      question.uri === "background-colors" &&
      // Need to check the question type to ensure the return value has the correct type.
      question.type === "color[]"
    ) {
      if (
        // Checking the subject of the question, so that the answer may depend on it.
        // In that case, the background colour is known for elements with a class
        // of "hello" (and their text nodes children).
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
        // * calling `question.answer` here ensures that the correct type
        //   is used to answer the question (this matches `question.type`);
        // * calling `Some.of` leaves the possibility to not answer the question
        //   by returning `None` instead;
        // * calling `Future.now` is needed because the interview process is
        //   asynchronous (e.g. it can be done "live" in command line),
        //   therefore the Oracle itself needs to be asynchronous.
        return Future.now(
          Some.of(question.answer([Resolver.color(Color.named(color)) as RGB]))
        );
      }
    }

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
