import React from 'react';
import renderer from 'react-test-renderer';
import EditSocietyForm from '../components/Societies/EditSocietyForm';
// Snapshot test for the form to edit a society
test('EditSocietyForm snapshot test', () => {
  const component = renderer.create(<EditSocietyForm />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});