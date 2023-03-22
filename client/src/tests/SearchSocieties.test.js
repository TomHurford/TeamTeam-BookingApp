import React from "react";
import renderer from "react-test-renderer";
import SearchSocieties from "../components/Societies/SearchSocieties";
import { BrowserRouter } from "react-router-dom";
// Snapshot test for searching societies
test("SearchSocieties snapshot test", () => {
  const component = renderer.create(
    <BrowserRouter>
      <SearchSocieties />
    </BrowserRouter>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});