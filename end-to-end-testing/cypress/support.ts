import { Cypress } from "@siteimprove/alfa-cypress";

import rules from "@siteimprove/alfa-rules";

chai.use(
  Cypress.createPlugin(rules.default, [
    Cypress.Handler.persist(() => "outcomes/page.spec.json"),
  ])
);
