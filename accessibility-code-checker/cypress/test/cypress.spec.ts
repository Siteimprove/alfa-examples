import { Cypress as AlfaCypress } from "@siteimprove/alfa-cypress";

import { Element } from "@siteimprove/alfa-dom";
import type { Result } from "@siteimprove/alfa-result";

import { Audit, Rules } from "../test-utils/index.js";

import type { CommitInformation } from "../test-utils/git/git.js";

it("should scrape a document", () => {
  cy.visit("http://localhost:5173");

  cy.get(".testimonials-top").should("exist");

  cy.document()
    .then(AlfaCypress.toPage)
    .then((page) => Audit.run(page, { rules: { include: Rules.aaFilter } }))
    .then((audit) => {
      // cy.task("dir", audit.resultAggregates.toJSON());
      cy.task(
        "dir",
        audit.page.document
          .descendants()
          .filter(Element.isElement)
          .map((elt) => elt.name)
          .toJSON(),
      );
      // cy.task("dir", audit.outcomes.toJSON());
      let options = {
        userName: Cypress.env("SI_USER_EMAIL"),
        apiKey: Cypress.env("SI_API_KEY"),
      };

      // cy.task("dir", options);

      const result = cy
        .task("upload", { audit: Audit.toFoo(audit), options })
        .then((foo: any) => cy.task("dir", foo));
      // cy.task("dir", result);
      // return result;
    });
  // .then((url: Result<string, string>) =>
  //   cy.task(
  //     "log",
  //     url.getOrElse(() => url.getErrUnsafe()),
  //   ),
  // );

  cy.task("log", "yolo");
  cy.task("git").then((git: Result.JSON<CommitInformation, string>) => {
    cy.task("dir", git);
    cy.task("log", git.value.BranchName);
  });
});

// test("is page accessible", async ({ page }) => {
//   // Navigate to the local web page
//   // This suppose that the server is already started. See the demo-site folder.
//   // TODO: Replace with your own page
//   await page.goto("http://localhost:5173");
//
//   // Get the document handle from the page
//   const document = await page.evaluateHandle(() => window.document);
//
//   // Scrape the page
//   const alfaPage = await Playwright.toPage(document);
//
//   const alfaResult = await Audit.run(alfaPage, {
//     outcomes: {
//       exclude: Outcomes.insideSelectorFilter("iframe"),
//     },
//   });
//
//   // Log the result, and upload it to the Siteimprove Intelligence Platform
//   // if credentials have been provided.
//
//   const userName = process.env.SI_USER_EMAIL;
//   const apiKey = process.env.SI_API_KEY;
//
//   if (userName !== undefined && apiKey !== undefined) {
//     // We have credentials, so we can upload results.
//     const url = await SIP.upload(alfaResult, {
//       userName,
//       apiKey,
//       testName: (git) => git.BranchName,
//     });
//
//     Logging.result(alfaResult, url);
//   } else {
//     // We have no credentials and only do local logging.
//     Logging.result(alfaResult);
//   }
//
//   const failingRules = alfaResult.resultAggregates.filter(
//     (aggregate) => aggregate.failed > 0,
//   );
//
//   expect(
//     failingRules.size,
//     `The page has ${failingRules.size} failing rules`,
//   ).toBe(0);
// });
