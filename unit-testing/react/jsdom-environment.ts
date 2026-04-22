/*
 * Workaround for the missing stuff in JSDOM.
 * This injects in the Jest environment stuff that is normally defined in Node,
 * and that is used by our code or its dependencies.
 *
 * {@link https://github.com/mswjs/mswjs.io/issues/292#issue-1977585807}
 */

import type {
  EnvironmentContext,
  JestEnvironmentConfig,
} from "@jest/environment";

import { TestEnvironment } from "jest-environment-jsdom";

class MyJSDOMEnvironment extends TestEnvironment {
  constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
    super(config, context);

    // here, you have access to regular Node globals, which you can add to the test environment
    this.global.TextEncoder = TextEncoder;
    this.global.TextDecoder = TextDecoder;

    this.global.setImmediate = setImmediate;
    this.global.ReadableStream = ReadableStream;
  }
}

export default MyJSDOMEnvironment;
