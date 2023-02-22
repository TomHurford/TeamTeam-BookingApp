import React from 'react';
import renderer from 'react-test-renderer';
import EventDetails from '../components/Events/EventDetails';

test('EventDetails snapshot test', () => {
  const component = renderer.create(<EventDetails />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});