import React, { useEffect, useContext } from 'react';
import { fetchNfts } from '../../../utils/store/dataFetcher';
import { Context } from '../../../utils/store/store';
import Carousel from './Carousel/Carousel';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
import { H1, H4 } from '../../common/Title/Title';

const TopPage: React.FC = () => {

  // Get the context
  const { dispatch, state } = useContext(Context);

  // Retrieve NFT info when component loaded
  useEffect( () => {
    fetchNfts(dispatch);
  }, [dispatch]);

  return (
    <>
      {state.isLoading && <LoadingSpinner />}
      <H1>
        Buy your collectibles <br />
        stamp to send your <br />
        ternoa capsules.
      </H1>
      <H4>Featured Creators</H4>
      <Carousel nftList={state.nftList} />
      <H4>Top Collectors</H4>
      <Carousel nftList={state.nftList} />
      <H4>Popular Creations</H4>
      <Carousel nftList={state.nftList} />
    </>
  );
};

export default TopPage;
