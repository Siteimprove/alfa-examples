import { Audit, Outcome } from "@siteimprove/alfa-act";
import { Playwright } from "@siteimprove/alfa-playwright";
import { Sequence } from "@siteimprove/alfa-sequence";

const path = require("path");
import { fileURLToPath, pathToFileURL } from "url";
import { chromium } from "playwright";

// Only checking color contrast in this example
import { Rules } from "@siteimprove/alfa-rules";
const R69 = Rules.get("R69").get();

const url = fileURLToPath(
  pathToFileURL(path.join(__dirname, "fixtures", "page1.html"))
);

const options = { headless: false, slowMo: 50 };

(async () => {
  // Setup
  const browser = await chromium.launch(options);
  const page = await browser.newPage();
  await page.goto(url);

  // Grabbing and auditing the first page
  const initialDocument = await page.evaluateHandle("document");
  const initialAlfaPage = await Playwright.toPage(initialDocument);
  const initialAudit = await Audit.of(initialAlfaPage, [R69]).evaluate();

  console.log("First:");
  console.dir(Sequence.from(initialAudit).filter(Outcome.isFailed).toJSON());

  // Clicking link
  const link = page.locator("#next");
  await link.click();

  // Grabbing and auditing second page
  const finalDocument = await page.evaluateHandle("document");
  const finalAlfaPage = await Playwright.toPage(finalDocument);
  const finalAudit = await Audit.of(finalAlfaPage, [R69]).evaluate();

  console.log("Second:");
  console.dir(Sequence.from(finalAudit).filter(Outcome.isFailed).toJSON());

  // Teardown
  await browser.close();
})();
