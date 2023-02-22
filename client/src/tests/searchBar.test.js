import React from 'react';
import renderer from 'react-test-renderer';
import SearchBar from '../components/searchBar';

test('searchBar snapshot test', () => {
  const component = renderer.create(<SearchBar />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});