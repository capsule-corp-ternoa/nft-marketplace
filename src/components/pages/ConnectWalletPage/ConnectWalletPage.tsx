import React from 'react';
import styled from 'styled-components';
import { H1, P } from '../../common/Title/Title';
import TinyContainer from '../../common/ui-library/TinyContainer/TinyContainer';
import Button from '../../common/ui-library/Button/Button';

const WalletButton = styled(Button)`
  width: 200px;
  margin:10px;
  & i img {
    width: 20px;
  }
`;

const walletsList = [
  { is: 1, label: 'Metamask', img: '/wallets/Metamask.png' },
  { is: 2, label: 'Wallet Connect', img: '/wallets/WalletConnect.png' },
  { is: 3, label: 'Fortmatic', img: '/wallets/Fortmatic.png' },
  { is: 4, label: 'WalletLink', img: '/wallets/WalletLink.png' },
];

const ConnectWalletPage: React.FC = () => (
  <TinyContainer>
    <H1>Connect your wallet</H1>

    <P>
      Connect with one of available wallet providers or create a new wallet.
      <br />
      What is wallet?
    </P>

    <div>
      {walletsList.map( (wallet) => (
        <>
          <WalletButton key={wallet.id}>
            <i>
              <img alt="wallet" src={wallet.img} />
            </i>
            {wallet.label}
          </WalletButton>
          <br />
        </>
      ))}
    </div>

  </TinyContainer>
);

export default ConnectWalletPage;