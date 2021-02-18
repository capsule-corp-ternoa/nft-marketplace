import React, { useEffect, useContext } from 'react';
import { fetchNfts } from '../../../utils/store/dataFetcher';
import { Context } from '../../../utils/store/store';
import NftCard from '../../common/NftCard/NftCard';
import Col from '../../common/ui-library/Col/Col';
import Row from '../../common/ui-library/Row/Row';
import { H4, GradientText } from '../../common/Title/Title';
import useQuery from '../../../hooks/useQuery';

const SearchPage: React.FC = () => {
 
  // Get the context
  const { dispatch, state } = useContext(Context);

  const query = useQuery();

  useEffect( () => {
    fetchNfts(dispatch);
  }, [dispatch]);

  return (
    <>
      <H4 style={{ margin: '20px' }}>Results for : <GradientText> {query.get('q')} </GradientText></H4>
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