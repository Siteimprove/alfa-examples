import { Selenium } from "@siteimprove/alfa-selenium";
import { Audit, Logging, SIP } from "@siteimprove/alfa-test-utils";

import { test } from "@siteimprove/alfa-test";

import { Browser, Builder, WebDriver } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";

let driver: WebDriver | undefined;

const options = new chrome.Options();
options.addArguments("--headless", "--no-sandbox", "--disable-dev-shm-usage");

test("Page should be accessible", async (t) => {
  // Create a browser instance
  driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(options)
    .build();

  // Navigate to the local web page
  // This suppose that the server is already started. See the demo-site folder.
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

  // Setup credentials from environment variables.
  const userName = process.env.SI_USER_EMAIL;
  const apiKey = process.env.SI_API_KEY;

  // Upload the result to Siteimprove Intelligence Platform, if credentials are provided
  const url = await SIP.upload(alfaResult, {
    userName,
    apiKey,
    testName: (git) => `{git.BranchName} – Selenium integration`,
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
