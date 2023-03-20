import React from 'react';
import renderer from 'react-test-renderer';
import Privacy from '../components/Privacy';
// Snapshot test for Privacy page
test('Privacy snapshot test', () => {
  const component = renderer.create(<Privacy />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})