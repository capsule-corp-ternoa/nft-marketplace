import React from 'react';
import { NftType, UserType } from 'interfaces/index';
import { Container, Title, Wrapper } from 'components/layout';

import NftsExploreBlock from './components/NftsExploreBlock';

export interface ExploreProps {
  NFTS: NftType[];
  user?: UserType;
  setUser?: (u: UserType) => void;
  loadMore: () => void;
  hasNextPage: boolean;
  loading: boolean;
}

const Explore: React.FC<ExploreProps> = ({ NFTS, user, setUser, loadMore, hasNextPage, loading }) => (
  <Container>
    <Wrapper>
      <Title>Explore</Title>
      <NftsExploreBlock
        NFTs={NFTS}
        isLoading={loading}
        isLoadMore={hasNextPage}
        loadMore={loadMore}
        noNftBody={
          <>
            Come later to discover new NFTs.
            <br />
            <br />
            Thanks !
          </>
        }
        noNftTitle="All NFTs are sold !"
        user={user}
        setUser={setUser}
      />
    </Wrapper>
  </Container>
);

export default Explore;
