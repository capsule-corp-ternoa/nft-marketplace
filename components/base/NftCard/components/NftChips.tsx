import React from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import Chip from 'components/ui/Chip';
import { NftType } from 'interfaces/index';
import { computeCaps, computeTiime } from 'utils/strings';
import { breakpointMap } from 'style/theme/base';

import { CAROUSEL_MODE, PROFILE_MODE, ModeType } from '../NftCard';

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

  const isPrice =
    (smallestPrice && Number(smallestPrice)) ||
    (smallestPriceTiime && Number(smallestPriceTiime));
  const isSecret = properties?.cryptedMedia.ipfs !== properties?.preview.ipfs;

  const defaultQuantityAvailable =
    totalListedInMarketplace ?? totalListedNft ?? 1;
  const quantityAvailable = quantity ?? defaultQuantityAvailable;

  return (
    <>
      {quantityAvailable > 1 && !noAvailableChip && (
        <SAvailableChipWrapper>
          <Chip
            color="whiteBlur"
            size="small"
            text={`${
              (!isLargeDesktop || mode === PROFILE_MODE ) ? '' : 'Available : '
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

export default NftChips;
