import {
  type Audit,
  type CommitInformation,
  Logging,
  SIP,
} from "@siteimprove/alfa-test-utils";
import { getCommitInformation } from "@siteimprove/alfa-test-utils/git";

import { defineConfig } from "cypress";

export default defineConfig({
  screenshotOnRunFailure: false,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        // Upload audit to Siteimprove Intelligence Platform and log results
        async report(audit: Audit.JSON): Promise<null> {
          // (mandatory) Setup credentials (e.g., from environment variables).
          const userName = process.env.SI_USER_EMAIL;
          const apiKey = process.env.SI_API_KEY;

          // (mandatory) Setup site ID; TODO: replace with your own.
          const siteID = 16788956729;

          // (recommended) Fetch information about the latest commit
          const gitInformation = await getCommitInformation();

          // (optional) Name the test, this can be built from the commit information.
          const testName = (commit: CommitInformation) =>
            `On branch ${commit.BranchName} – Cypress integration`;

          // (optional) Provide a page title, this defaults to the first <title> element.
          // const pageTitle = "My page title";

          // (optional) Provide a page URL, this defaults to the page URL upon scraping.
          // This is useful to overwrite localhost URLs.
          const pageURL = "https://demo.siteimprovedemo.com/";

          const url = await SIP.upload(audit, {
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

          Logging.fromAudit(audit, url).print();

          return null;
        },
      });
    },
    supportFile: false,
    specPattern: "test/**.spec.ts",
  },
});
