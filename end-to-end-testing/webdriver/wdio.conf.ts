// Knip is somehow unhappy about the use of import.meta.url, not being able to
// detect that this should be a module. So, keeping the old way.

import * as path from "node:path";
import * as url from "node:url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const __dirname = import.meta.dirname;

export const config: WebdriverIO.Config = {
  runner: "local",
  path: "/",
  specs: ["./test/**/*.spec.js"],
  capabilities: [{ browserName: "chrome" }],
  logLevel: "info",
  baseUrl: "http://localhost",
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  services: ["chromedriver"],
  framework: "mocha",
  reporters: ["spec"],
  outputDir: __dirname,
};
