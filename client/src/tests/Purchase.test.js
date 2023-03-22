import React from 'react';
import renderer from 'react-test-renderer';
import Purchase from '../components/Purchase';
// Snapshot test for Purchase page
test('Purchase snapshot test', () => {
  const component = renderer.create(<Purchase />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});