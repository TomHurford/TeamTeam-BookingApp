import React from 'react';
import renderer from 'react-test-renderer';
import Login from '../components/Login';

test('Login snapshot test', () => {
  const component = renderer.create(<Login />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});