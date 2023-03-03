import React from "react";
import Navbar from "../components/Navbar";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';

test('Navbar snapshot test', () => {
  const component = renderer.create(
    <BrowserRouter>
      <Navbar/>
    </BrowserRouter>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});