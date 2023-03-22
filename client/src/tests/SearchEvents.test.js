import renderer from 'react-test-renderer';
import React from 'react';
import SearchEvents from '../components/Events/SearchEvents';
// Snapshot test for searching events
test('SearchEvents snapshot test', () => {
  const component = renderer.create(<SearchEvents />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});