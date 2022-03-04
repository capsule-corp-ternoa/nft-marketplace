import React from 'react'
import styled from 'styled-components'

import NftCard from 'components/base/NftCard'
import NoNFTComponent from 'components/base/NoNFTComponent'
import Button from 'components/ui/Button'
import { Loader } from 'components/ui/Icon'
import {
  TabsIdType,
  NFT_OWNED_TAB,
  NFT_ON_SALE_TAB,
  NFT_NOT_FOR_SALE_TAB,
  NFT_CREATED_TAB,
  NFT_LIKED_TAB,
} from 'components/pages/Profile'
import { NftType } from 'interfaces'

import { LIKE_ACTION_TYPE } from 'utils/profile/constants'

interface Props {
  children?: React.ReactNode
  NFTs?: NftType[]
  isLoading?: boolean
  isLoadMore: boolean
  isLoadMoreLoading: boolean
  loadMore?: () => void
  noNftBody?: string | React.ReactNode
  noNftHref?: string
  noNftLinkLabel?: string
  noNftTitle: string
  handleNftLike?: (action: LIKE_ACTION_TYPE, nft?: NftType) => void
  tabId?: TabsIdType
}

const NftsGrid = ({
  children,
  NFTs,
  isLoading,
  isLoadMore,
  isLoadMoreLoading,
  loadMore,
  noNftBody,
  noNftHref,
  noNftLinkLabel,
  noNftTitle,
  handleNftLike,
  tabId,
}: Props) => {
  const returnQuantityNFTsAvailable = (NFT: NftType, tabId?: TabsIdType) => {
    const { totalNft, totalOwnedByRequestingUser, totalOwnedListedInMarketplaceByRequestingUser } = NFT
    switch (tabId) {
      case NFT_LIKED_TAB:
        return 0
      case NFT_ON_SALE_TAB:
        return totalOwnedListedInMarketplaceByRequestingUser
      case NFT_NOT_FOR_SALE_TAB:
        return totalOwnedByRequestingUser
          ? totalOwnedByRequestingUser - (totalOwnedListedInMarketplaceByRequestingUser ?? 0)
          : 0
      case NFT_OWNED_TAB:
        return totalOwnedByRequestingUser ?? 1
      case NFT_CREATED_TAB:
        return totalNft ?? 1
      default:
        return undefined
    }
  }

  if (isLoading) {
    return (
      <SNoNFTContainer>
        <SLoader color="contrast" useLottie />
      </SNoNFTContainer>
    )
  }

  if (NFTs === undefined || NFTs.length < 1) {
    return (
      <SNoNFTContainer>
        <NoNFTComponent body={noNftBody} href={noNftHref} linkLabel={noNftLinkLabel} title={noNftTitle} />
      </SNoNFTContainer>
    )
  }

  return (
    <>
      <SNFTsContainer>
        {NFTs.map((item: NftType) => (
          <SNftCard
            key={item.id}
            handleLike={handleNftLike}
            item={item}
            quantity={returnQuantityNFTsAvailable(item, tabId)}
          />
        ))}
        {children}
      </SNFTsContainer>
      {isLoadMore && loadMore && (
        <SLoadButtonWrapper>
          <Button
            color="contrast"
            disabled={isLoadMoreLoading}
            isLoading={isLoadMoreLoading}
            onClick={loadMore}
            size="medium"
            text={isLoadMoreLoading ? 'Loading...' : 'Load more'}
            variant="outlined"
          />
        </SLoadButtonWrapper>
      )}
    </>
  )
}

const SNoNFTContainer = styled.div`
  display: flex;
  align-items; center;
  margin-top: 8rem;
`

const SLoader = styled(Loader)`
  margin: 8rem auto;
`

const SLoadButtonWrapper = styled.div`
  button {
    margin: 1.6rem auto 3.2rem;
  }
`

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
`

const SNftCard = styled(NftCard)`
  margin: 0 auto;
  height: ${({ theme }) => theme.sizes.cardHeight.md};
  width: ${({ theme }) => theme.sizes.cardWidth.md};

  ${({ theme }) => theme.mediaQueries.sm} {
    height: ${({ theme }) => theme.sizes.cardHeight.sm};
    width: ${({ theme }) => theme.sizes.cardWidth.sm};
  }

  ${({ theme }) => theme.mediaQueries.md} {
    height: ${({ theme }) => theme.sizes.cardHeight.md};
    width: ${({ theme }) => theme.sizes.cardWidth.md};
  }

  ${({ theme }) => theme.mediaQueries.xxl} {
    height: ${({ theme }) => theme.sizes.cardHeight.sm};
    width: ${({ theme }) => theme.sizes.cardWidth.sm};
  }
`

export default NftsGrid
