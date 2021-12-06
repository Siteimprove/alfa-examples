import { Angular } from "@siteimprove/alfa-angular";

import * as alfa from "@siteimprove/alfa-jest";

// Selecting a rule that applies to buttons
import R12 from "@siteimprove/alfa-rules";

import { persist } from "../../common/persist";

alfa.Jest.createPlugin((value: Angular.Type) => Angular.toPage(value), R12, [
  persist(() => "outcomes/button.spec.json"),
]);
