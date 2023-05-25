/// <reference types="@siteimprove/alfa-jest" />

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { EmptyButtonComponent, NamedButtonComponent } from "./button";

let emptyFixture: ComponentFixture<EmptyButtonComponent>;
let namedFixture: ComponentFixture<NamedButtonComponent>;

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

beforeEach(async () => {
  await TestBed.configureTestingModule({
    declarations: [EmptyButtonComponent, NamedButtonComponent],
  }).compileComponents();
});

beforeEach(() => {
  emptyFixture = TestBed.createComponent(EmptyButtonComponent);
  emptyFixture.detectChanges();

  namedFixture = TestBed.createComponent(NamedButtonComponent);
  namedFixture.detectChanges();
});

describe("Empty button", () => {
  it("should not have a name", async () => {
    await expect(emptyFixture).not.toBeAccessible();
  });
});

describe("Named button", () => {
  it("should have a name", async () => {
    await expect(namedFixture).toBeAccessible();
  });
});
