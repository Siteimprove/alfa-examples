import type { FunctionComponent } from "react";

export const Button: FunctionComponent = ({ children }) => (
  <button className="btn">{children}</button>
);
