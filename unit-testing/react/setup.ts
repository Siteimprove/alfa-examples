import { Enzyme } from "@siteimprove/alfa-enzyme";

import * as alfa from "@siteimprove/alfa-jest";
import rules from "@siteimprove/alfa-rules";

import * as enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { persist } from "../../common/persist";

enzyme.configure({ adapter: new Adapter() });

alfa.Jest.createPlugin((value: Enzyme.Type) => Enzyme.toPage(value), rules, [
  persist(() => "outcomes/button.spec.json"),
]);
