import * as alfa from "@siteimprove/alfa-jest";
import { React } from "@siteimprove/alfa-react";

// Only selecting a rule that apply to buttons.
import { Rules } from "@siteimprove/alfa-rules";
const R12 = Rules.get("R12").getUnsafe();

import { persist } from "common/persist";

alfa.Jest.createPlugin(
  (value: React.Type) => React.toPage(value),
  [R12],
  [persist(() => "outcomes/button.spec.json")],
);
