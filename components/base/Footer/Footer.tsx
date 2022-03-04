import React from 'react'
import styled from 'styled-components'

import Icon from 'components/ui/Icon'
import { Container, Wrapper } from 'components/layout'
import { useMarketplaceData } from 'redux/hooks'

const Footer = () => {
  const { instagramUrl, name, twitterUrl } = useMarketplaceData()

  return (
    <SFooterContainer>
      <SFooterWrapper>
        <SLegalsContainer>
          <SLabel>{`© ${name}`}</SLabel>
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
          {twitterUrl !== 'false' && (
            <a href={twitterUrl} target="_blank" rel="noreferrer" title="Official Twitter account">
              <SMediaIcon name="socialTwitter" />
            </a>
          )}
          {instagramUrl !== 'false' && (
            <a href={instagramUrl} target="_blank" rel="noreferrer" title="Official Instagram account">
              <SMediaIcon name="socialInstagram" />
            </a>
          )}
        </SSocialsContainer>
      </SFooterWrapper>
    </SFooterContainer>
  )
}

const SFooterContainer = styled(Container)`
  width: 100%;
  background: ${({ theme }) => theme.colors.contrast};
  margin-top: auto;
`

const SFooterWrapper = styled(Wrapper)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15.2rem !important;
  padding-top: 2.4rem !important;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-bottom: 2.4rem !important;
  }
`

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
`

const SLabel = styled.span`
  color: ${({ theme }) => theme.colors.neutral200};
  font-size: 1.6rem;
`

const SLink = styled.a`
  color: ${({ theme }) => theme.colors.neutral200};
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 1.6rem;
  margin-top: 0.8rem;

  &:hover {
    color: ${({ theme }) => theme.colors.primary300};
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 0;
  }
`

const SSocialsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  > a {
    &:not(:first-child) {
      margin-left: 3.2rem;
    }
  }
`

const SMediaIcon = styled(Icon)`
  width: 1.6rem;
  cursor: pointer;
  fill: ${({ theme }) => theme.colors.invertedContrast};
  z-index: 10;

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 2.4rem;
  }
`

export default Footer
