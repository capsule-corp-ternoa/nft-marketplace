import React from 'react';
import styled from 'styled-components';

import Icon from 'components/ui/Icon';
import { Container, Wrapper } from 'components/layout';

const Footer = () => {
  const twitterLink = process.env.NEXT_PUBLIC_TWITTER_LINK || 'https://twitter.com/SecretNFT_';
  const instagramLink = process.env.NEXT_PUBLIC_INSTAGRAM_LINK || 'https://www.instagram.com/ternoa_/';

  return (
    <SFooterContainer>
      <SFooterWrapper>
        <SLegalsContainer>
          <SLabel>{process.env.NEXT_PUBLIC_APP_NAME || '© SECRET NFT'}</SLabel>
          <SLabel>All rights reserved</SLabel>
          <SLink
            href="https://ternoahelp.zendesk.com/hc/fr/articles/4409410791185-Terms-of-use"
            target="_blank"
            rel="noreferrer noopener"
          >
            Terms
          </SLink>
          <SLink
            href="https://ternoahelp.zendesk.com/hc/fr/articles/4409410776337-Privacy-Policy"
            target="_blank"
            rel="noreferrer noopener"
          >
            Privacy
          </SLink>
        </SLegalsContainer>
        <SSocialsContainer>
          {twitterLink !== 'false' && (
            <a href={twitterLink} target="_blank">
              <SMediaIcon name="socialTwitter" />
            </a>
          )}
          {instagramLink !== 'false' && (
            <a href={instagramLink} target="_blank">
              <SMediaIcon name="socialInstagram" />
            </a>
          )}
        </SSocialsContainer>
      </SFooterWrapper>
    </SFooterContainer>
  );
};

const SFooterContainer = styled(Container)`
  width: 100%;
  background: ${({ theme }) => theme.colors.contrast};
`;

const SFooterWrapper = styled(Wrapper)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12rem !important;
  padding-top: 2.4rem !important;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-bottom: 2.4rem !important;
  }
`;

const SLegalsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    > * {
      &:not(:first-child) {
        margin-left: 1.6rem;
      }
    }
  }
`;

const SLabel = styled.span`
  color: ${({ theme }) => theme.colors.neutral200};
  font-size: 1.6rem;
`;

const SLink = styled.a`
  color: ${({ theme }) => theme.colors.neutral200};
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 1.6rem;
  margin-top: 0.8rem;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 0;
  }
`;

const SSocialsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  > a {
    &:not(:first-child) {
      margin-left: 3.2rem;
    }
  }
`;

const SMediaIcon = styled(Icon)`
  width: 1.6rem;
  cursor: pointer;
  fill: ${({ theme }) => theme.colors.invertedContrast};
  z-index: 10;

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 2.4rem;
  }
`;

export default Footer;
