import * as fs from "node:fs";
import * as path from "node:path";
import * as url from "node:url";

import { Audit, Outcome, Question } from "@siteimprove/alfa-act";
import { Hashable } from "@siteimprove/alfa-hash";
import { Scraper } from "@siteimprove/alfa-scraper";

import rules from "@siteimprove/alfa-rules";

// TODO: This should be replaced with import.meta.dirname once we switch to Node 22
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const input = path.join(__dirname, "fixtures", "page.html");
const output = path.join(__dirname, "outcomes", "page.html.json");
const local = url.pathToFileURL(input).toString();

const page = process.argv?.[2] ?? local;

Scraper.with(async (scraper) => {
  for (const input of await scraper.scrape(page)) {
    const outcomes = await Audit.of(input, rules.default)
      .evaluate()
      .map((outcomes) => [...outcomes]);

    const earl = outcomes.map((outcome) => outcome.toEARL());

    const { url } = input.response;

    console.group(url.toString());
    logStats(outcomes);
    console.groupEnd();

    const file =
      url.toString() === local
        ? output
        : path.join(
            __dirname,
            "outcomes",
            url.host.getOr(""),
            ...url.path.filter((segment) => segment !== "")
          ) + ".json";

    fs.mkdirSync(path.dirname(file), { recursive: true });

    fs.writeFileSync(file, JSON.stringify(earl, null, 2));
  }
});

function logStats<I, T extends Hashable, Q extends Question.Metadata>(
  outcomes: Array<Outcome<I, T, Q>>
): void {
  console.log(outcomes.filter(Outcome.isPassed).length, "passed outcomes");

  console.log(outcomes.filter(Outcome.isFailed).length, "failed outcomes");

  console.log(
    outcomes.filter(Outcome.isInapplicable).length,
    "inapplicable rules"
  );
}
