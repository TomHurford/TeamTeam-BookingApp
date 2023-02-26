import React from 'react';
import renderer from 'react-test-renderer';
import PayPal from '../components/PayPal';

test('Paypal snapshot test', () => {
  const component = renderer.create(<PayPal />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});