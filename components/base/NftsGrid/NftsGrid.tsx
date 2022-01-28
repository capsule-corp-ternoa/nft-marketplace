import React from 'react';
import styled from 'styled-components';

import { NftCardWithHover, GRID_MODE } from 'components/base/NftCard';
import NoNFTComponent from 'components/base/NoNFTComponent';
import Button from 'components/ui/Button';
import { Loader } from 'components/ui/Icon';
import {
  NftType,
  NFTsNominalSetState,
  UserType,
  TabsIdType,
  NFT_OWNED_TAB,
  NFT_ON_SALE_TAB,
  NFT_NOT_FOR_SALE_TAB,
  NFT_CREATED_TAB,
  NFT_LIKED_TAB,
  EXPLORE_TAB,
} from 'interfaces';
import { LIKE_ACTION_TYPE } from 'utils/profile/constants';

interface Props {
  children?: React.ReactNode;
  NFTs?: NftType[];
  isLoading: boolean;
  isLoadMore: boolean;
  loadMore?: () => void;
  noNftBody?: string | React.ReactNode;
  noNftHref?: string;
  noNftLinkLabel?: string;
  noNftTitle: string;
  handleLikeCount?: (action: LIKE_ACTION_TYPE) => void;
  setLikedNfts?: NFTsNominalSetState;
  tabId?: TabsIdType;
  user?: UserType;
}

const NftsGrid = ({
  children,
  NFTs,
  isLoading,
  isLoadMore,
  loadMore,
  noNftBody,
  noNftHref,
  noNftLinkLabel,
  noNftTitle,
  handleLikeCount,
  setLikedNfts,
  user,
  tabId,
}: Props) => {
  const returnQuantityNFTsAvailable = (NFT: NftType, tabId?: TabsIdType) => {
    const { totalNft, totalOwnedByRequestingUser, totalOwnedListedInMarketplaceByRequestingUser, totalListedInMarketplace } = NFT;
    switch (tabId) {
      case NFT_LIKED_TAB:
        return 0;
      case NFT_ON_SALE_TAB:
        return totalOwnedListedInMarketplaceByRequestingUser;
      case NFT_NOT_FOR_SALE_TAB:
        return totalOwnedByRequestingUser
          ? totalOwnedByRequestingUser - (totalOwnedListedInMarketplaceByRequestingUser ?? 0)
          : 0;
      case NFT_OWNED_TAB:
        return totalOwnedByRequestingUser ?? 1;
      case EXPLORE_TAB:
        return totalListedInMarketplace
      case NFT_CREATED_TAB:
      default:
        return totalNft ?? 1;
    }
  };

  if (NFTs === undefined || NFTs.length < 1) {
    return (
      <SNoNFTContainer>
        {isLoading ? (
          <SLoader color="primary500" />
        ) : (
          <NoNFTComponent body={noNftBody} href={noNftHref} linkLabel={noNftLinkLabel} title={noNftTitle} />
        )}
      </SNoNFTContainer>
    );
  }

  return (
    <>
      <SNFTsContainer>
        {NFTs.map((item: NftType) => (
          <SNftCardWithHover
            key={item.id}
            item={item}
            mode={GRID_MODE}
            quantity={returnQuantityNFTsAvailable(item, tabId)}
            handleLikeCount={handleLikeCount}
            setLikedNfts={tabId === NFT_LIKED_TAB ? setLikedNfts : undefined}
            user={user}
          />
        ))}
        {children}
      </SNFTsContainer>
      {isLoadMore && loadMore && (
        <SLoadButtonWrapper>
          <Button
            color="contrast"
            disabled={isLoading}
            isLoading={isLoading}
            onClick={loadMore}
            size="medium"
            text={isLoading ? 'Loading...' : 'Load more'}
            variant="outlined"
          />
        </SLoadButtonWrapper>
      )}
    </>
  );
};

const SNoNFTContainer = styled.div`
  display: flex;
  align-items; center;
  margin-top: 8rem;
`;

const SLoader = styled(Loader)`
  margin: 8rem auto;
`;

const SLoadButtonWrapper = styled.div`
  button {
    margin: 1.6rem auto 3.2rem;
  }
`;

const SNFTsContainer = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  margin: 5.6rem 0 3.2rem;
  width: 100%;
  gap: 4rem;

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: ${({ theme }) => `repeat(auto-fill, ${theme.sizes.cardWidth.sm})`};
  }

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: ${({ theme }) => `repeat(auto-fill, ${theme.sizes.cardWidth.md})`};
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    gap: 4rem 2.4rem;
    justify-content: space-between;
  }

  ${({ theme }) => theme.mediaQueries.xxl} {
    grid-template-columns: ${({ theme }) => `repeat(auto-fill, ${theme.sizes.cardWidth.sm})`};
  }
`;

const SNftCardWithHover = styled(NftCardWithHover)`
  margin: 0 auto;
`;

export default NftsGrid;
