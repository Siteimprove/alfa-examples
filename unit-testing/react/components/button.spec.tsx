/// <reference types="@siteimprove/alfa-jest" />

import { shallow } from "enzyme";

import { Button } from "./button";

it("should be accessible", async () => {
  await expect(shallow(<Button />)).toBeAccessible();
});
