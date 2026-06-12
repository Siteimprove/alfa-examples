import { Angular } from "@siteimprove/alfa-angular";
import { Vitest } from "@siteimprove/alfa-vitest";

import { Rules } from "@siteimprove/alfa-rules";
import { persist } from "common/persist";

const R12 = Rules.get("R12").getUnsafe();

Vitest.createPlugin(
  Angular.toPage,
  [R12],
  [persist(() => "outcomes/button.spec.json")],
);
