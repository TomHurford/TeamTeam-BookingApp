import React from 'react';
import renderer from 'react-test-renderer';
import About from '../components/About';

test('About snapshot test', () => {
  const component = renderer.create(<About />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});