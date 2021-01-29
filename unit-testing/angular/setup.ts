import { Handler } from "@siteimprove/alfa-assert";
import { Angular } from "@siteimprove/alfa-angular";

import * as alfa from "@siteimprove/alfa-jest";
import rules from "@siteimprove/alfa-rules";

alfa.Jest.createPlugin((value: Angular.Type) => Angular.toPage(value), rules, [
  Handler.persist(() => "outcomes/button.spec.json"),
]);
