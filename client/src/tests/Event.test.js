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

test('Event component renders both the image card and the society', () => {
  const {getByTestId} = render(<Event specificEvent= {{
    "id": 1,
    "name": "Event 1",
    "description": "Event 1 description",
    "date": "2023-12-02T00:00:00.000Z",
    "location": "Event 1 location"
  }}/>);
  const event = getByTestId('eventCardID');
  expect(event.children.length).toBe(2);
  expect(event.children[0].className).toBe("imageCard");
  expect(event.children[1].className).toBe("society");
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

test('Event location and date is correct', () => {
  const {getByTestId} = render(<Event specificEvent={{
    "id": 1,
    "name": "Event 1",
    "description": "Event 1 description",
    "date": "2023-12-02T00:00:00.000Z",
    "location": "Event 1 location "
  }}/>);
  const eventLocation = getByTestId('eventLocationTimeID');
  expect (eventLocation.textContent).toBe("Event 1 location  2023-12-02T00:00:00.000Z");
});

test('Event society name is correct', () => {
  const {getByTestId} = render(<Event specificEvent={{
    "id": 1,
    "name": "Event 1",
    "description": "Event 1 description",
    "date": "2023-12-02T00:00:00.000Z",
    "location": "Event 1 location",
  }}/>);
  const eventSocietyId = getByTestId('eventSocietyNameID');
  expect (eventSocietyId.textContent).toBe("Society Name");
});

test('Event image is correct', () => {
  const {getByTestId} = render(<Event specificEvent={{
    "id": 1,
    "name": "Event 1",
    "description": "Event 1 description",
    "date": "2023-12-02T00:00:00.000Z",
    "location": "Event 1 location",
    "banner": "https://www.google.com"
  }}/>);
  const eventImage = getByTestId('eventImageID');
  expect (eventImage.style.backgroundImage).toBe("url(https://www.google.com)");
});









