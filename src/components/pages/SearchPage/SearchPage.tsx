import React, { useEffect, useContext } from 'react';
import { fetchNfts } from '../../../utils/store/dataFetcher';
import { Context } from '../../../utils/store/store';
import NftCard from '../../common/NftCard/NftCard';
import Col from '../../common/ui-library/Col/Col';
import Row from '../../common/ui-library/Row/Row';
import { H4, GradientText } from '../../common/Title/Title';

const SearchPage: React.FC = () => {
 
  // Get the context
  const { dispatch, state } = useContext(Context);

  useEffect( () => {
    fetchNfts(dispatch);
  }, [dispatch]);

  return (
    <>
      <H4 style={{ margin: '20px' }}>Results for : <GradientText>{state.searchValue} </GradientText></H4>
      <Row>
        {state.nftList?.map((nft, index) => (
          <NftCard key={nft.id} nft={nft} />
        ))}
        <Col size="20" />
      </Row>
    </>
  );
};

export default SearchPage;