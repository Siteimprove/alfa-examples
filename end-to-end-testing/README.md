# Browser automation testing

This directory demonstrates how Alfa can be connected to:

- [Cypress](cypress);
- [Playwright](playwright);
- [Puppeteer](puppeteer);
- [Webdriver](webdriver).

The tests are run on a full page, and all rules are applied.

Note that the Cypress tests are currently not running due to conflict with the build target, Cypress does not support the latest version of ES.

Note that the Webdriver test are currently not running due to some security settings on chromedriver which doesn't consider the page as a local connection.