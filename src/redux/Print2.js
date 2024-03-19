import React from "react";
import { screen, render } from "@testing-library/react";
import Print from "./Print";
import "@testing-library/jest-dom";
test("has correct welcome text", () => {
  render(<Print />);
  expect(screen.getByRole("heading")).toHaveTextContent("Welcome");
});
