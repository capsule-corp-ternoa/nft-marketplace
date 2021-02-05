/* eslint-disable no-console */
import React from 'react';
import { render, screen } from '@testing-library/react';
import MainHeader from './MainHeader';
import ContextProvider from '../../../utils/store/store';

// Known issue: error and warning does not work for console
// https://github.com/facebook/react/issues/7047
const original = console.error;

beforeEach(() => {
  console.error = jest.fn();
});

afterEach(() => {
  console.error = original;
});

const renderMainHeader: React.FC = () => render( 
  <ContextProvider>
    <MainHeader />
  </ContextProvider>
);

describe('MainHeader', () => {

  it('renders component properly', () => {
    renderMainHeader();
    expect(screen.getByText('Ternoa Stamp')).toBeInTheDocument();
  });

});