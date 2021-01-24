import React from 'react';

import styled from 'styled-components';

import Card from '../ui-library/Card/Card';
import Row from '../ui-library/Row/Row';
import Col from '../ui-library/Col/Col';
import Button from '../ui-library/Button/Button';

type NftCardType = {
  nft: {
    labels: number[];
    name: string;
    quantity: string;
    price: string;
    image: string;
  };
};

const LabelImg = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 5px 0;
  margin-left: -5px;
`;

const NftImg = styled.img`
  height: 200px;
  margin: 10px 0;
`;

const ImageHolder = styled.div`
  text-align: center;
  display: block;
`;

const NftCard: React.FC<NftCardType> = (props: NftCardType) => (
  <>
    <Card border={true} shadow={true}>
      <div className="card-body">
        <Row>
          {/* Category */}
          <Col style={{ textAlign: 'left' }}>
            {props.nft.labels.map((label) => (
              <LabelImg
                alt="blabla"
                key="1"
                src={`${props.nft.image}`}
              />
            ))}
          </Col>
          {/* Menu */}
          <Col style={{ textAlign: 'right' }}>...</Col>
        </Row>
        {/* Nft image */}
        <ImageHolder>
          <NftImg alt="nft-image" src={props.nft.image} />
        </ImageHolder>
        {/* information */}
        <div className="card-title">{props.nft.name}</div>
        <p>
          price : {props.nft.price} / {props.nft.quantity}
        </p>
        <Button value="Buy" />
      </div>
    </Card>
  </>
);

export default NftCard;
