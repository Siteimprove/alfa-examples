import { Enzyme } from "@siteimprove/alfa-enzyme";

import * as alfa from "@siteimprove/alfa-jest";

// Only selecting a rule that apply to buttons.
import { Rules } from "@siteimprove/alfa-rules";
const R12 = Rules.get("R12").get();

import * as enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { persist } from "../../common/persist";

enzyme.configure({ adapter: new Adapter() });

alfa.Jest.createPlugin(
  (value: Enzyme.Type) => Enzyme.toPage(value),
  [R12],
  [persist(() => "outcomes/button.spec.json")]
);
