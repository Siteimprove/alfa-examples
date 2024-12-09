import { Puppeteer } from "@siteimprove/alfa-puppeteer";
import {
  Audit,
  type CommitInformation,
  Logging,
  SIP,
} from "@siteimprove/alfa-test-utils";

import { test } from "@siteimprove/alfa-test-deprecated";
import { getCommitInformation } from "@siteimprove/alfa-test-utils/git";

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
   * Usual Puppeteer instructions can live here.
   * For example, navigating through the page, opening menus or modals, etc.
   */

  // Scrape the page
  const alfaPage = await Puppeteer.toPage(document);

  // Close the browser
  await browser.close();

  // Run the audit
  const alfaResult = await Audit.run(alfaPage);

  // (mandatory) Setup credentials (e.g., from environment variables).
  const userName = process.env.SI_USER_EMAIL;
  const apiKey = process.env.SI_API_KEY;

  // (mandatory) Setup site ID; TODO: replace with your own.
  const siteID = "6255777";

  // (recommended) Fetch information about the latest commit
  const gitInformation = await getCommitInformation();

  // (optional) Name the test, this can be built from the commit information.
  const testName = (commit: CommitInformation) =>
    `On branch ${commit.BranchName} – Puppeteer integration`;

  // (optional) Provide a page title, this defaults to the first <title> element.
  const pageTitle = "My page title";

  // (optional) Provide a page URL, this defaults to the page URL upon scraping.
  // This is useful to overwrite localhost URLs.
  const pageURL = "https://demo.siteimprovedemo.com/";

  // Upload the result to Siteimprove Intelligence Platform, if credentials are provided
  const url = await SIP.upload(alfaResult, {
    // mandatory options
    userName,
    apiKey,
    siteID,
    // optional options
    commitInformation: gitInformation.getOr(undefined),
    testName,
    // pageTitle,
    pageURL,
  });

  // Log the result to the console
  Logging.fromAudit(alfaResult, url).print();
  // If the upload failed, show the reason.
  if (url.isErr()) {
    console.warn(`\n${url.getErr()}\n`);
  }
  // If the git information couldn't be retrieved, show the reason.
  if (gitInformation.isErr()) {
    console.warn(`\n${gitInformation.getErr()}\n`);
  }

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
