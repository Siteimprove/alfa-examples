import { test, expect } from "@playwright/test";
import { Playwright } from "@siteimprove/alfa-playwright";
import { Audit, Logging, Outcomes, SIP } from "@siteimprove/alfa-test-utils";

test("is page accessible", async ({ page }) => {
  // Navigate to the local web page
  // This suppose that the server is already started. See the demo-site folder.
  // TODO: Replace with your own page
  await page.goto("http://localhost:5173");

  // Get the document handle from the page
  const document = await page.evaluateHandle(() => window.document);

  // Scrape the page
  const alfaPage = await Playwright.toPage(document);

  const alfaResult = await Audit.run(alfaPage, {
    outcomes: {
      exclude: Outcomes.insideSelectorFilter("iframe"),
    },
  });

  // Log the result, and upload it to the Siteimprove Intelligence Platform
  // if credentials have been provided.

  const userName = process.env.SI_USER_EMAIL;
  const apiKey = process.env.SI_API_KEY;

  if (userName !== undefined && apiKey !== undefined) {
    // We have credentials, so we can upload results.
    const url = await SIP.upload(alfaResult, {
      userName,
      apiKey,
      testName: (git) => git.BranchName,
    });

    Logging.result(alfaResult, url);
  } else {
    // We have no credentials and only do local logging.
    Logging.result(alfaResult);
  }

  const failingRules = alfaResult.resultAggregates.filter(
    (aggregate) => aggregate.failed > 0
  );

  expect(
    failingRules.size,
    `The page has ${failingRules.size} failing rules`
  ).toBe(0);
});
