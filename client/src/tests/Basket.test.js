import React from 'react';
import renderer from 'react-test-renderer';
import Basket from '../components/Basket';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';

test('Basket snapshot test', () => {
  <Router>
  const component = renderer.create(<Basket availableTicketTypes={[]}/>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  </Router>
});

// test('Basket with tickets snapshot test', () => {
//   const component = renderer.create(<Basket 
//   tickets={[{"ticket":{"name":"porro dolores magni","type":"PAID","price":10},"id":0}]} 
//   totalPrice={10}
//   />);
//   const tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });

// test('Clicking remove button calls removeTicket function', () => {
//   const mock = jest.fn();
//   render(<Basket 
//   tickets={[{"ticket":{"name":"porro dolores magni","type":"PAID","price":10},"id":0}]} 
//   totalPrice={10}
//   removeTicket={mock}
//   />);
//   const removeButton = screen.getByTestId('remove-button');
//   userEvent.click(removeButton);
//   expect(mock).toHaveBeenCalled();
// });