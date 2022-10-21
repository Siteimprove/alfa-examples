import { Angular } from "@siteimprove/alfa-angular";

import * as alfa from "@siteimprove/alfa-jest";

// Only selecting a rule that apply to buttons.
import { Rules } from "@siteimprove/alfa-rules";
// We know R12 exists and can safely getUnsafe
const R12 = Rules.get("R12").getUnsafe();

import { persist } from "../../common/persist";

alfa.Jest.createPlugin(
  (value: Angular.Type) => Angular.toPage(value),
  [R12],
  [persist(() => "outcomes/button.spec.json")]
);
