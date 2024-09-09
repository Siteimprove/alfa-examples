# Browser automation testing

This directory demonstrates how Alfa can be connected to:

- [Cypress](cypress);
- [Playwright](playwright);
- [Puppeteer](puppeteer);
- [Webdriver](webdriver).

The tests are run on a full page, and all rules are applied.

Note that the Puppeteer tests are currently not running due to some problem in the Ubuntu runner with Mocha syntax (seems to be fine in Powershell).

Note that the Webdriver test are currently not running due to some security settings on chromedriver which doesn't consider the page as a local connection.