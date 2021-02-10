import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Card from '../ui-library/Card/Card';
import NftImage from '../NftImage/NftImage';

type NftCardType = {
  nft: NftListMockupType;
};

const ImageHolder = styled.div`
  text-align: center;
  display: block;
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

        </div>
      </Card>
    </>
  );
};

export default NftCard;
