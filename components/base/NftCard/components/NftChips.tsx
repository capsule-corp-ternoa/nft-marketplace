import React from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import Chip from 'components/ui/Chip';
import { NftType } from 'interfaces/index';
import { computeCaps, computeTiime } from 'utils/strings';
import { breakpointMap } from 'style/theme/base';

import { CAROUSEL_MODE, GRID_MODE, ModeType } from '../NftCard';

interface Props {
  mode?: ModeType;
  noAvailableChip?: boolean;
  noPriceChip?: boolean;
  noSecretChip?: boolean;
  quantity?: number;
  NFT: NftType;
}

const NftChips = ({
  mode,
  noAvailableChip = false,
  noPriceChip = false,
  noSecretChip = false,
  quantity,
  NFT,
}: Props) => {
  const {
    properties,
    smallestPrice,
    smallestPriceTiime,
    totalListedInMarketplace,
    totalListedNft,
  } = NFT;

  const isMobile = useMediaQuery({
    query: `(max-width: ${breakpointMap.md - 1}px)`,
  });
  const isLargeDesktop = useMediaQuery({
    query: `(min-width: ${breakpointMap.xxl}px)`,
  });

  const isPrice = !!Number(smallestPrice) || !!Number(smallestPriceTiime);
  const isSecret = properties?.cryptedMedia.ipfs !== properties?.preview.ipfs;

  const defaultQuantityAvailable =
    totalListedInMarketplace ?? totalListedNft ?? 1;
  const quantityAvailable = quantity ?? defaultQuantityAvailable;

  // Filter gradients flags
  const isTopFilter =
    (quantityAvailable > 1 && !noAvailableChip) || (isSecret && !noSecretChip);
  const isBottomFilter = isPrice && !noPriceChip;

  return (
    <>
      {quantityAvailable > 1 && !noAvailableChip && (
        <SAvailableChipWrapper>
          <Chip
            color="whiteBlur"
            size="small"
            text={`${
              !isLargeDesktop || mode === GRID_MODE ? '' : 'Available : '
            }${quantityAvailable} of ${NFT.totalNft}`}
            variant="round"
          />
        </SAvailableChipWrapper>
      )}
      {isSecret && !noSecretChip && (
        <SSecretChipWrapper>
          <Chip
            color="whiteBlur"
            icon="secretCards"
            size="small"
            text={isMobile && mode === CAROUSEL_MODE ? undefined : 'Secret'}
            variant="round"
          />
        </SSecretChipWrapper>
      )}
      {isPrice && !noPriceChip && (
        <SPriceChipWrapper>
          <Chip
            color="whiteBlur"
            size="small"
            text={
              <>
                {smallestPrice &&
                  Number(smallestPrice) > 0 &&
                  `${computeCaps(Number(smallestPrice))} CAPS`}
                {smallestPrice &&
                  Number(smallestPrice) &&
                  smallestPriceTiime &&
                  Number(smallestPriceTiime) &&
                  ` / `}
                {smallestPriceTiime &&
                  Number(smallestPriceTiime) > 0 &&
                  `${computeTiime(Number(smallestPriceTiime))} TIIME`}
              </>
            }
            variant="round"
          />
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
  bottom: 1.6rem;
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
    isTopFilter
      ? 'linear-gradient(0deg, rgba(57, 57, 57, 0) 70%, #0303039e 100%)'
      : 'none'
  },
  ${
    isBottomFilter
      ? 'linear-gradient(180deg, rgba(57, 57, 57, 0) 70%, #0303039e 100%)'
      : 'none'
  }`};
  border-radius: 1.2rem;
`;

export default NftChips;
