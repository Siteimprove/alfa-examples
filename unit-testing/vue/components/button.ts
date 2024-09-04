/// <reference lib="dom" />

import Vue from "vue";

export const EmptyButton = Vue.default.extend({
  template: `
    <button class="btn"></button>
  `,
});

export const NamedButton = Vue.default.extend({
  template: `
    <button class="btn">Hello</button>
  `,
});
