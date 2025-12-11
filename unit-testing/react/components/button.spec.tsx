/// <reference types="@siteimprove/alfa-jest" />

import { Button } from "./button.js";

it("should not have a name", async () => {
  await expect(<Button></Button>).not.toBeAccessible();
});

it("should have a name", async () => {
  await expect(<Button>Hello</Button>).toBeAccessible();
});
