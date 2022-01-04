import * as act from "@siteimprove/alfa-act";
import { Color, RGB } from "@siteimprove/alfa-css";
import { Element, Text } from "@siteimprove/alfa-dom";
import { Future } from "@siteimprove/alfa-future";
import { None, Some } from "@siteimprove/alfa-option";
import { Refinement } from "@siteimprove/alfa-refinement";
import rules, { Question } from "@siteimprove/alfa-rules";
import { Scraper } from "@siteimprove/alfa-scraper";
import { Resolver } from "@siteimprove/alfa-style";

import * as fs from "fs";
import * as path from "path";
import * as url from "url";

const { and } = Refinement;

const input = path.join(__dirname, "fixtures", "page.html");
const output = path.join(__dirname, "outcomes", "page.html.json");
const page = url.pathToFileURL(input).toString();

/**
 * Building an Oracle for the question "first-tabbable-reference-is-main" on
 * an element with id "main"
 *
 * The questions used in the Oracle type link their "type" parameter to the
 * actual type of the answer provided (to ensure type safety during calls).
 * This forces a rather heavy-handed typing of the "question" parameter in
 * the oracle here. It is automatically build from the "Question" type used
 * in rules.
 *
 * There is, however, no link between the URI of the question and its type
 * (nor the type of the subject). Hence, we need to manually do this bit of
 * type checking. Not checking question.type would result in a type error as
 * we need to ensure that only these questions get an iterable of colors as
 * answer…
 */
function oracle<I, T, S>(): act.Oracle<I, T, Question, S> {
  return (rule, question) => {
    if (
      // Checking the question URI to know what to answer
      question.uri === "background-colors" &&
      // Need to check the question type to ensure the return value has the correct type.
      question.type === "color[]"
    ) {
      if (
        // Checking the subject of the question, so that the answer may depend on it.
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
        return Future.now(
          Some.of(
            question.answer([Resolver.color(Color.named("white")) as RGB])
          )
        );
      }
    }

    return Future.now(None);
  };
}

Scraper.with(async (scraper) => {
  for (const input of await scraper.scrape(page)) {
    // Passing the oracle to the Audit.
    const outcomes = await act.Audit.of(input, rules, oracle())
      .evaluate()
      .map((outcomes) => [...outcomes]);

    const earl = outcomes.map((outcome) => outcome.toEARL());

    const { url } = input.response;

    console.group(url.toString());
    logStats(outcomes);
    console.groupEnd();

    fs.mkdirSync(path.dirname(output), { recursive: true });

    fs.writeFileSync(output, JSON.stringify(earl, null, 2));
  }
});

function logStats<I, T, Q>(outcomes: Array<act.Outcome<I, T, Q>>): void {
  console.log(outcomes.filter(act.Outcome.isPassed).length, "passed outcomes");

  console.log(outcomes.filter(act.Outcome.isFailed).length, "failed outcomes");

  console.log(
    outcomes.filter(act.Outcome.isCantTell).length,
    "can't Tell outcomes"
  );

  console.log(
    outcomes.filter(act.Outcome.isInapplicable).length,
    "inapplicable rules"
  );
}
