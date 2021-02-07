import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { fetchNfts } from '../../../utils/store/dataFetcher';
import { Context } from '../../../utils/store/store';
import Carousel from './Carousel/Carousel';
import { H1, H4 } from '../../common/Title/Title';
import colors from '../../common/ui-library/styles/colors';

const GradientText = styled.span`
    background-color: #f3ec78;
    background-image: ${colors.purple_gradient};
    background-size: 100%;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent; 
    -moz-text-fill-color: transparent;
`;

const TopPage: React.FC = () => {

  const { t } = useTranslation();

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
        <GradientText>
          collectible stamps &nbsp;
        </GradientText>
        to  <br />
        send your ternoa capsules.
      </H1>

      <H4>{t('topPage.categoryTitle')}</H4>
      <Carousel nftList={state.nftList} />

      <H4>{t('topPage.topCollector')}</H4>
      <Carousel nftList={state.nftList} />
      
      <H4>{t('topPage.popularCreations')}</H4>
      <Carousel nftList={state.nftList} />
    </>
  );
};

export default TopPage;
