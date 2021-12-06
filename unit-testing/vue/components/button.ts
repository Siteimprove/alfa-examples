/// <reference lib="dom" />

import Vue from "vue";

export const EmptyButton = Vue.extend({
  template: `
    <button class="btn"></button>
  `,
});

export const NamedButton = Vue.extend({
  template: `
    <button class="btn">Hello</button>
  `,
});
