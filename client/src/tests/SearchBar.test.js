import React from 'react';
import renderer from 'react-test-renderer';
import SearchBar from '../components/common/Searchbar';

test('SearchBar snapshot test', () => {
  const component = renderer.create(<SearchBar />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});