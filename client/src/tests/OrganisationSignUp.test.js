import React from "react";
import renderer from "react-test-renderer";
import OrganisationSignUp from "../components/orgManagement/OrganisationSignUp";

test("OrganisationSignUp snapshot test", () => {
  const component = renderer.create(<OrganisationSignUp />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});