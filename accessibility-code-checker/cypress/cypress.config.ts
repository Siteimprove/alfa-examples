import type { Audit } from "@siteimprove/alfa-test-utils/audit";
import { Logging, SIP } from "@siteimprove/alfa-test-utils/report";

import { defineConfig } from "cypress";

export default defineConfig({
  screenshotOnRunFailure: false,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        // Upload audit to Siteimprove Intelligence Platform and log results
        async report(audit: Audit.JSON): Promise<null> {
          const pageReportUrl = await SIP.upload(audit, {
            userName: process.env.SI_USER_EMAIL,
            apiKey: process.env.SI_API_KEY,
            testName: (git) => `${git.BranchName} – Cypress integration`,
          });

          Logging.fromAudit(audit, pageReportUrl).print();

          return null;
        },
      });
    },
    supportFile: false,
    specPattern: "test/**.spec.ts",
  },
});
