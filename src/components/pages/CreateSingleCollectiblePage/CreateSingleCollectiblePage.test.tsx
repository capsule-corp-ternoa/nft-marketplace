/* eslint-disable no-console */
import React from 'react';
import { render, screen } from '@testing-library/react';
import CreateSingleCollectiblePage from './CreateSingleCollectiblePage';

// Known issue: error and warning does not work for console
// https://github.com/facebook/react/issues/7047
const original = console.error;

beforeEach(() => {
  console.error = jest.fn();
});

afterEach(() => {
  console.error = original;
});

describe('CreateSingleCollectiblePage', () => {

  it('renders component properly', () => {
    render(<CreateSingleCollectiblePage />);
    expect(screen.getByText('Create single collectible')).toBeInTheDocument();

    // TODO test all fields
    // const transaction = screen.getByLabelText('create_name');
    // expect(transaction).toHaveValue('');
    // fireEvent.change(transaction, { target: { value: 'name' } });
    // expect(transaction).toHaveValue('name');
  });

});