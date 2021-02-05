/* eslint-disable no-console */
import React from 'react';
import { render, screen } from '@testing-library/react';
import InputBox, { InputType } from './InputBox';

// Known issue: error and warning does not work for console
// https://github.com/facebook/react/issues/7047
const original = console.error;

beforeEach(() => {
  console.error = jest.fn();
});

afterEach(() => {
  console.error = original;
});

describe('InputBox', () => {

  it('renders component properly', () => {
    render(<InputBox 
      inputType={InputType.Standard}
      label="my label"
      key="test"
      subTitle="test"
    />);
    expect(screen.getByText('my label')).toBeInTheDocument();
  });

});