import React from 'react';
import styled from 'styled-components';
import Chip from 'components/ui/Chip';
import { NftType } from 'interfaces/index';
import { computeCaps, computeTiime } from 'utils/strings';

interface Props {
  noAvailableChip?: boolean;
  noPriceChip?: boolean;
  noSecretChip?: boolean;
  quantity?: number;
  NFT: NftType;
}

const NftChips = ({ noAvailableChip = false, noPriceChip = false, noSecretChip = false, quantity, NFT }: Props) => {
  const { properties, smallestPrice, smallestPriceTiime, totalListedInMarketplace, totalListedNft } = NFT;

  const smallestCapsPrice = Number(smallestPrice);
  const smallestTiimePrice = Number(smallestPriceTiime);
  const isSmallestCapsPrice = smallestCapsPrice > 0;
  const isSmallestTiimePrice = smallestTiimePrice > 0;
  const isPrice = isSmallestCapsPrice || isSmallestTiimePrice;
  const isSecret = properties?.cryptedMedia.ipfs !== properties?.preview.ipfs;

  const smallestPriceWording = isPrice
    ? `${isSmallestCapsPrice ? `${computeCaps(smallestCapsPrice)} CAPS` : ''}
          ${isSmallestCapsPrice && isSmallestTiimePrice ? ' / ' : ''}
          ${isSmallestTiimePrice ? `${computeTiime(smallestTiimePrice)} TIIME` : ''}`
    : undefined;

  const defaultQuantityAvailable = totalListedInMarketplace ?? totalListedNft ?? 1;
  const quantityAvailable = quantity ?? defaultQuantityAvailable;

  // Filter gradients flags
  const isTopFilter = (quantityAvailable > 1 && !noAvailableChip) || (isSecret && !noSecretChip);
  const isBottomFilter = isPrice && !noPriceChip;

  return (
    <>
      {quantityAvailable > 1 && !noAvailableChip && (
        <SAvailableChipWrapper>
          <Chip color="whiteBlur" size="small" text={`${quantityAvailable} of ${NFT.totalNft}`} variant="round" />
        </SAvailableChipWrapper>
      )}
      {isSecret && !noSecretChip && (
        <SSecretChipWrapper>
          <Chip color="whiteBlur" icon="secretCards" size="small" text="Secret" variant="round" />
        </SSecretChipWrapper>
      )}
      {smallestPriceWording && !noPriceChip && (
        <SPriceChipWrapper>
          <Chip color="whiteBlur" size="small" text={smallestPriceWording} variant="round" />
        </SPriceChipWrapper>
      )}
      <SFilter isTopFilter={isTopFilter} isBottomFilter={isBottomFilter} />
    </>
  );
};

const SChipWrapper = styled.div`
  background: transparent;
  position: absolute;
  z-index: 4;
`;

const SAvailableChipWrapper = styled(SChipWrapper)`
  top: 1.6rem;
  left: 1.6rem;
`;

const SSecretChipWrapper = styled(SChipWrapper)`
  top: 1.6rem;
  right: 1.6rem;
`;

const SPriceChipWrapper = styled(SChipWrapper)`
  width: fit-content;
  bottom: 2.4rem;
  left: 0;
  right: 0;
  margin: 0 auto;
`;

const SFilter = styled.div<{ isTopFilter?: boolean; isBottomFilter?: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: ${({ isTopFilter, isBottomFilter }) => `${
    isTopFilter ? 'linear-gradient(0deg, rgba(57, 57, 57, 0) 70%, #0303039e 100%)' : 'none'
  },
  ${isBottomFilter ? 'linear-gradient(180deg, rgba(57, 57, 57, 0) 70%, #0303039e 100%)' : 'none'}`};
  border-radius: 1.2rem;
`;

export default NftChips;
