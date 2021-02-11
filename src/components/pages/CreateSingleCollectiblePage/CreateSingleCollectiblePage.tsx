import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { H1 } from '../../common/Title/Title';
import Col from '../../common/ui-library/Col/Col';
import Row from '../../common/ui-library/Row/Row';
import TinyContainer from '../../common/ui-library/TinyContainer/TinyContainer';
import Button from '../../common/ui-library/Button/Button';
import { GoBack } from '../../common/Utils/Utils';
import { 
  InputBoxStandart,
  InputBoxToggle,
  InputBoxUpload,
  InputBoxSelect,
  InputBoxProperties } from '../../common/InputBox/InputBox';

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

type CreateProps = {
  multiple: boolean;
};

const CreateSingleCollectiblePage: React.FC<CreateProps> = (props) => {

  const { t } = useTranslation();
  const history = useHistory();

  return (
    <TinyContainer>

      <GoBack history={history} text={t('upload.goBack')} />

      <H1>
        {props.multiple ? t('upload.titleMultiple'):t('upload.title')}
      </H1>

      <Row>
    
        <Col size="70">
          <InputBoxUpload
            uid="create_upload"
            label={t('upload.upload')}
            subTitle="PNG, GIF, WEBP, MP4 or MP3. Max 30mb."
          />

          <InputBoxToggle
            uid="create_bids"
            label={t('upload.putOnSale')}
            subTitle={t('upload.putOnSaleDetails')}
          />

          <InputBoxToggle
            uid="create_price"
            label={t('upload.instantSalePrice')}
            subTitle={t('upload.instantSalePriceDetails')}
          />

          <InputBoxToggle
            uid="create_unlock"
            label={t('upload.unlock')}
            subTitle={t('upload.unlockDetails')}
          />

          <InputBoxSelect
            uid="create_unlock_2"
            boxOptions={options}
            label={t('upload.chooseCollection')}
          />

          <InputBoxStandart 
            uid="create_name" 
            label={t('upload.name')}
          />

          <InputBoxStandart
            uid="create_description"
            label={t('upload.description')}
          />

          <InputBoxStandart
            uid="create_royalties"
            label={t('upload.royalties')}
            subTitle={t('upload.royaltiesDetails')}
          />

          <InputBoxProperties
            uid="create_properties"
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