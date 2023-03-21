import React from 'react';
import App from '../components/App';
import { BrowserRouter } from "react-router-dom";
import renderer from 'react-test-renderer';
// Snapshot test for App
test('App snapshot test', () => {
  const component = renderer.create(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});