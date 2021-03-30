import { Vue } from "@siteimprove/alfa-vue";

import * as alfa from "@siteimprove/alfa-jest";
import rules from "@siteimprove/alfa-rules";

import { persist } from "../../common/persist";

alfa.Jest.createPlugin((value: Vue.Type) => Vue.toPage(value), rules, [
  persist(() => "outcomes/button.spec.json"),
]);
