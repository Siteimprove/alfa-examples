import { Cypress as AlfaCypress } from "@siteimprove/alfa-cypress";
import { Audit } from "@siteimprove/alfa-test-utils/audit";

it("should be accessible", () => {
  cy.visit("http://localhost:5173");

  cy.get(".testimonials-top").should("exist");

  const audit = cy
    .document()
    .then(AlfaCypress.toPage)
    .then(Audit.run)
    .then(async (alfaResult) => {
      cy.task("report", alfaResult.toJSON());
      return alfaResult;
    });

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
