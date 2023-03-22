import React from 'react';
import renderer from 'react-test-renderer';
import Footer from '../components/Footer';
import { BrowserRouter } from 'react-router-dom';
// Snapshot test for Footer
test('Footer snapshot test', () => {
  const component = renderer.create(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});