import type { Audit } from "@siteimprove/alfa-test-utils/audit";
import { Logging, SIP } from "@siteimprove/alfa-test-utils/report";

import { defineConfig } from "cypress";

export default defineConfig({
  fixturesFolder: "fixtures",
  screenshotsFolder: "screenshots",
  videosFolder: "videos",

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        async report(audit: Audit.JSON): Promise<null> {
          const pageReportUrl = await SIP.upload(audit, {
            userName: process.env.SI_USER_EMAIL,
            apiKey: process.env.SI_API_KEY,
          });

          Logging.fromAudit(audit, pageReportUrl).print();

          return null;
        },

        log(message: string): null {
          console.log(message);
          return null;
        },
      });
    },
    supportFile: false,
    specPattern: "test/**.spec.ts",
  },
});
