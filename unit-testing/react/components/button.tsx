import React, { type FunctionComponent } from "react";

interface MyProps {
  children?: React.ReactNode;
}

export const Button: FunctionComponent<MyProps> = ({ children }) => (
  <button className="btn">{children}</button>
);
