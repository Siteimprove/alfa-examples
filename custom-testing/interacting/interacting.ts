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
  pathToFileURL(path.join(__dirname, "fixtures", "page.html"))
);

const options = { headless: false, slowMo: 50 };

(async () => {
  // Setup
  const browser = await chromium.launch(options);
  const page = await browser.newPage();
  await page.goto(url);

  const document = await page.evaluateHandle("document");

  // Grabbing and auditing initial page
  const initialAlfaPage = await Playwright.toPage(document);
  const initialAudit = await Audit.of(initialAlfaPage, [R69]).evaluate();

  console.log("Initial state:");
  console.dir(Sequence.from(initialAudit).filter(Outcome.isFailed).toJSON());

  // Filling field and clicking button
  const input = page.locator("#input");
  await input.fill("Jean-Yves");

  const button = page.locator("#submit");
  await button.click();

  // Grabbing and auditing final page
  const finalAlfaPage = await Playwright.toPage(document);
  const finalAudit = await Audit.of(finalAlfaPage, [R69]).evaluate();

  console.log("Final state:");
  console.dir(Sequence.from(finalAudit).filter(Outcome.isFailed).toJSON());

  // Teardown
  await browser.close();
})();
