import React from 'react';
import renderer from 'react-test-renderer';
import Event from '../components/Events/Event';
import { getEventById } from '../utils/EventsLogic';
import { getByTestId, render } from '@testing-library/react';
// Snapshot test for an Event
test('Event snapshot test', () => {
  const EventDetails = {
    "date": "2023-12-02T00:00:00.000Z",
    "society": {
      "name": "Society Name",
    },
    "description": "Event 1 description",
    "name": "Event 1",
    "location": "Event 1 location",
  }
  const component = renderer.create(<Event specificEvent={EventDetails}/>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
