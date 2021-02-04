import React, { useEffect, useContext } from 'react';
import { fetchNfts } from '../../../utils/store/dataFetcher';
import { Context } from '../../../utils/store/store';
import Carousel from './Carousel/Carousel';
import { H1, H4 } from '../../common/Title/Title';
import colors from '../../common/ui-library/styles/colors';

const TopPage: React.FC = () => {

  // Get the context
  const { dispatch, state } = useContext(Context);

  // Retrieve NFT info when component loaded
  useEffect( () => {
    fetchNfts(dispatch);
  }, [dispatch]);

  return (
    <>
      <H1>
        Buy your &nbsp;
        <span style={{ color: colors.purple }}>
          collectible stamps &nbsp;
        </span>
        to  <br />
        send your ternoa capsules.
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
