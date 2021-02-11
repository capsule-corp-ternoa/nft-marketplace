/* eslint-disable no-console */
import React from 'react';
import { render, screen } from '@testing-library/react';
import CreateCollectiblePage from './CreateCollectiblePage';

// Known issue: error and warning does not work for console
// https://github.com/facebook/react/issues/7047
const original = console.error;

beforeEach(() => {
  console.error = jest.fn();
});

afterEach(() => {
  console.error = original;
});

describe('CreateCollectiblePage', () => {

  it('renders component properly', () => {
    render(<CreateCollectiblePage />);
    expect(screen.getByText('Single')).toBeInTheDocument();
    expect(screen.getByText('Multiple')).toBeInTheDocument();
  });

  // TODO add test to simulate click to next page with

});