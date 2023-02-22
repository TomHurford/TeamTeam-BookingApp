import React from 'react';
import renderer from 'react-test-renderer';
import Event from '../components/Events/Event';
import { getEventById } from '../utils/events';

test('Event snapshot test', () => {
  const component = renderer.create(<Event specificEvent={getEventById(1)}/>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});