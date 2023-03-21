import React from 'react';
import renderer from 'react-test-renderer';
import Contact from '../components/Contact';
//Snapshot test for Contact page
test('Contact snapshot test', () => {
  const component = renderer.create(<Contact />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});