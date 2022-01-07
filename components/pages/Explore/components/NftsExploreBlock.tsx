import React from 'react';
import styled from 'styled-components';

import { NftCardWithHover, GRID_MODE } from 'components/base/NftCard';
import NoNFTComponent, { NO_NFT_VARIANT_SOLD_OUT } from 'components/base/NoNFTComponent';
import Button from 'components/ui/Button';
import { NftType, UserType } from 'interfaces';

interface Props {
  NFTs?: NftType[];
  isLoading: boolean;
  isLoadMore: boolean;
  loadMore?: () => void;
  noNftBody?: string | React.ReactNode;
  noNftHref?: string;
  noNftLinkLabel?: string;
  noNftTitle: string;
  user?: UserType;
  setUser?: (u: UserType) => void;
}

const NftsExploreBlock = ({
  NFTs,
  isLoading,
  isLoadMore,
  loadMore,
  noNftBody,
  noNftHref,
  noNftLinkLabel,
  noNftTitle,
  user,
  setUser,
}: Props) => {
  if (NFTs == undefined || NFTs.length < 1) {
    return (
      <SNoNFTContainer>
        <NoNFTComponent
          body={noNftBody}
          href={noNftHref}
          linkLabel={noNftLinkLabel}
          title={noNftTitle}
          variant={NO_NFT_VARIANT_SOLD_OUT}
        />
      </SNoNFTContainer>
    );
  }

  return (
    <>
      <SNFTsContainer>
        {NFTs.map((item: NftType) => (
          <SNftCard
            key={item.id}
            mode={GRID_MODE}
            item={item}
            quantity={item.totalNft ?? 1}
            user={user}
            setUser={setUser}
          />
        ))}
      </SNFTsContainer>
      {isLoadMore && loadMore && (
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
  margin: 5.6rem 0 3.2rem;
  width: 100%;
  gap: 4rem;

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: ${({ theme }) =>
      `repeat(auto-fill, ${theme.sizes.cardWidth.sm})`};
  }

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: ${({ theme }) =>
      `repeat(auto-fill, ${theme.sizes.cardWidth.md})`};
  }
`;

const SNftCard = styled(NftCardWithHover)`
  margin: 0 auto;
`;

export default NftsExploreBlock;
