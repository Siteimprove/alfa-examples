import { Handler } from "@siteimprove/alfa-assert";
import { Vue } from "@siteimprove/alfa-vue";

import * as alfa from "@siteimprove/alfa-jest";
import rules from "@siteimprove/alfa-rules";

alfa.Jest.createPlugin((value: Vue.Type) => Vue.toPage(value), rules, [
  Handler.persist(() => "outcomes/button.spec.json"),
]);
