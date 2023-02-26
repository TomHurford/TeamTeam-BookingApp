import React from 'react';
import renderer from 'react-test-renderer';
import Event from '../components/Events/Event';
import { getEventById } from '../utils/EventsLogic';
import { getByTestId, render } from '@testing-library/react';

test('Event snapshot test', () => {
  const component = renderer.create(<Event specificEvent={getEventById(1)}/>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Event is defined', () => {
  const {getByTestId} = render(<Event specificEvent={{
  "id": 1,
  "name": "Event 1",
  "description": "Event 1 description",
  "date": "2023-12-02T00:00:00.000Z",
  "location": "Event 1 location"
  }}/>);
  const event = getByTestId('eventCardID');
  expect(event).toBeDefined();
});

test('Event component renders 4 elements', () => {
  const {getByTestId} = render(<Event specificEvent= {{
    "id": 1,
    "name": "Event 1",
    "description": "Event 1 description",
    "date": "2023-12-02T00:00:00.000Z",
    "location": "Event 1 location"
  }}/>);
  const event = getByTestId('eventCardID');
  expect(event.children.length).toBe(4);
});

test('Event name is correct', () => {
  const {getByTestId} = render(<Event specificEvent={{
    "id": 1,
    "name": "Event 1",
    "description": "Event 1 description",
    "date": "2023-12-02T00:00:00.000Z",
    "location": "Event 1 location"
  }}/>);

  const eventName = getByTestId('eventNameID');
  expect(eventName.textContent).toBe("Event 1");
});

test('Event description is correct', () => {
  const {getByTestId} = render(<Event specificEvent={{
    "id": 1,
    "name": "Event 1",
    "description": "Event 1 description",
    "date": "2023-12-02T00:00:00.000Z",
    "location": "Event 1 location"
  }}/>);
  const eventDescription = getByTestId('eventDescriptionID');
  expect (eventDescription.textContent).toBe("Event 1 description");
});

test('Event date is correct', () => {
  const {getByTestId} = render(<Event specificEvent={{
    "id": 1,
    "name": "Event 1",
    "description": "Event 1 description",
    "date": "2023-12-02T00:00:00.000Z",
    "location": "Event 1 location"
  }}/>);
  const eventDate = getByTestId('eventDateID');
  expect (eventDate.textContent).toBe("2023-12-02T00:00:00.000Z");
});

test('Event location is correct', () => {
  const {getByTestId} = render(<Event specificEvent={{
    "id": 1,
    "name": "Event 1",
    "description": "Event 1 description",
    "date": "2023-12-02T00:00:00.000Z",
    "location": "Event 1 location"
  }}/>);
  const eventLocation = getByTestId('eventLocationID');
  expect (eventLocation.textContent).toBe("Event 1 location");
});










