import * as chai from "chai";

import { Future } from "@siteimprove/alfa-future";
import { WebElement } from "@siteimprove/alfa-webdriver";

import * as alfa from "@siteimprove/alfa-chai";
import rules from "@siteimprove/alfa-rules";

import { persist } from "common/persist";
import * as path from "node:path";
import * as url from "node:url";

chai.use(
  alfa.Chai.createPlugin(
    (value: WebElement) => Future.from(WebElement.toPage(value, browser)),
    rules,
    [persist(() => "test/outcomes/page.spec.json")]
  )
);

const { expect } = chai;

// TODO: This should be replaced with import.meta.dirname once we switch to Node 22
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("page.html", () => {
  before(async () => {
    await browser.url(
      url.pathToFileURL(path.join(__dirname, "fixtures", "page.html")).href
    );
  });

  it("should be accessible", async () => {
    await expect(await browser.$("html")).to.be.accessible();
  });
});
