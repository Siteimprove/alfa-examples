import { Angular } from "@siteimprove/alfa-angular";

import * as alfa from "@siteimprove/alfa-jest";

// Only selecting a rule that apply to buttons.
import { Rules } from "@siteimprove/alfa-rules";
const R12 = Rules.get("R12").get();

import { persist } from "../../common/persist";

alfa.Jest.createPlugin(
  (value: Angular.Type) => Angular.toPage(value),
  [R12],
  [persist(() => "outcomes/button.spec.json")]
);
