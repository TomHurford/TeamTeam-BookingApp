import React from "react";
import renderer from "react-test-renderer";
import SearchSocieties from "../components/searchSocieties";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

test("SearchSocieties snapshot test", () => {
  const component = renderer.create(
    <BrowserRouter>
      <SearchSocieties />
    </BrowserRouter>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});