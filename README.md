# Alfa Examples

> :bulb: Curated examples of using Alfa for various kinds of testing

This repository contains examples of how to use [Alfa][] for various kinds of accessibility testing.

## Building

To build the project, a recent version of [Node.js](https://nodejs.org/en/) is required in addition to the [Yarn](https://yarnpkg.com/) package manager. Once installed, login to the `@siteimprove` scope, if you aren't already, to ensure that all dependencies can be fetched:

```sh
yarn npm login --scope siteimprove
```

> :warning: This command must be run from the root of the repository as the registry address of the `@siteimprove` scope is defined in the [local Yarn configuration](.yarnrc.yml).

You will be prompted for your GitHub username and a personal access token. If you don't already have an access token, [generate a new one](https://github.com/settings/tokens/new "Generate a personal access token") with the `read:packages` permission and paste it into the prompt.


>- **If that does not work** run
>  ```
>  yarn config set --home "npmRegistries['https://npm.pkg.github.com'].npmAuthToken" <your-token>
>  ```
>  It will create a file `.yarnrc.yml` on your machine. This is a private file for your user, only. It will most likely be saved in a path like `C:\Users\<username>\.yarnrc.yml`
>
> - **If that fails** and the file content is different than the below code then you can manually update the file. MAKE SURE to edit your own `.yarnrc.yml` file, not the one in this repository. The reason is because your `npmAuthTokens` should never be committed to a shared repository - keep it secret on your local machine.
>
>    ```
>    npmRegistries:
>      "https://npm.pkg.github.com":
>        npmAuthToken: <your-token>
>
>    npmScopes:
>      siteimprove:
>        npmAuthToken: <your-token>
>    ```

 Once authenticated, do:  
  
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

## Examples

This repository contains examples of using Alfa:

- For individual [component testing](unit-testing) with various component frameworks;
- For [page-wide testing](end-to-end-testing) with various browser automations;
- For [custom testing](custom-testing) of some common scenarios.

## License

Copyright &copy; [Siteimprove A/S](https://siteimprove.com/). Released under the terms of the [MIT license](LICENSE.md).

[alfa]: https://github.com/Siteimprove/alfa
