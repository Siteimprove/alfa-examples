/// <reference types="node" />

import * as fs from "fs";
import * as path from "path";

import { Handler } from "@siteimprove/alfa-assert";
import { Formatter } from "@siteimprove/alfa-formatter";
import { Future } from "@siteimprove/alfa-future";
import { Mapper } from "@siteimprove/alfa-mapper";

import earl from "@siteimprove/alfa-formatter-earl";

export function persist<I, T, Q, S>(
  output: Mapper<I, string>,
  format: Formatter<I, T, Q, S> = earl()
): Handler<I, T, Q, S> {
  return (input, rules, outcomes, message) =>
    Future.from(async () => {
      const file = path.relative(process.cwd(), output(input));
      const dir = path.dirname(file);

      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(file, format(input, rules, outcomes) + "\n");

      return `${message}, see the full report at ${file}`;
    });
}
