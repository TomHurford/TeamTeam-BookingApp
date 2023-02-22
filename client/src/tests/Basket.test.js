import React from 'react';
import renderer from 'react-test-renderer';
import Basket from '../components/Basket';

test('Basket snapshot test', () => {
  const component = renderer.create(<Basket />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});