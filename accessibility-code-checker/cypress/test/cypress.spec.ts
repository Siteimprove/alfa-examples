import { Cypress as AlfaCypress } from "@siteimprove/alfa-cypress";
import { Audit } from "@siteimprove/alfa-test-utils";

it("should be accessible", () => {
  // Navigate to the local web page
  // This supposes that the server is already running. See the demo-site folder.
  // TODO: Replace with your own page
  cy.visit("http://localhost:5173");

  // wait for the page to fully load, here by waiting for a specific selector
  // TODO: Adapt with what is present in your own page
  cy.get(".testimonials-top").should("exist");

  /*
   * Usual Cypress instructions can live here.
   * For example, navigating through the page, opening menus or modals, etc.
   */

  const audit = cy
    // Get the document from the page
    .document()
    // Scrape the page
    .then(AlfaCypress.toPage)
    // Run the audit
    .then(Audit.run)
    // Upload and log the results.
    // Note: this has to happen in NodeJS, not in Cypress browser, hence we use
    // a cy.task call.
    .then(async (alfaResult) => {
      cy.task("report", alfaResult.toJSON());
      return alfaResult;
    });

  // Fail the test if any rule is failing
  // Note: this happens in a separate chain to avoid interfering with the
  // reporting.
  audit.then(async (alfaResult) => {
    const failingRules = alfaResult.resultAggregates.filter(
      (aggregate) => aggregate.failed > 0,
    );

    // Fail the test if any rule failed.
    expect(failingRules.size).to.equal(
      0,
      `The page has ${failingRules.size} failing rules`,
    );
  });
});
