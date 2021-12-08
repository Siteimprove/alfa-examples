import { Component } from "@angular/core";

@Component({
  selector: "empty-btn",
  template: `<button class="btn"></button>`,
})
export class EmptyButtonComponent {}

@Component({
  selector: "named-btn",
  template: `<button class="btn">Hello</button>`,
})
export class NamedButtonComponent {}
