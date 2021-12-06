/// <reference types="@siteimprove/alfa-jest" />

import { mount } from "@vue/test-utils";

import { Button } from "./button";

// window.matchMedia is not currently implemented by JSDOM, used by Jest, so
// we need to mock it.
// see https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
// For the purpose of this test, we actually don't care about the result (they
// are not actually used), so we are OK with a mock that always answer `false`.
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
    };
  };

it("should be accessible", async () => {
  await expect(mount(Button)).not.toBeAccessible();
});
