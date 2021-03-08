/* eslint-disable no-console */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
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

describe('ConnectWalletPage snapshots', () => {

  test('ConnectWalletPage renders correctly', () => {
    const setWalletId = jest.fn();

    const tree = renderer
      .create(<ConnectWalletPage setWalletId={setWalletId} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});

describe('ConnectWalletPage', () => {

  it('renders component properly', () => {
    const setWalletId = jest.fn();
    render(<ConnectWalletPage setWalletId={setWalletId} />);
    expect(screen.getByText('Metamask')).toBeInTheDocument();
    expect(screen.getByText('Wallet Connect')).toBeInTheDocument();
    expect(screen.getByText('Fortmatic')).toBeInTheDocument();
    expect(screen.getByText('WalletLink')).toBeInTheDocument();
  });

  it('Show wallet amount after clicking', () => {
    const setWalletId = jest.fn();
    render( <ConnectWalletPage setWalletId={setWalletId} />);

    const metaMask = screen.getByText('Metamask');
    expect(metaMask).toBeInTheDocument();
    fireEvent.click(metaMask);
    expect(setWalletId.mock.calls.length).toBe(1);

  });

  
});