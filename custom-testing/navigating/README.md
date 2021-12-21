# Navigating between pages

Usage:

```shell
yarn test
```

The [first page in the fixtures](fixtures/page1.html) will be tested. A first audit (of rule [SIA-R69](https://alfa.siteimprove.com/rules/sia-r69)) is run, then text the link is clicked to go to the [second page](fixtures/page2.html) which is also audited.

The color contrast error only appears in the second page, so only in the second audit.