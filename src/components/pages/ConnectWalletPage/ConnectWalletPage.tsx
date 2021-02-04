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
  { label: 'Metamask', img: '/wallets/Metamask.png' },
  { label: 'Wallet Connect', img: '/wallets/WalletConnect.png' },
  { label: 'Fortmatic', img: '/wallets/Fortmatic.png' },
  { label: 'WalletLink', img: '/wallets/WalletLink.png' },
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
          <WalletButton key="df">
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