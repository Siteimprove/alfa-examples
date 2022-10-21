import { Enzyme } from "@siteimprove/alfa-enzyme";

import * as alfa from "@siteimprove/alfa-jest";

// Only selecting a rule that apply to buttons.
import { Rules } from "@siteimprove/alfa-rules";
// We know R12 exists and can safely getUnsafe
const R12 = Rules.get("R12").getUnsafe();

import * as enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { persist } from "../../common/persist";

enzyme.configure({ adapter: new Adapter() });

alfa.Jest.createPlugin(
  (value: Enzyme.Type) => Enzyme.toPage(value),
  [R12],
  [persist(() => "outcomes/button.spec.json")]
);
