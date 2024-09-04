/// <reference types="@siteimprove/alfa-jest" />

import * as enzyme from "enzyme";

import { Button } from "./button.js";

it("should not have a name", async () => {
  await expect(enzyme.default.shallow(<Button></Button>)).not.toBeAccessible();
});

it("should have a name", async () => {
  await expect(enzyme.default.shallow(<Button>Hello</Button>)).toBeAccessible();
});
