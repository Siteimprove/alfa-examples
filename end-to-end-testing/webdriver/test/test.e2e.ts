/// <reference types="@siteimprove/alfa-chai" />

import { browser } from "@wdio/globals";
import { expect } from "chai";

import * as path from "node:path";
import * as url from "node:url";

const __dirname = import.meta.dirname;
const page = url.pathToFileURL(
  path.join(__dirname, "..", "..", "fixtures", "page.html"),
).href;

describe("Test page", () => {
  it("should be accessible", async () => {
    await browser.url(page);

    const document: WebdriverIO.Element = await browser.execute(
      "return window.document",
    );

    await expect(document).to.be.accessible();
  });
});
