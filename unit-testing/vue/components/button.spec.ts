/// <reference types="@siteimprove/alfa-vitest" />

import { Future } from "@siteimprove/alfa-future";
import { Rules } from "@siteimprove/alfa-rules";
import * as alfa from "@siteimprove/alfa-vitest";
import { Vue } from "@siteimprove/alfa-vue";
import { mount } from "@vue/test-utils";
import { persist } from "common/persist.js";
import { describe, expect, it } from "vitest";

import { EmptyButton, NamedButton } from "./button.js";

const R12 = Rules.get("R12").getUnsafe();
alfa.Vitest.createPlugin(
  (value: Vue.Type) => Future.from(Vue.toPage(value)),
  [R12],
  [persist(() => "outcomes/button.spec.json")],
);

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
