import React from 'react';
import renderer from 'react-test-renderer';
import Login from '../components/Login';
// Snapshot test for Login page
test('Login snapshot test', () => {
  const component = renderer.create(<Login />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});