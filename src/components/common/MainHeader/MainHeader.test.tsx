/* eslint-disable no-console */
import React from 'react';
import { render, screen } from '@testing-library/react';
import MainHeader from './MainHeader';

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

const renderMainHeader: React.FC = () => render( 
  <MainHeader />
);

describe('MainHeader', () => {

  it('renders component properly', () => {
    renderMainHeader();
    expect(screen.getByText('Ternoa Stamp')).toBeInTheDocument();
  });

});