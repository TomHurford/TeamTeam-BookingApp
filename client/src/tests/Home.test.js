import React from 'react';
import renderer from 'react-test-renderer';
import Home from '../components/Home';
import { render, screen } from '@testing-library/react';


test('Home snapshot test', () => {
  const component = renderer.create(<Home />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('check render of search bar', () => {
    render(<Home />);
    const searchBar = screen.getByTestId('search-bar');
    expect(searchBar).toBeInTheDocument();
});

test('render Home component', () => {
    render(<Home />);
    const homeElement = screen.getByTestId('home-component');
    expect(homeElement).toBeInTheDocument();
}); 

test('check welcome message', () => {
    render(<Home />);
    const welcomeElement = screen.getByTestId('welcome-message');
    expect (welcomeElement).toHaveTextContent('Welcome to Ticketopia!');
    expect(welcomeElement).toBeInTheDocument();
});

test('list of events render on home page', () => {
    render(<Home />);
    const eventsList = screen.getByTestId('events-list');
    expect(eventsList).toBeInTheDocument();  
});


