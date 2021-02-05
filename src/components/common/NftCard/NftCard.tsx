import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Card from '../ui-library/Card/Card';
import Row from '../ui-library/Row/Row';
import Col from '../ui-library/Col/Col';
import colors from '../ui-library/styles/colors';
import NftImage from '../NftImage/NftImage';

type NftCardType = {
  nft: NftListMockupType;
};

const ImageHolder = styled.div`
  text-align: center;
  display: block;
`;

const DetailsStyled = styled.p`
  color: ${colors.dark_blue};
  font-weight: 'bold';
  font-size: 12px;
  margin-top:0;
`;

const NftCard: React.FC<NftCardType> = (props: NftCardType) => {

  const history = useHistory();

  const moveToDetails = () =>{
    history.push('/details');
  };
    
  return (
    <>
      <Card 
        border={false} 
        clickable={true} 
        shadow={false} 
        onClick={moveToDetails} 
        style={{ padding:'0' }}
      >
        <div>
          {/* Nft image */}
          <ImageHolder>
            
            <NftImage 
              style={{ margin: '10px 0', width: '100%' }}
              alt="nft-image" 
              src={props.nft.image}
            />

          </ImageHolder>
          {/* information */}
          <Row> 
            
            <Col size="70">
              <DetailsStyled>{props.nft.name}</DetailsStyled>
              <DetailsStyled>by {props.nft.creator}</DetailsStyled>
            </Col>

            <Col size="30">
              <DetailsStyled>price</DetailsStyled>
              <DetailsStyled>{props.nft.price}</DetailsStyled>
            </Col>
          </Row>

        </div>
      </Card>
    </>
  );
};

export default NftCard;
