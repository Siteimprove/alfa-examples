/// <reference types="@siteimprove/alfa-vitest" />

import { TestBed } from "@angular/core/testing";

import { EmptyButtonComponent, NamedButtonComponent } from "./button";

describe("Named button", async () => {
  const fixture = TestBed.createComponent(NamedButtonComponent);

  it("should have a name", () => {
    expect(fixture).toBeAccessible();
  });
});

describe("Empty button", async () => {
  const fixture = TestBed.createComponent(EmptyButtonComponent);

  it("should not have a name", () => {
    expect(fixture).not.toBeAccessible();
  });
});
