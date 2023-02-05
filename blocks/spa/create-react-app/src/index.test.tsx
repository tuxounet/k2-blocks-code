import React from "react";
import { render, screen } from "@testing-library/react";


import <%= element %> from "./elements/<%= element %>"
 
test("renders learn react link", () => {
  render(<<%= element %> />);
  const linkElement = screen.getByText(/<%= element %> />/);
  expect(linkElement).toBeInTheDocument();
});
