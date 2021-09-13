# Alfa Examples

> :bulb: Curated examples of using Alfa for various kinds of testing

This repository contains examples of how to use [Alfa][] for various kinds of accessibility testing.

## Building

To build the project, a recent version of [Node.js](https://nodejs.org/en/) is required in addition to the [Yarn](https://yarnpkg.com/) package manager. Once installed, login to the `@siteimprove` scope, if you aren't already, to ensure that all dependencies can be fetched:

```sh
yarn npm login --scope siteimprove
```

> :warning: This command must be run from the root of the repository as the registry address of the `@siteimprove` scope is defined in the [local Yarn configuration](.yarnrc.yml).

You will be prompted for your GitHub username and a personal access token. If you don't already have an access token, [generate a new one](https://github.com/settings/tokens/new "Generate a personal access token") with the `read:packages` permission and paste it into the prompt. Once authenticated, do:

```sh
yarn install
```

Next, you can build the project by doing:

```sh
yarn build
```

To start a watcher to build the project as files are changed, do:

```sh
yarn watch
```

[alfa]: https://github.com/Siteimprove/alfa
