import React, { useContext, useEffect, useState } from 'react';
import { EyeIcon, ShareIcon, HeartIcon } from '../../common/Icons/Icons';
import Col from '../../common/ui-library/Col/Col';
import Row from '../../common/ui-library/Row/Row';
import Button from '../../common/ui-library/Button/Button';
import { H1, H4, SubTitle } from '../../common/Title/Title';
import { fetchOneNft } from '../../../utils/store/dataFetcher';
import { Context } from '../../../utils/store/store';
import { RoundedSpan, SquaredSpan } from '../../common/Shapes/Shapes';
import PurchaseModal from './PurchaseModal/PurchaseModal';
import NftImage from '../../common/NftImage/NftImage';

type DetailsLabelProps = {
  label: string;
  value: string;
};

const DetailsLabel: React.FC<DetailsLabelProps> = (props) => (
  <>
    <H4 style={{ color: '#969393', margin: '0', fontWeight: 'bold' }}>
      {props.label}
    </H4>          
    <div style={{ fontWeight: 'bold', marginBottom: '20px' }}>
      {props.value}
    </div>
  </>

);
const NftDetailsPage: React.FC = () => {

  // Get the context
  const { dispatch, state } = useContext(Context);

  const [displayModal, setDisplayModal] = useState(false);

  // Retrieve NFT info when component loaded
  useEffect(() => {
    fetchOneNft(dispatch);
  }, [dispatch]);

  return (
    <>
      {state.selectedNft && (
        <>

          {displayModal && 
          <PurchaseModal closeModal={() => {setDisplayModal(false);}} />}
          
          <Row>
            {/* NFT image  */}
            <Col small="100" medium="50" large="50">
              <div style={{ textAlign: 'center' }}>
                <NftImage 
                  full={true}
                  alt={state.selectedNft.name} 
                  src={state.selectedNft.image}
                />
              </div>
            </Col>

            {/* NFT details  */}
            <Col small="100" medium="50" large="50">
              <div style={{ margin: '0 auto' }}>
                <H1>{state.selectedNft.name}</H1>
                <Button primary full onClick={() => {setDisplayModal(true);}}>
                  Buy - {state.selectedNft.price}
                </Button>

                <SubTitle style={{ width: '100%', textAlign: 'center' }}>Service fee 2.5%.</SubTitle>

                <div style={{ marginTop: '40px', height: '100px' }}>
                  <SquaredSpan><EyeIcon />
                    {state.selectedNft.views}
                  </SquaredSpan>&nbsp;
                  <RoundedSpan><HeartIcon /></RoundedSpan>&nbsp;
                  <RoundedSpan><ShareIcon /></RoundedSpan>
                </div>

                <div>
                  <DetailsLabel label="Owner" value={state.selectedNft.owner} />
                  <DetailsLabel label="Creator" value={state.selectedNft.creator} />
                  <DetailsLabel label="Type" value={state.selectedNft.collectionName} />
                </div>
              
              </div>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default NftDetailsPage;