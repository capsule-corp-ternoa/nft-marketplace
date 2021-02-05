/* eslint-disable no-console */
import React from 'react';
import { render, screen } from '@testing-library/react';
import CreateMultipleCollectiblePage from './CreateMultipleCollectiblePage';

// Known issue: error and warning does not work for console
// https://github.com/facebook/react/issues/7047
const original = console.error;

beforeEach(() => {
  console.error = jest.fn();
});

afterEach(() => {
  console.error = original;
});

describe('CreateMultipleCollectiblePage', () => {

  it('renders component properly', () => {
    render(<CreateMultipleCollectiblePage />);
    expect(screen.getByText('CreateMultipleCollectiblePage')).toBeInTheDocument();
  });

});