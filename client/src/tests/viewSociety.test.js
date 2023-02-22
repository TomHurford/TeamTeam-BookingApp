import React from 'react';
import renderer from 'react-test-renderer';
import ViewSociety from '../components/viewSociety';

test('viewSociety snapshot test', () => {
  const component = renderer.create(<ViewSociety />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});