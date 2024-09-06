import { Future } from "@siteimprove/alfa-future";
import { Vue } from "@siteimprove/alfa-vue";

import * as alfa from "@siteimprove/alfa-jest";

// Only selecting a rule that apply to buttons.
import { Rules } from "@siteimprove/alfa-rules";
const R12 = Rules.get("R12").getUnsafe();

// import { persist } from "common/persist";

alfa.Jest.createPlugin(
  (value: Vue.Type) => Future.from(Vue.toPage(value)),
  [R12],
  // For some reason, jsonld isn't included correctly in the JSDOM environment.
  // Since we do not officially support Vue integration, we just skip the
  // persister on this test.
  []
);
