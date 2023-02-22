import React from 'react';
import renderer from 'react-test-renderer';
import Pagination from '../components/pagination';

test('pagination snapshot test', () => {
  const component = renderer.create(<Pagination />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});