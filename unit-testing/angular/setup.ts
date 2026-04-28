import { Angular } from "@siteimprove/alfa-angular";
import { Future } from "@siteimprove/alfa-future";
import { Vitest } from "@siteimprove/alfa-vitest";

import { Rules } from "@siteimprove/alfa-rules";
import { persist } from "common/persist";

const R12 = Rules.get("R12").getUnsafe();

Vitest.createPlugin(
  (value: Angular.Type) => Future.from(Angular.toPage(value)),
  [R12],
  [persist(() => "outcomes/button.spec.json")],
);
