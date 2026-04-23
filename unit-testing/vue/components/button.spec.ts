/// <reference types="@siteimprove/alfa-vitest" />

import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import { EmptyButton, NamedButton } from "./button.js";

// window.matchMedia is not currently implemented by JSDOM which vitest uses,
// so we need a mock.
// For the purpose of this test, we actually don't care about the result (they
// are not actually used), so we are OK with a mock that always answer `false`.
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
    };
  };

describe("Empty button", () => {
  it("should not have a name", () => {
    expect(mount(EmptyButton)).not.toBeAccessible();
  });
});

describe("Named button", () => {
  it("should have a name", () => {
    expect(mount(NamedButton)).toBeAccessible();
  });
});
