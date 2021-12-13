# Interacting with a page

Usage:

```shell
yarn test
```

The [page in the fixtures](fixtures/page.html) will be tested. A first audit (of rule [SIA-R69](https://alfa.siteimprove.com/rules/sia-r69)) is run, then text is entered in the input field and submitted, which updates the page, and a second audit is run.

The color contrast error only appears after validating the form, so only in the second audit.