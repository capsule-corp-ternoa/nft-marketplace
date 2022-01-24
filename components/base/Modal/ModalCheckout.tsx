import React from 'react';
import styled from 'styled-components';
import ClickAwayListener from 'react-click-away-listener';

import Avatar, { AVATAR_VARIANT_CHECKOUT } from 'components/base/Avatar';
import NftCard from 'components/base/NftCard';
import Button from 'components/ui/Button';
import Icon from 'components/ui/Icon';
import { NftType, UserType } from 'interfaces';
import { computeCaps, computeTiime } from 'utils/strings';

export interface ModalCheckoutProps {
  NFT: NftType;
  setExpanded: (b: boolean) => void;
  setModalBuyExpanded: (b: boolean) => void;
  user: UserType;
}

const ModalCheckout: React.FC<ModalCheckoutProps> = ({ setExpanded, setModalBuyExpanded, NFT, user }) => {
  const { creatorData, price, priceTiime, title } = NFT;
  const isCapsPrice = Number(price) > 0;
  const isTiimePrice = Number(priceTiime) > 0;

  return (
    <SBackground>
      <ClickAwayListener onClickAway={() => setExpanded(false)}>
        <SContainer>
          <STop>
            <SCloseIconContainer onClick={() => setExpanded(false)}>
              <Icon name="close" />
            </SCloseIconContainer>
            <STitle>Checkout</STitle>
          </STop>

          <SSection>
            <SNftCardContainer>
              <NftCard item={NFT} />
            </SNftCardContainer>
            <SDetailsWrapper>
              <STitle>{title}</STitle>
              {creatorData && (
                <SAvatarContainer>
                  <Avatar
                    isClickable
                    isVerified={creatorData.verified}
                    name={creatorData.name}
                    picture={creatorData.picture}
                    variant={AVATAR_VARIANT_CHECKOUT}
                    walletId={creatorData.walletId}
                  />
                </SAvatarContainer>
              )}
            </SDetailsWrapper>
          </SSection>

          <SPricingContainer>
            {isCapsPrice && (
              <SPrice>
                <STokenAmount>{computeCaps(Number(price))}</STokenAmount>
                <STokenUnit>CAPS</STokenUnit>
              </SPrice>
            )}
            {isCapsPrice && isTiimePrice && <SSeparatorLabel>OR</SSeparatorLabel>}
            {isTiimePrice && (
              <SPrice>
                <STokenAmount>{computeTiime(Number(priceTiime))}</STokenAmount>
                <STokenUnit>TIIME</STokenUnit>
              </SPrice>
            )}

            <SSeparatorLine />
            <STransactionInfosContainer>
              <SInsight>Your balance</SInsight>
              <SInsight>{user?.capsAmount ? computeCaps(Number(user.capsAmount)) : 0} CAPS</SInsight>
            </STransactionInfosContainer>
          </SPricingContainer>

          <SButtonsContainer>
            <SConfirmButton
              color="primary"
              onClick={() => {
                setModalBuyExpanded(true);
                setExpanded(false);
              }}
              size="medium"
              text="Proceed to payment"
              variant="contained"
            />
            <Button
              color="contrast"
              onClick={() => setExpanded(false)}
              size="medium"
              text="Cancel"
              variant="contained"
            />
          </SButtonsContainer>
        </SContainer>
      </ClickAwayListener>
    </SBackground>
  );
};

const SBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 1000;
`;

const SContainer = styled.div`
  width: 48rem;
  height: 100vh;
  top: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.contrast};
  color: ${({ theme }) => theme.colors.invertedContrast};
  padding: 4rem 3.2rem;
  overflow-y: auto;
`;

const SSection = styled.div`
  margin: 12rem 0 0;
  display: flex;
  width: 100%;
`;

const STop = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const SCloseIconContainer = styled.div`
  cursor: pointer;
  fill: ${({ theme }) => theme.colors.invertedContrast};
  width: 2.4rem;
  margin-top: 0.4rem;
`;

const SDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 1.6rem;
`;

const SNftCardContainer = styled.div`
  flex-shrink: 0;
`;

const STitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 3.2rem;
  margin: 0;
`;

const SAvatarContainer = styled.div`
  margin-top: 0.8rem;
`

const SPricingContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 8.8rem;
`;

const STransactionInfosContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const SPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 0.4rem;
`;

const STokenAmount = styled.div`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 3.2rem;
  text-transform: uppercase;
`;

const STokenUnit = styled.div`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 3.2rem;
  text-transform: uppercase;
`;

const SSeparatorLabel = styled.div`
  padding: 0.8rem 0;
`;

const SSeparatorLine = styled.div`
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.colors.invertedContrast};
  margin-top: 1.6rem;
  margin-bottom: 2.4rem;
  width: 100%;
`;

const SInsight = styled.div`
  font-size: 1.6rem;
`;

const SButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 3.2rem;

  > * {
    &:not(:first-child) {
      margin-top: 1.6rem;
    }
  }
`;

const SConfirmButton = styled(Button)`
  border-color: ${({ theme }) => theme.colors.primary};

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.invertedContrast};
  }
`;

export default ModalCheckout;
