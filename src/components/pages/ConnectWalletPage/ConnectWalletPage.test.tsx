/* eslint-disable no-console */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import ConnectWalletPage from './ConnectWalletPage';
import MainHeader from '../../common/MainHeader/MainHeader';
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

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

jest.mock('../../../utils/store/actions', () => ({
  updateStoreElement: jest.fn(),
}));

describe('ConnectWalletPage snapshots', () => {

  test('ConnectWalletPage renders correctly', () => {
    const tree = renderer
      .create(<ConnectWalletPage />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});

describe('ConnectWalletPage', () => {

  it('renders component properly', () => {
    render(<ConnectWalletPage />);
    expect(screen.getByText('Metamask')).toBeInTheDocument();
    expect(screen.getByText('Wallet Connect')).toBeInTheDocument();
    expect(screen.getByText('Fortmatic')).toBeInTheDocument();
    expect(screen.getByText('WalletLink')).toBeInTheDocument();
  });

  it('Show wallet amount after clicking', () => {
    render(
      <ContextProvider>
        <MainHeader />
        <ConnectWalletPage />
      </ContextProvider>
    );

    const metaMask = screen.getByText('Metamask');
    expect(metaMask).toBeInTheDocument();
    fireEvent.click(metaMask);
    screen.findByText('12,450');

  });

  
});