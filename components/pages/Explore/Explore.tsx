import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getNFTs } from 'actions/nft';
import { ModalFilters } from 'components/base/Modal';
import NftsGrid from 'components/base/NftsGrid';
import Button from 'components/ui/Button';
import { Loader } from 'components/ui/Icon';
import { Container, Title, Wrapper } from 'components/layout';
import { EXPLORE_TAB } from 'components/pages/Profile';
import { NftType } from 'interfaces/index';

import { CATEGORIES_FILTER } from './constants';
import { FiltersType } from './interfaces';

export interface ExploreProps {
  NFTs: NftType[];
  hasNextPage: boolean;
  totalCount?: number;
}

const Explore: React.FC<ExploreProps> = ({ NFTs, hasNextPage, totalCount }) => {
  const [filters, setFilters] = useState<FiltersType>({
    [CATEGORIES_FILTER]: undefined,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [dataNfts, setDataNfts] = useState(NFTs);
  const [dataNftsHasNextPage, setDataNftsHasNextPage] = useState(hasNextPage);
  const [dataTotalCount,] = useState(totalCount ?? 0);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataFiltered, setIsDataFiltered] = useState(false);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);
  const [isModalFiltersExpanded, setIsModalFiltersExpanded] = useState(false);

  const toggleModalFiltersExpanded = () => {
    setIsModalFiltersExpanded((prevState) => !prevState);
  };

  const loadMoreNfts = async () => {
    setIsLoadMoreLoading(true);
    try {
      if (dataNftsHasNextPage) {
        const { data, hasNextPage } = (await getNFTs(filters[CATEGORIES_FILTER], (currentPage + 1).toString(), undefined, true)) ?? {
          data: [],
          hasNextPage: false,
        };
        setCurrentPage((prevCount) => prevCount + 1);
        setDataNftsHasNextPage(hasNextPage);
        setDataNfts((prevState) => prevState.concat(data));
        setIsLoadMoreLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoadMoreLoading(false);
    }
  };

  useEffect(() => {
    const getFilteredData = async () => {
      setIsLoading(true);
      try {
        const { data, hasNextPage } = (await getNFTs(filters[CATEGORIES_FILTER], '1', undefined, true)) ?? {
          data: [],
          hasNextPage: false,
        };
        setCurrentPage(1);
        setDataNftsHasNextPage(hasNextPage);
        setDataNfts(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };

    if (isDataFiltered) {
      getFilteredData();
    }
    return () => {
      setDataNfts([]);
    };
  }, [filters, isDataFiltered]);

  if (isLoading) {
    return (
      <Container>
        <Wrapper>
          <SLoader color="primary500" />
        </Wrapper>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <Wrapper>
          <STopContainer>
            <STitleContainer>
              <STitle>Explore</STitle>
              {/* TODO: add totalCount based on filters, remove isDataFiltered condition */}
              {dataTotalCount > 0 && !isDataFiltered && <STotalInsight>{`${dataTotalCount} NFTs to discover`}</STotalInsight>}
            </STitleContainer>
            <SFiltersButtonContainer>
              <Button color="primary500" icon="filters" onClick={toggleModalFiltersExpanded} size="medium" text="Filters" variant="contained" />
            </SFiltersButtonContainer>
          </STopContainer>
          <NftsGrid
            NFTs={dataNfts}
            isLoadMoreLoading={isLoadMoreLoading}
            isLoadMore={hasNextPage}
            loadMore={loadMoreNfts}
            noNftBody={
              <>
                Come later to discover new NFTs.
                <br />
                <br />
                Thanks !
              </>
            }
            noNftTitle="All NFTs are sold !"
            tabId={EXPLORE_TAB}
          />
        </Wrapper>
      </Container>
      {isModalFiltersExpanded && <ModalFilters setExpanded={setIsModalFiltersExpanded} setFilters={setFilters} setIsDataFiltered={setIsDataFiltered} />}
    </>
  );
};

const STopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const STitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    align-items: baseline;
  }
`;

const STitle = styled(Title)`
  font-size: 3.2rem;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 4.8rem;
    margin: 0 auto;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 4.8rem;
    margin: 0;
  }
`;

const STotalInsight = styled.span`
  color: ${({ theme }) => theme.colors.neutral300};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 1.6rem;
  margin-top: 0.8rem;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: 0;
    margin-left: 1.6rem;
  }
`;

const SFiltersButtonContainer = styled.div`
  margin-top: 2.4rem;
`;

const SLoader = styled(Loader)`
  margin: 8rem auto;
`;

export default Explore;
