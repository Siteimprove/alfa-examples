/**
 * {@link https://github.com/mswjs/mswjs.io/issues/292#issue-1977585807}
 */

import type {
  EnvironmentContext,
  JestEnvironmentConfig,
} from "@jest/environment";

import JSDOMEnvironment from "jest-environment-jsdom";

export class MyJSDOMEnvironment extends JSDOMEnvironment.default {
  constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
    super(config, context);

    // here, you have access to regular Node globals, which you can add to the test environment
    this.global.TextEncoder = TextEncoder;
  }
}

export default MyJSDOMEnvironment;
