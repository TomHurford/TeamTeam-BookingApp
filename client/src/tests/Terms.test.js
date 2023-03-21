import React from 'react';
import renderer from 'react-test-renderer';
import Terms from '../components/Terms';
// Snapshot test for Terms page
test('Terms snapshot test', () => {
  const component = renderer.create(<Terms />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});