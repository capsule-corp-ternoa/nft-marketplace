import React, { useEffect, useContext } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styled from 'styled-components';
import { fetchNfts } from '../../../utils/store/dataFetcher';
import { Context } from '../../../utils/store/store';
import Carousel from './Carousel/Carousel';

import DescriptionTitle from '../../common/DescriptionTitle/DescriptionTitle';

const CarouselTitle = styled.h4`
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  margin-left: 20px;
`;

const TopPage: React.FC = () => {

  // Get the context
  const { dispatch, state } = useContext(Context);

  // Retrieve NFT info when component loaded
  useEffect( () => {
    fetchNfts(dispatch);
  }, [dispatch]);

  return (
    <>
      <DescriptionTitle>
        Buy your collectibles <br />
        stamp to send your <br />
        ternoa capsules.
      </DescriptionTitle>

      <CarouselTitle>Featured Creators</CarouselTitle>
      <Carousel nftList={state.nftList} />

      <CarouselTitle>Top Collectors</CarouselTitle>
      <Carousel nftList={state.nftList} />

      <CarouselTitle>Popular Creations</CarouselTitle>
      <Carousel nftList={state.nftList} />
    </>
  );
};

export default TopPage;
