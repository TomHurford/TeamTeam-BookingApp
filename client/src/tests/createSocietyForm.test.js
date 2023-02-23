import React from 'react';
import renderer from 'react-test-renderer';
import CreateSocietyForm from '../components/Societies/CreateSocietyForm';

test('CreateSocietyForm snapshot test', () => {
  const component = renderer.create(<CreateSocietyForm />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});