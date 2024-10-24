import { Puppeteer } from "@siteimprove/alfa-puppeteer";
import { Audit, Logging, SIP } from "@siteimprove/alfa-test-utils";

import { test } from "@siteimprove/alfa-test";

import puppeteer from "puppeteer";

test("Page should be accessible", async (t) => {
  // Create a browser instance
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });

  // Navigate to the local web page
  // This suppose that the server is already started. See the demo-site folder.
  // TODO: Replace with your own page
  const page = await browser.newPage();
  await page.goto("http://localhost:5173");

  // Get the document handle from the page
  const document = await page.evaluateHandle(() => window.document);

  /*
   * Usual Selenium instructions can live here.
   * For example, navigating through the page, opening menus or modals, etc.
   */

  // Scrape the page
  const alfaPage = await Puppeteer.toPage(document);

  // Close the browser
  await browser.close();

  // Run the audit
  const alfaResult = await Audit.run(alfaPage);

  // Setup credentials from environment variables.
  const userName = process.env.SI_USER_EMAIL;
  const apiKey = process.env.SI_API_KEY;

  // Upload the result to Siteimprove Intelligence Platform, if credentials are provided
  const url = await SIP.upload(alfaResult, {
    userName,
    apiKey,
    testName: (git) => `${git.BranchName} – Puppeteer integration`,
  });

  // Log the result to the console
  Logging.fromAudit(alfaResult, url).print();

  // Check if some rule was failing.
  const failingRules = alfaResult.resultAggregates.filter(
    (aggregate) => aggregate.failed > 0,
  );

  // Fail the test if any rule failed.
  t.equal(
    failingRules.size,
    0,
    `The page has ${failingRules.size} failing rules`,
  );
});
