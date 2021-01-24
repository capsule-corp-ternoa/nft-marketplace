import React, { useEffect } from 'react';
import Category from './Category/Category';
import NftCard from '../../common/NftCard/NftCard';
import { fetchNfts } from '../../../utils/store/dataFetcher';
import { Context } from '../../../utils/store/store';

import Row  from '../../common/ui-library/Row/Row';
import Col from '../../common/ui-library/Col/Col';
import Container from '../../common/ui-library/Container/Container';

const TopPage: React.FC = () => {

  // Get the context
  const { dispatch, state } = React.useContext(Context);

  // Retrieve NFT info when component loaded
  useEffect( () => {
    fetchNfts(dispatch);
  }, []);

  return (
    <>
      <Category />
      <Container>
        <Row>
          {state.nftList?.map((nft) => (
            <Col key="r" size="one-third">
              <NftCard key="1" nft={nft} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default TopPage;
