import React from 'react';
import styled from 'styled-components';

import NftCard, { NftChips } from 'components/base/NftCard';
import NoNFTComponent from 'components/base/NoNFTComponent';
import Button from 'components/ui/Button';
import {
  NftType,
  TabsIdType,
  UserType,
  NFT_OWNED_TAB,
  NFT_ON_SALE_TAB,
  NFT_NOT_FOR_SALE_TAB,
  NFT_CREATED_TAB,
  NFT_LIKED_TAB,
} from 'interfaces';

interface Props {
  NFTs: NftType[];
  isLoading: boolean;
  isLoadMore: boolean;
  loadMore: () => void;
  noNftBody?: string;
  noNftHref?: string;
  noNftLinkLabel?: string;
  noNftTitle: string;
  tabId: TabsIdType;
  user: UserType;
}

const NftsProfileBlock = ({
  NFTs,
  isLoading,
  isLoadMore,
  loadMore,
  noNftBody,
  noNftHref,
  noNftLinkLabel,
  noNftTitle,
  tabId,
  user,
}: Props) => {
  const returnQuantityNFTsAvailable = (NFT: NftType, tabId: TabsIdType) => {
    const { serieData, totalNft, totalOwnedByRequestingUser } = NFT;

    switch (tabId) {
      case NFT_CREATED_TAB:
        return totalNft ?? 1;
      case NFT_LIKED_TAB:
        return 0;
      case NFT_ON_SALE_TAB:
        return (
          serieData?.filter(
            ({ listed, owner }) => owner === user?.walletId && listed === 1
          ).length ?? 1
        );
      case NFT_NOT_FOR_SALE_TAB:
        return (
          serieData?.filter(
            ({ listed, owner }) => owner === user?.walletId && listed === 0
          ).length ?? 1
        );
      case NFT_OWNED_TAB:
      default:
        return totalOwnedByRequestingUser ?? 1;
    }
  };

  if (NFTs.length < 1) {
    return (
      <SNoNFTContainer>
        <NoNFTComponent
          body={noNftBody}
          href={noNftHref}
          linkLabel={noNftLinkLabel}
          title={noNftTitle}
        />
      </SNoNFTContainer>
    );
  }

  return (
    <>
      {/* TODO: Add this when sell modal is implemented */}
      {/* {tabId === NFT_ON_SALE_TAB && isTablet && (
        <SSaleLinkWrapper>
          <Link href="/" passHref>
            <>
              <SSaleContainer href="/">
                <SSaleIcon>
                  <span>+</span>
                </SSaleIcon>
                <SSaleLabel>Sell your NFT</SSaleLabel>
              </SSaleContainer>
            </>
          </Link>
        </SSaleLinkWrapper>
      )} */}
      <SNFTsContainer>
        {NFTs.map((item: NftType) => (
          <SNftCard key={item.id} mode="profile" item={item}>
            <NftChips
              NFT={item}
              mode="profile"
              noAvailableChip={tabId !== NFT_ON_SALE_TAB}
              noPriceChip={tabId !== NFT_ON_SALE_TAB}
              quantity={returnQuantityNFTsAvailable(item, tabId)}
            />
          </SNftCard>
        ))}
        {/* {tabId === NFT_ON_SALE_TAB && !isTablet && (
          <SSaleLinkWrapper>
            <Link href="/" passHref>
              <>
                <SSaleContainer href="/">
                  <SSaleIcon>
                    <span>+</span>
                  </SSaleIcon>
                  <SSaleLabel>Sell your NFT</SSaleLabel>
                </SSaleContainer>
              </>
            </Link>
          </SSaleLinkWrapper>
        )} */}
      </SNFTsContainer>
      {isLoadMore && (
        <SLoadButtonWrapper>
          <Button
            color="invertedContrast"
            disabled={isLoading}
            onClick={() => loadMore()}
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
  margin-top: 8rem;
`;

const SLoadButtonWrapper = styled.div`
  button {
    margin: 5.6rem auto 11.6rem;
  }
`;

const SNFTsContainer = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  padding: 3.2rem 0;
  width: 100%;
  margin-bottom: 3.2rem;
  gap: 3.2rem;

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(3, 1fr);
    gap: 2.4rem 0;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: repeat(4, 1fr);
    gap: 3.2rem 0;
    margin-top: 4.8rem;
  }

  ${({ theme }) => theme.mediaQueries.xxl} {
    grid-template-columns: repeat(6, 1fr);
    gap: 3.2rem;
  }
`;

const SNftCard = styled(NftCard)`
  margin: 0 auto;
`;

// const SSaleLinkWrapper = styled.div`
//   max-width: 26rem;
//   border: 0.2rem dashed;
//   border-color: ${({ theme }) => theme.colors.contrast};
//   border-radius: 1.2rem;
//   margin: 6.4rem auto 0;

//   ${({ theme }) => theme.mediaQueries.lg} {
//     border-radius: 2.4rem;
//     max-width: none;
//     margin: 0 0 0 -0.8rem;
//     padding: 0.8rem;
//   }
// `;

// const SSaleContainer = styled.a`
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: space-evenly;
//   margin: 1.6rem 0;

//   ${({ theme }) => theme.mediaQueries.lg} {
//     height: ${({ theme }) => theme.sizes.cardHeight.sm};
//     width: ${({ theme }) => theme.sizes.cardWidth.sm};
//     flex-direction: column;
//     justify-content: center;
//     margin: 0;
//   }
// `;

// const SSaleIcon = styled.div`
//   width: 5rem;
//   height: 5rem;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background: ${({ theme }) => theme.colors.contrast};
//   border-radius: 50%;
//   padding: 1rem;

//   > span {
//     color: ${({ theme }) => theme.colors.invertedContrast};
//     font-size: 5.4rem;
//     transform: translate(4%, -5%);
//   }
// `;

// const SSaleLabel = styled.span`
//   color: ${({ theme }) => theme.colors.contrast};
//   font-size: 1.6rem;

//   ${({ theme }) => theme.mediaQueries.lg} {
//     margin-top: 2.4rem;
//   }
// `;

export default NftsProfileBlock;