import { test, expect } from "@playwright/test";

import { Playwright } from "@siteimprove/alfa-playwright";
import {
  Audit,
  type CommitInformation,
  Logging,
  SIP,
} from "@siteimprove/alfa-test-utils";
import { getCommitInformation } from "@siteimprove/alfa-test-utils/git";

test("is page accessible", async ({ page }) => {
  // Navigate to the local web page
  // This supposes that the server is already running. See the demo-site folder.
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

  // (mandatory) Setup credentials (e.g., from environment variables).
  const userName = process.env.SI_USER_EMAIL;
  const apiKey = process.env.SI_API_KEY;

  // (mandatory) Setup site ID; TODO: replace with your own.
  const siteID = 900788;

  // (recommended) Fetch information about the latest commit
  const gitInformation = await getCommitInformation();

  // (optional) Name the test, this can be built from the commit information.
  const testName = (commit: CommitInformation) =>
    `On branch ${commit.BranchName} – Playwright integration`;

  // (optional) Provide a page title, this defaults to the first <title> element.
  // const pageTitle = "My page title";

  // (optional) Provide a page URL, this defaults to the page URL upon scraping.
  // This is useful to overwrite localhost URLs.
  const pageURL = "https://demo.siteimprovedemo.com/";

  // Upload the result to Siteimprove Intelligence Platform.
  // If any mandatory option is missing, this will fail.
  const url = await SIP.upload(alfaResult, {
    // mandatory options
    userName,
    apiKey,
    siteID,
    // optional options
    commitInformation: gitInformation,
    testName,
    // pageTitle,
    pageURL,
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
