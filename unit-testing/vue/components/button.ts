/// <reference lib="dom" />

import Vue from "vue";

/**
 * For some reason, TS struggle with Vue and believe it should be used
 * with a "double default" (`Vue.default.extend`), but JS is perfectly fine
 * with the (correct) `Vue.extend`.
 */

// @ts-ignore
export const EmptyButton = Vue.extend({
  template: `
    <button class="btn"></button>
  `,
});

// @ts-ignore
export const NamedButton = Vue.extend({
  template: `
    <button class="btn">Hello</button>
  `,
});
