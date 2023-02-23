import React from 'react';
import renderer from 'react-test-renderer';
import Paypal from '../components/Paypal';

test('Paypal snapshot test', () => {
  const component = renderer.create(<Paypal />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});