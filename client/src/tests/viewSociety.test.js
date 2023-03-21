import React from 'react';
import renderer from 'react-test-renderer';
import ViewSociety from '../components/Societies/ViewSociety';
import { BrowserRouter } from 'react-router-dom';
// Snapshot test for viewing societies
test('ViewSociety snapshot test', () => {
  const component = renderer.create(
    <BrowserRouter>
      <ViewSociety />
    </BrowserRouter>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});