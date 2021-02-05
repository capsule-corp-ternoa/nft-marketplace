/* eslint-disable no-console */
import React from 'react';
import { render, screen } from '@testing-library/react';
import FooterSubMenu from './FooterSubMenu';

// Known issue: error and warning does not work for console
// https://github.com/facebook/react/issues/7047
const original = console.error;

beforeEach(() => {
  console.error = jest.fn();
});

afterEach(() => {
  console.error = original;
});

describe('FooterSubMenu', () => {

  it('renders component properly', () => {
    render(<FooterSubMenu subTitle="test" menuElements={[]} />);
    expect(screen.getByText('test')).toBeInTheDocument();
  });

});