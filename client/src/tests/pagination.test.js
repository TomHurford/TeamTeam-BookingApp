import React from 'react';
import renderer from 'react-test-renderer';
import Pagination from '../components/common/Pagination';
// Snapshot test for Pagination
test('Pagination snapshot test', () => {
  const component = renderer.create(<Pagination />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});