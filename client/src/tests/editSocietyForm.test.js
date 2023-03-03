import React from 'react';
import renderer from 'react-test-renderer';
import EditSocietyForm from '../components/Societies/EditSocietyForm';

test('EditSocietyForm snapshot test', () => {
  const component = renderer.create(<EditSocietyForm />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});