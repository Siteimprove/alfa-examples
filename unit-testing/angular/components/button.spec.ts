/// <reference types="@siteimprove/alfa-jest" />

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ButtonComponent } from "./button";

let fixture: ComponentFixture<ButtonComponent>;

// window.matchMedia is not currently implemented by Jest (?), so we need to mock
// it.
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
    declarations: [ButtonComponent],
  }).compileComponents();
});

beforeEach(() => {
  fixture = TestBed.createComponent(ButtonComponent);
  fixture.detectChanges();
});

it("should be accessible", async () => {
  await expect(fixture).not.toBeAccessible();
});
