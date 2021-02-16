/* eslint-disable no-console */
import React from 'react';
import { render, screen } from '@testing-library/react';
import ConnectWalletPage from './ConnectWalletPage';

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

describe('ConnectWalletPage', () => {

  it('renders component properly', () => {
    render(<ConnectWalletPage />);
    expect(screen.getByText('Metamask')).toBeInTheDocument();
    expect(screen.getByText('Wallet Connect')).toBeInTheDocument();
    expect(screen.getByText('Fortmatic')).toBeInTheDocument();
    expect(screen.getByText('WalletLink')).toBeInTheDocument();
  });

});