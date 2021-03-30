import { Angular } from "@siteimprove/alfa-angular";

import * as alfa from "@siteimprove/alfa-jest";
import rules from "@siteimprove/alfa-rules";

import { persist } from "../../common/persist";

alfa.Jest.createPlugin((value: Angular.Type) => Angular.toPage(value), rules, [
  persist(() => "outcomes/button.spec.json"),
]);
