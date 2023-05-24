/// <reference types="node" />

import { Angular } from "@siteimprove/alfa-angular";

import * as alfa from "@siteimprove/alfa-jest";

import { TextEncoder } from "util";
global.TextEncoder = TextEncoder;

// Only selecting a rule that apply to buttons.
import { Rules } from "@siteimprove/alfa-rules";
const R12 = Rules.get("R12").getUnsafe();

import { persist } from "../../common/persist";

alfa.Jest.createPlugin(
  (value: Angular.Type) => Angular.toPage(value),
  [R12],
  [persist(() => "outcomes/button.spec.json")]
);
