/**
 * Workaround for the missing `TextEncoder` and `crypto` in JSDOM.
 *
 * {@link https://github.com/mswjs/mswjs.io/issues/292#issue-1977585807}
 */

import crypto from "node:crypto";

import type {
  EnvironmentContext,
  JestEnvironmentConfig,
} from "@jest/environment";

import JSDOMEnvironment from "jest-environment-jsdom";

class MyJSDOMEnvironment extends JSDOMEnvironment.default {
  constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
    super(config, context);

    // here, you have access to regular Node globals, which you can add to the test environment
    this.global.TextEncoder = TextEncoder;

    // @ts-ignore
    this.global.crypto = crypto;
    this.global.crypto.randomUUID = crypto.randomUUID;
  }
}

export default MyJSDOMEnvironment;
