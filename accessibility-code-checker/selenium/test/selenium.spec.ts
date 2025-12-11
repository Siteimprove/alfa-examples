import { Selenium } from "@siteimprove/alfa-selenium";
import {
  Audit,
  type CommitInformation,
  Logging,
  SIP,
} from "@siteimprove/alfa-test-utils";

import { test } from "@siteimprove/alfa-test";
import { getCommitInformation } from "@siteimprove/alfa-test-utils/git";

import { Browser, Builder, WebDriver } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";

let driver: WebDriver | undefined;

const options = new chrome.Options();
options.addArguments("--headless", "--no-sandbox", "--disable-dev-shm-usage");

test(
  "Page should be accessible",
  async (t) => {
    // Create a browser instance
    driver = await new Builder()
      .forBrowser(Browser.CHROME)
      .setChromeOptions(options)
      .build();

    // Navigate to the local web page
    // This supposes that the server is already running. See the demo-site folder.
    // TODO: Replace with your own page
    await driver.get("http://localhost:5173");

    /*
     * Usual Selenium instructions can live here.
     * For example, navigating through the page, opening menus or modals, etc.
     */

    // Scrape the page
    const alfaPage = await Selenium.toPage(driver);

    // Close the driver
    await driver.close();

    // Run the audit
    const alfaResult = await Audit.run(alfaPage);

    // (mandatory) Setup credentials (e.g., from environment variables).
    const userName = process.env.SI_USER_EMAIL;
    const apiKey = process.env.SI_API_KEY;

    // (mandatory) Setup site ID; TODO: replace with your own.
    const siteID = 16788956729;

    // (recommended) Fetch information about the latest commit
    const gitInformation = await getCommitInformation();

    // (optional) Name the test, this can be built from the commit information.
    const testName = (commit: CommitInformation) =>
      `On branch ${commit.BranchName} – Selenium integration`;

    // (optional) Provide a page title, this defaults to the first <title> element.
    // const pageTitle = "My page title";

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
    t.equal(
      failingRules.size,
      0,
      `The page has ${failingRules.size} failing rules`,
    );
  },
  { timeout: 60_000 /* ms */ },
);
