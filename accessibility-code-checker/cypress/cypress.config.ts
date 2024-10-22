import { Result } from "@siteimprove/alfa-result";
import { defineConfig } from "cypress";

export default defineConfig({
  fixturesFolder: "fixtures",
  screenshotsFolder: "screenshots",
  videosFolder: "videos",

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        log(message: string): null {
          console.log(message);
          return null;
        },
        dir(message: any): null {
          console.dir(message, { depth: 8 });
          return null;
        },
        async git(): Promise<Result.JSON<CommitInformation, string>> {
          const gitInfo = await getCommitInformation();

          return gitInfo.toJSON();
        },
        async upload({
          audit,
          options,
        }: {
          audit: Audit.Foo;
          options: SIP.Options;
        }): Promise<Result<string, string>> {
          return SIP.upload(audit, options);
        },
      });
    },
    supportFile: false,
    specPattern: "test/**.spec.ts",
  },
});
