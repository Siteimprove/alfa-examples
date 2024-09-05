import * as fs from "node:fs";
import * as url from "node:url";
import * as path from "node:path";

import { Audit, Outcome, Question } from "@siteimprove/alfa-act";
import { Crawler } from "@siteimprove/alfa-crawler";
import { Frontier } from "@siteimprove/alfa-frontier";
import { Hashable } from "@siteimprove/alfa-hash";

import rules from "@siteimprove/alfa-rules";

const [scope, ...seed] = process.argv.slice(2);

if (!scope) {
  console.error("You must pass a URL to the script");
  process.exit(1);
}

// TODO: This should be replaced with import.meta.dirname once we switch to Node 22
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontier = Frontier.of(scope, [scope, ...seed]);

Crawler.with(async (crawler) => {
  for await (const result of crawler.crawl(frontier)) {
    for (const input of result) {
      const outcomes = await Audit.of(input, rules)
        .evaluate()
        .map((outcomes) => [...outcomes]);

      const earl = outcomes.map((outcome) => outcome.toEARL());

      const { url } = input.response;

      console.group(url.toString());
      logStats(outcomes);
      console.groupEnd();

      const file =
        path.join(
          __dirname,
          "outcomes",
          url.host.getOr(""),
          ...url.path.filter((segment) => segment !== "")
        ) + ".json";

      fs.mkdirSync(path.dirname(file), { recursive: true });

      fs.writeFileSync(file, JSON.stringify(earl, null, 2));
    }
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
