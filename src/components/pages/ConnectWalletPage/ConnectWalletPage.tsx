/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Context } from '../../../utils/store/store';
import { updateStoreElement } from '../../../utils/store/actions';
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
  { id: 1, label: 'Metamask', img: '/wallets/Metamask.png' },
  { id: 2, label: 'Wallet Connect', img: '/wallets/WalletConnect.png' },
  { id: 3, label: 'Fortmatic', img: '/wallets/Fortmatic.png' },
  { id: 4, label: 'WalletLink', img: '/wallets/WalletLink.png' },
];

const ConnectWalletPage: React.FC = () => {

  const { t } = useTranslation();

  const { dispatch } = useContext(Context);

  
  const connectWallet = () => {
    updateStoreElement(dispatch, 'walletId', '12,450');
  };

  return (
    <TinyContainer style={{ textAlign: 'center' }}>

      <Helmet>
        <title>{t('walletConnection.seo.title')}</title>
        <meta name="description" content={t('walletConnection.seo.description')} />
        <meta name="keywords" content={t('walletConnection.seo.keywords')} />
      </Helmet>

      <H1>{t('walletConnection.title')}</H1>

      <P>
        {t('walletConnection.introduction1')}
        <br />
        {t('walletConnection.introduction2')}
      </P>

      <div>
        {walletsList.map( (wallet) => (
          <>
            <WalletButton onClick={connectWallet} key={wallet.id}>
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
};

export default ConnectWalletPage;