import * as fs from "node:fs";
import * as path from "node:path";
import * as url from "node:url";

import { Audit, Rule } from "@siteimprove/alfa-act";
import * as aria from "@siteimprove/alfa-aria";
import { Cascade } from "@siteimprove/alfa-cascade";
import { Performance } from "@siteimprove/alfa-performance";
import { Scraper } from "@siteimprove/alfa-scraper";

import rules from "@siteimprove/alfa-rules";
import type { Flattened } from "@siteimprove/alfa-rules";

const { isMeasure } = Performance.Measure;

const __dirname = import.meta.dirname;

// We'll record the rules' performance in a duration object with this shape:
interface Durations {
  common: { [key: string]: number };
  rules: {
    [key: string]: { [key: string]: number };
  };
}

const durations: Durations = { common: {}, rules: {} };

// Callback to record a common performance measurement.
// They are stored into the duration.common object.
function recordCommon(entry: Performance.Entry<string>): void {
  if (isMeasure(entry)) {
    durations.common[entry.data] = entry.duration;
  }
}

// Type of the events emitted by rules evaluation.
// Rules emit 3 kind of events to measure the total time, the time spent
// in Applicability, and the time spent in Expectation
type RuleEvent = Rule.Event<
  Flattened.Input,
  Flattened.Target,
  Flattened.Question,
  Flattened.Subject
>;

// Callback to record rules performance measurement.
// They are stored in the durations.rules object, with a key which is the rule
// identifier (e.g. "sia-r1"); and a value which contains the durations of each
// measured event.
// Note that some rules are inapplicable and therefore do not evaluate their
// Expectation (and do not record its duration…) Also, composite rules do not
// have an Applicability.
function recordRule(entry: Performance.Entry<RuleEvent>): void {
  if (isMeasure(entry)) {
    const ruleId = entry.data.rule.uri.replace(
      "https://alfa.siteimprove.com/rules/",
      "",
    );
    if (durations.rules[ruleId] === undefined) {
      durations.rules[ruleId] = {};
    }
    durations.rules[ruleId][entry.data.name] = entry.duration;
  }
}

const commonPerformance = Performance.of<string>().on(recordCommon);
const rulesPerformance = Performance.of<RuleEvent>().on(recordRule);

const input = url
  .pathToFileURL(path.join(__dirname, "fixtures", "page.html"))
  .toString();
const output = path.join(__dirname, "outcomes", "performances.json");

Scraper.with(async (scraper) => {
  for (const page of await scraper.scrape(input)) {
    const device = page.device;
    const document = page.document;

    const start = commonPerformance.mark("total").start;

    // Resolving the Cascade, and computing the accessibility tree, are
    // expensive computations that are cached and shared by all rules needing
    // it.
    // By pre-computing it, we ensure that the time they take is not unfairly
    // charged on the first rule needing it… Plus we get valuable data on how
    // long it actually takes.
    // Other computations are also cached and shared, and could be hoisted here.
    // For most, it is however not easy to know in advance what will be needed.
    // This explains, for example, the big performance difference which is often
    // seen between R66 and R69: they both need the expensive background color
    // computation which is cached and therefore only "charged" on one of them…
    const startCascade = commonPerformance.mark("cascade").start;
    Cascade.from(document, device);
    commonPerformance.measure("cascade", startCascade);

    const startAria = commonPerformance.mark("aria-tree").start;
    aria.Node.from(document, device);
    commonPerformance.measure("aria-tree", startAria);

    // The Performance object with its callback listener is passed to the Audit
    // evaluation.
    await Audit.of(page, rules).evaluate(rulesPerformance);

    // Closing the total duration measurement.
    commonPerformance.measure("total", start);

    // Saving result.
    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.writeFileSync(output, JSON.stringify(durations, null, 2));
  }
});
