import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { EyeIcon, ShareIcon, HeartIcon } from '../../common/Icons/Icons';
import Col from '../../common/ui-library/Col/Col';
import Row from '../../common/ui-library/Row/Row';
import Image from '../../common/ui-library/Image/Image';
import Button from '../../common/ui-library/Button/Button';
import { H1, H4, SubTitle } from '../../common/Title/Title';
import { RoundedSpan, SquaredSpan } from '../../common/Shapes/Shapes';
import PurchaseModal from './PurchaseModal/PurchaseModal';
import NftImage from '../../common/NftImage/NftImage';
import { ApiProxyUri } from '../../../utils/utils';

type DetailsLabelProps = {
  label: string;
  value: string;
  image?: string;
};

const DetailsLabel: React.FC<DetailsLabelProps> = (props) => (
  
  <Row>
    <Col size="10">
      { props.image && 
      <Image rounded responsive src={props.image} />}
    </Col>
    <Col size="90">
      <H4 style={{ color: '#969393', margin: '0', fontWeight: 'bold' }}>
        {props.label}
      </H4>          
      <div style={{ fontWeight: 'bold', marginBottom: '20px' }}>
        {props.value}
      </div>
    </Col>
  </Row>

);

const NftDetailsPage: React.FC<LoadablePageType> = ( { setIsLoading }) => {

  // Modal for payment
  const [displayModal, setDisplayModal] = useState(false);

  // Nft information
  const [nft, setNft] = useState({} as NftObjectType);

  // Retrieve NFT info when component loaded
  useEffect(  () => {
    async function fetchData() {
      setIsLoading(true);
      const res = await axios.get(`${ApiProxyUri}/nft/1`);
      setNft(res.data.nft);
      setIsLoading(false);
    }
    fetchData();
  }, [setIsLoading]);

  const { t } = useTranslation();

  return (
    <>

      <Helmet>
        <title>{t('details.seo.title')}</title>
        <meta name="description" content={t('details.seo.description')} />
        <meta name="keywords" content={t('details.seo.keywords')} />
      </Helmet>

      {nft && (
        <>

          {displayModal && 
          <PurchaseModal 
            nft={nft} 
            closeModal={() => {setDisplayModal(false);}} 
          />}
          
          <Row>
            {/* NFT image  */}
            <Col small="100" medium="50" large="50">
              <div style={{ textAlign: 'center' }}>
                <NftImage 
                  full={true}
                  alt={nft.name} 
                  src={nft.image}
                />
              </div>
            </Col>

            {/* NFT details  */}
            <Col small="100" medium="50" large="50">
              <div style={{ margin: '0 auto' }}>
                <H1>{nft.name}</H1>
                <Button primary full onClick={() => {setDisplayModal(true);}}>
                  {t('details.buy')} - 
                  {nft.price}
                </Button>

                <SubTitle style={{ width: '100%', textAlign: 'center' }}>
                  Service fee 2.5%.
                </SubTitle>

                <div style={{ marginTop: '40px', height: '100px' }}>
                  <SquaredSpan><EyeIcon />
                    {nft.views}
                  </SquaredSpan>&nbsp;
                  <RoundedSpan><HeartIcon /></RoundedSpan>&nbsp;
                  <RoundedSpan><ShareIcon /></RoundedSpan>
                </div>

                <div>
                  <DetailsLabel 
                    label={t('details.owner')}
                    value={nft.owner}
                    image={nft.ownerPicture}
                  />
                  <DetailsLabel 
                    label={t('details.creator')}
                    value={nft.creator}
                    image={nft.creatorPicture}
                  />
                  <DetailsLabel 
                    label={t('details.type')}
                    value={nft.collectionName}
                  />
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
