# Accessibility Code Checker

These workspaces demonstrate how to use Siteimprove's Accessibility Code Checker with various browser automations.

You can clone this repository to have a working setup on your local computer from which you can easily experiment.

## Setup

From [the top-level of the repository](..), install dependencies and build the project:

```bash
$ yarn install
$ yarn build
```

## Starting the server

From [the top-level of the repository](..), start the server:

```bash
$ yarn code-checker:start
```

This will start a local server on `localhost:5173`. The associated code lives in the [demo-page](./demo-page) workspace. The server will watch any changes, so you can edit the page and see the results. Note that the page is voluntarily inaccessible since it is used to demonstrate how the Accessibility Code Checker can help you find accessibility issues.

## Running the Accessibility Code Checker

From another terminal at [the top-level of the repository](..), run the Accessibility Code Checker:

```bash
$ yarn code-checker:test
```

> **Note:** these tests are expected to fail since the demo page is intentionally inaccessible.

This will run the Accessibility Code Checker for all the existing integrations, namely:
* [Cypress](./cypress)
* [Playwright](./playwright)

If you which to only run for one of them, run, e.g.:

```bash
$ yarn workspace code-checker-playwright test
```

The examples are reading credentials for the Siteimprove Intelligence Platform from the environment variables `SI_USER_EMAIL` and `SI_API_KEY`. See [the associated documentation](https://alfa.siteimprove.com/code-checker/getting-started/reporting#sip) for how to create an API key for the Siteimprove Intelligence Platform.

If no credentials are provided, a summary of the results will be logged in the console.

## Experimenting

Each workspace in this directory contains one full example of integration. Among other, you can change the page URL to try the Accessibility Code Checker on a different page. 