/// <reference types="node" />

import { Question } from "@siteimprove/alfa-act";
import { Handler } from "@siteimprove/alfa-assert";
import { Formatter } from "@siteimprove/alfa-formatter";
import earl from "@siteimprove/alfa-formatter-earl";
import { Future } from "@siteimprove/alfa-future";
import { Hashable } from "@siteimprove/alfa-hash";
import { Mapper } from "@siteimprove/alfa-mapper";

import * as fs from "fs";
import * as path from "path";

export function persist<I, T extends Hashable, Q extends Question.Metadata, S>(
  output: Mapper<I, string>,
  format: Formatter<I, T, Q, S> = earl()
): Handler<I, T, Q, S> {
  return (input, rules, outcomes, message) =>
    Future.from(async () => {
      const file = path.relative(process.cwd(), output(input));
      const dir = path.dirname(file);

      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(file, format(input, rules, [...outcomes]) + "\n");

      return `${message}, see the full report at ${file}`;
    });
}
