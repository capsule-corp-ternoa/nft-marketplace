import React, { useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Category from './Category/Category';
import NftCard from '../../common/NftCard/NftCard';
import { NftListMockup } from '../../../utils/utils';
import { fetchNfts } from '../../../utils/store/dataFetcher';
import { Context } from '../../../utils/store/store';

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
            <Col key="r" sm={4}>
              <NftCard key="1" nft={nft} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default TopPage;
