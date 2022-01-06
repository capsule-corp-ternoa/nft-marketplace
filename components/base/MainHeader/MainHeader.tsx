import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Link from 'next/link';
import styled from 'styled-components';

import Logo from 'components/assets/LogoTernoaBlack';
import { ProfileMenuBadge, ProfileMenuDropdown } from 'components/base/ProfileMenu';
import Button from 'components/ui/Button';
import { Container, Wrapper } from 'components/layout';

import { UserType } from 'interfaces/index';
import { computeCaps } from 'utils/strings';
import { breakpointMap } from 'style/theme/base';

import style from './MainHeader.module.scss';

export interface HeaderProps {
  user: UserType;
  setModalExpand: (b: boolean) => void;
}

const MainHeader: React.FC<HeaderProps> = ({ setModalExpand, user }) => {
  const [isProfileMenuExpanded, setIsProfileMenuExpanded] = useState(false);
  const isNftCreationEnabled =
    process.env.NEXT_PUBLIC_IS_NFT_CREATION_ENABLED === undefined
      ? true
      : process.env.NEXT_PUBLIC_IS_NFT_CREATION_ENABLED === 'true';

  const isMobileTablet = useMediaQuery({
    query: `(max-width: ${breakpointMap.lg - 1}px)`,
  });

  return (
    <Container>
      <SWrapper>
        <Link href="/">
          <a>
            <Logo className={style.Logo} onClick={() => true} />
          </a>
        </Link>
        {!isMobileTablet && (
          <SNavContainer>
            <SNavLinksContainer>
              <Link href="/explore" passHref>
                <SLinkItem>Explore</SLinkItem>
              </Link>
              <Link href="/faq" >
                <SLinkItem>How it works</SLinkItem>
              </Link>
            </SNavLinksContainer>
            <SNavButtonsCointainer>
              {isNftCreationEnabled && (
                <Link href="/create" passHref>
                  <>
                    <Button
                      color="invertedContrast"
                      href="/create"
                      size="medium"
                      text="Create NFT"
                      variant="outlined"
                    />
                  </>
                </Link>
              )}
              {user ? (
                <ProfileMenuBadge
                  onClick={() => setIsProfileMenuExpanded((prevState) => !prevState)}
                  tokenAmount={user?.capsAmount ? computeCaps(Number(user.capsAmount)) : 0}
                  tokenSymbol="CAPS"
                  user={user}
                />
              ) : (
                <Button
                  color="contrast"
                  onClick={() => setModalExpand(true)}
                  size="medium"
                  text="Connect"
                  variant="outlined"
                />
              )}
            </SNavButtonsCointainer>
          </SNavContainer>
        )}
        {user && isProfileMenuExpanded && (
          <SProfileMenuDropdown onClose={() => setIsProfileMenuExpanded(false)} user={user} />
        )}
      </SWrapper>
    </Container>
  );
};

const SWrapper = styled(Wrapper)`
  flex-direction: row;
  justify-content: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    justify-content: space-between;
  }
`;

const SNavContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SNavLinksContainer = styled.div`
  display: flex;
  align-items: center;

  > * {
    &:not(:first-child) {
      margin-left: 2.4rem;
    }
  }
`;

const SLinkItem = styled.a`
  color: ${({theme}) => theme.colors.contrast};
  cursor: pointer;
  font-family: ${({theme}) => theme.fonts.bold};
  font-size: 1.6rem;
`;


const SNavButtonsCointainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-left: 5.6rem;
  }
`;

const SProfileMenuDropdown = styled(ProfileMenuDropdown)`
  top: 10rem;
  right: 4.8rem;

  &::before {
    width: 0;
    height: 0;
    border-left: 2.4rem solid transparent;
    border-right: 2.4rem solid transparent;
    z-index: 101;
    border-top: ${({ theme }) => `1.2rem solid ${theme.colors.invertedContrast}`};
    content: '';
    position: absolute;
    top: -1.6rem;
    right: 3.2rem;
    transform: translateY(0.8rem) rotate(180deg);
  }
`;

export default MainHeader;
