import { Handler } from "@siteimprove/alfa-assert";
import { Enzyme } from "@siteimprove/alfa-enzyme";

import * as alfa from "@siteimprove/alfa-jest";
import rules from "@siteimprove/alfa-rules";

import * as enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

enzyme.configure({ adapter: new Adapter() });

alfa.Jest.createPlugin((value: Enzyme.Type) => Enzyme.toPage(value), rules, [
  Handler.persist(() => "outcomes/button.spec.json"),
]);
