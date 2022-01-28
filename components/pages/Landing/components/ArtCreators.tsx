import React from 'react';
import styled from 'styled-components';

import { Picture, AVATAR_VARIANT_MOSAIC } from 'components/base/Avatar';
import { NftCardWithHover, CAROUSEL_MODE } from 'components/base/NftCard';
import Icon from 'components/ui/Icon';

import { UserType, NftType } from 'interfaces/index';

export interface ArtCreatorsProps {
  creators?: UserType[];
  NFTs: NftType[];
  category?: string;
}

const ArtCreators = ({ creators, NFTs }: ArtCreatorsProps) => (
  <>
    <STitle>
      Best art creators <SIcon name="blaze" />
    </STitle>
    <SContentContainer>
      {NFTs?.length > 0 && (
        <SNftsContainer>
          {NFTs.map((item) => (
            <div key={item.id}>
              <NftCardWithHover item={item} mode={CAROUSEL_MODE} />
            </div>
          ))}
        </SNftsContainer>
      )}
      {creators !== undefined && creators?.length > 0 && (
        <SCreatorsContainer>
          {creators.slice(0, 9).map(({ name, picture, walletId }) => (
            <SCreatorPicture key={walletId}>
              <Picture
                isClickable
                isTooltip
                name={name}
                picture={picture}
                variant={AVATAR_VARIANT_MOSAIC}
                walletId={walletId}
              />
            </SCreatorPicture>
          ))}
        </SCreatorsContainer>
      )}
    </SContentContainer>
  </>
);

const STitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 2.4rem;
  margin: 0;

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 3.2rem;
  }
`;

const SIcon = styled(Icon)`
  width: 3.2rem;
  height: 3.2rem;
  margin-left: 1.2rem;
  margin-bottom: -0.4rem;
`;

const SContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3.2rem;

  ${({ theme }) => theme.mediaQueries.xl} {
    flex-direction: row;
  }
`;

const SNftsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;
  margin: 0 auto;
  overflow-x: auto;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.md} {
    width: auto;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    gap: 3.2rem;
    overflow-x: visible;
  }
`;

const SCreatorsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background: ${({ theme }) => theme.colors.invertedContrast};
  box-shadow: ${({ theme }) => theme.shadows.popupShadow};
  border-radius: 2.4rem;
  padding: 2.4rem 3.2rem;
  flex: 1;
  margin-top: 4rem;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.xl} {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 1.6rem;
    margin-top: 0;
    margin-left: 3.2rem;
    width: auto;
    height: 100%;
  }
`;

const SCreatorPicture = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.8rem;
`;

export default ArtCreators;
