import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FaArrowLeft } from 'react-icons/fa';
import { H1 } from '../../common/Title/Title';
import Col from '../../common/ui-library/Col/Col';
import Row from '../../common/ui-library/Row/Row';
import TinyContainer from '../../common/ui-library/TinyContainer/TinyContainer';
import Button from '../../common/ui-library/Button/Button';
import InputBox, { InputType } from '../../common/InputBox/InputBox';

const PreviewStyled = styled.div`
  width: 90%;
  height:250px;
  border: 1px solid #c1c1c1;
  border-radius: 8px;
`;

const options = [
  { value: 'chocolate', label: 'Create ERC-721' },
  { value: 'strawberry', label: 'Ternoa Rare TIIME' },
];

const CreateSingleCollectiblePage: React.FC = () => {

  const { t } = useTranslation();

  return (
    <TinyContainer>
      <span>
        <FaArrowLeft />
        <span>{t('upload.goBack')}</span>
      </span>

      <H1>{t('upload.title')}</H1>

      <Row>
    
        <Col size="70">
          <InputBox
            inputType={InputType.Upload}
            key="create_upload"
            label={t('upload.upload')}
            subTitle="PNG, GIF, WEBP, MP4 or MP3. Max 30mb."
          />

          <InputBox
            inputType={InputType.Switch}
            key="create_bids"
            label={t('upload.putOnSale')}
            subTitle={t('upload.putOnSaleDetails')}
          />

          <InputBox
            inputType={InputType.Switch}
            key="create_price"
            label={t('upload.instantSalePrice')}
            subTitle={t('upload.instantSalePriceDetails')}
          />

          <InputBox
            inputType={InputType.Switch}
            key="create_unlock"
            label={t('upload.unlock')}
            subTitle={t('upload.unlockDetails')}
          />

          <InputBox
            inputType={InputType.BoxSelection}
            key="create_unlock_2"
            boxOptions={options}
            label={t('upload.chooseCollection')}
          />

          <InputBox 
            inputType={InputType.Standard} 
            key="create_name" 
            label={t('upload.name')}
          />

          <InputBox
            inputType={InputType.Standard}
            key="create_description"
            label={t('upload.description')}
          />

          <InputBox
            inputType={InputType.Standard}
            key="create_Royalties"
            label={t('upload.royalties')}
            subTitle={t('upload.royaltiesDetails')}
          />

          <InputBox
            inputType={InputType.Properties}
            key="create_properties"
            label={t('upload.properties')}
          />

          <br />

          <Button primary>{t('upload.createItem')}</Button>
        </Col>
        <Col size="30">
          <PreviewStyled />
        </Col>
      </Row>
    </TinyContainer>
  );
};

export default CreateSingleCollectiblePage;