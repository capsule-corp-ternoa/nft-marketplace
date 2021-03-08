/* eslint-disable no-console */
import React from 'react';
import { render, screen } from '@testing-library/react';
import CreateSingleOrMultiplePage from './CreateSingleOrMultiplePage';

// Known issue: error and warning does not work for console
// https://github.com/facebook/react/issues/7047
const original = console.error;

beforeEach(() => {
  console.error = jest.fn();
});

afterEach(() => {
  console.error = original;
});

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

describe('CreateSingleOrMultiplePage', () => {

  it('renders component properly', () => {
    render(
      
      <CreateSingleOrMultiplePage />

    );
    expect(screen.getByText('upload.title')).toBeInTheDocument();

    // TODO test all fields
    // const transaction = screen.getByLabelText('create_name');
    // expect(transaction).toHaveValue('');
    // fireEvent.change(transaction, { target: { value: 'name' } });
    // expect(transaction).toHaveValue('name');
  });

});