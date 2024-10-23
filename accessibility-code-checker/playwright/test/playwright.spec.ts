import { test, expect } from "@playwright/test";

import { Playwright } from "@siteimprove/alfa-playwright";
import { Audit, Logging, SIP } from "@siteimprove/alfa-test-utils";

test("is page accessible", async ({ page }) => {
  // Navigate to the local web page
  // This suppose that the server is already started. See the demo-site folder.
  // TODO: Replace with your own page
  await page.goto("http://localhost:5173");

  // Get the document handle from the page
  const document = await page.evaluateHandle(() => window.document);

  /*
   * Usual Playwright instructions can live here.
   * For example, navigating through the page, opening menus or modals, etc.
   */

  // Scrape the page
  const alfaPage = await Playwright.toPage(document);

  // Run the audit
  const alfaResult = await Audit.run(alfaPage);

  // Setup credentials from environment variables.
  const userName = process.env.SI_USER_EMAIL;
  const apiKey = process.env.SI_API_KEY;

  // Upload the result to Siteimprove Intelligence Platform, if credentials are provided
  const url = await SIP.upload(alfaResult, {
    userName,
    apiKey,
    testName: (git) => git.BranchName,
  });

  // Log the result to the console
  Logging.fromAudit(alfaResult, url).print();

  // Check if some rule was failing.
  const failingRules = alfaResult.resultAggregates.filter(
    (aggregate) => aggregate.failed > 0,
  );

  // Fail the test if any rule failed.
  expect(
    failingRules.size,
    `The page has ${failingRules.size} failing rules`,
  ).toBe(0);
});
