import React from 'react';
import renderer from 'react-test-renderer';
import EventDetails from '../components/Events/EventDetails';
// Snapshot test for EventDetails component
test('EventDetails snapshot test', () => {
  const component = renderer.create(<EventDetails />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
// Unit tests for EventDetails component
test('Event details title is not null', () => {
  const selectedEvent = <EventDetails />;
  expect (selectedEvent.props.title).not.toBeNull();
})

test('Event details description is not null', () => {
  const selectedEvent = <EventDetails />;
  expect (selectedEvent.props.description).not.toBeNull();
});

test('Event details title is not empty', () => {
  const selectedEvent = <EventDetails />;
  expect (selectedEvent.props.title).not.toBe("");
});

test('Event details description is not empty', () => {
  const selectedEvent = <EventDetails />;
  expect (selectedEvent.props.description).not.toBe("");
});

test('Social media icons are not null', () => {
  const selectedEvent = <EventDetails />;
  expect (selectedEvent.props.socials).not.toBeNull();
});

test('Social media icons are not empty', () => {
  const selectedEvent = <EventDetails />;
  expect (selectedEvent.props.socials).not.toBe("");
});


  

