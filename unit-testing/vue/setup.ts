import { Future } from "@siteimprove/alfa-future";
import { Vue } from "@siteimprove/alfa-vue";

import * as alfa from "@siteimprove/alfa-jest";

// Not sure why this is needed, but it fixes a missing TextEncoder problem.
// It might be something that needs to be fixed in alfa-jest, but we seem to not
// be the only ones with this problem.
// See https://github.com/inrupt/solid-client-authn-js/issues/1676#issuecomment-917016646
import { TextEncoder } from "util";
global.TextEncoder = TextEncoder;

// Only selecting a rule that apply to buttons.
import { Rules } from "@siteimprove/alfa-rules";
const R12 = Rules.get("R12").getUnsafe();

import { persist } from "common/persist";

alfa.Jest.createPlugin(
  (value: Vue.Type) => Future.from(Vue.toPage(value)),
  [R12],
  [persist(() => "outcomes/button.spec.json")]
);
