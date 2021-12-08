/// <reference types="@siteimprove/alfa-jest" />

import { shallow } from "enzyme";

import { Button } from "./button";

it("should not have a name", async () => {
  await expect(shallow(<Button></Button>)).not.toBeAccessible();
});

it("should have a name", async () => {
  await expect(shallow(<Button>Hello</Button>)).toBeAccessible();
});
