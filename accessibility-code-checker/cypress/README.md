# Accessibility Code Checker - Cypress integration

This workspace demonstrate how to integrate Siteimprove's Accessibility Code Checker with Playwright.

## Setup

See [the generic instructions](../README.md#setup) for setting up the project.

## Cypress

Cypress runs all of its tests in its own Javascript world, which makes things a bit harder to report on the finding (e.g., console logging should occur in the NodeJS world). This is done through the `cy.task()` call, but requires a bit of setup:
* The reporting capacities are defined in the [cypress.config.ts](./cypress.config.ts) file. This can be added to any existing Cypress configuration file.
* The tests are runs from the [test/cypress.spec.ts](./test/cypress.spec.ts) file.