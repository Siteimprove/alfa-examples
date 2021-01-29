import * as alfa from "@siteimprove/alfa-cypress";

import rules from "@siteimprove/alfa-rules";

alfa.Cypress.createPlugin(rules, [
  alfa.Cypress.Handler.persist(() => "outcomes/page.spec.json"),
]);
