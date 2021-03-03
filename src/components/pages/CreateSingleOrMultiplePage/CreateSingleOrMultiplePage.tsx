/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { H1 } from '../../common/Title/Title';
import Col from '../../common/ui-library/Col/Col';
import Row from '../../common/ui-library/Row/Row';
import Image from '../../common/ui-library/Image/Image';
import TinyContainer from '../../common/ui-library/TinyContainer/TinyContainer';
import Button from '../../common/ui-library/Button/Button';
import { GoBack } from '../../common/Utils/Utils';
import { 
  InputBoxStandart,
  InputBoxToggle,
  InputBoxUpload,
  InputBoxSelect,
  InputBoxProperties } from '../../common/InputBox/InputBox';

type InitialStateType = { 
  image?: string;
  bidFlag?: boolean;
  priceFlag?: boolean;
  price?: number,
  unlock?: false,
  collection?: string,
  name?: string;
  description?: string;
  royalties?: number;
};

const initialState = { 
  image: '',
  bidFlag: false,
  priceFlag: false,
  price: 0,
  unlock: false,
  collection: '',
  name: '',
  description: '',
  royalties: 0,
};


const PreviewStyled = styled.div`
  width: 90%;
  height:250px;
  border: 1px solid #c1c1c1;
  border-radius: 8px;
`;

const options = [
  { value: 'erc-721', label: 'Create ERC-721' },
  { value: 'tiime', label: 'Ternoa Rare TIIME' },
];

type CreateProps = {
  multiple: boolean;
};

const CreateSingleOrMultiplePage: React.FC<CreateProps> = (props) => {

  const { t } = useTranslation();
  const history = useHistory();

  // Not need to use reducer here, all input values in one JSON object
  // TODO InitialStateType not used 
  const [updateElement, setUpdateElement] = 
    useState(initialState as InitialStateType);

  // Update partial element of the 'updateElement' state
  const updateField = (name: string, value: string) => {
    setUpdateElement({
      ...updateElement,
      [name]: value,
    });
  };

  const createItem = () => {
    // TODO add validation here
    alert(JSON.stringify(updateElement));
  };

  return (
    <TinyContainer>
      
      <Helmet>
        <title>{t('upload.seo.title')}</title>
        <meta name="description" content={t('upload.seo.description')} />
        <meta name="keywords" content={t('upload.seo.keywords')} />
      </Helmet>

      <GoBack history={history} text={t('upload.goBack')} />
      <H1>
        {props.multiple ? t('upload.titleMultiple'):t('upload.title')}
      </H1>

      <Row>
    
        <Col size="70">
          <InputBoxUpload
            label={t('upload.upload')}
            subTitle="PNG, GIF, WEBP, MP4 or MP3. Max 30mb."
            onChange={updateField}
            name="image"
          />

          <InputBoxToggle
            name="bidFlag"
            label={t('upload.putOnSale')}
            onChange={updateField}
            subTitle={t('upload.putOnSaleDetails')}
          />

          <InputBoxToggle
            name="priceFlag"
            onChange={updateField}
            label={t('upload.instantSalePrice')}
            subTitle={t('upload.instantSalePriceDetails')}
          />

          <InputBoxToggle
            onChange={updateField}
            name="unlock"
            label={t('upload.unlock')}
            subTitle={t('upload.unlockDetails')}
          />

          <InputBoxSelect
            name="collection"
            onChange={updateField}
            boxOptions={options}
            label={t('upload.chooseCollection')}
          />

          <InputBoxStandart 
            name="name" 
            onChange={updateField}
            label={t('upload.name')}
          />

          <InputBoxStandart
            name="description"
            onChange={updateField}
            label={t('upload.description')}
          />

          <InputBoxStandart
            name="royalties"
            label={t('upload.royalties')}
            onChange={updateField}
            subTitle={t('upload.royaltiesDetails')}
          />

          <InputBoxProperties
            name="properties"
            onChange={updateField}
            label={t('upload.properties')}
          />

          <br />

          <Button onClick={createItem} primary>{t('upload.createItem')}</Button>
        </Col>

        <Col size="30">
          <PreviewStyled style={{ padding: '10px' }}>
            { updateElement.image && <Image alt="" responsive src={URL.createObjectURL(updateElement.image)} />}
          </PreviewStyled>
        </Col>

      </Row>
    </TinyContainer>
  );
};

export default CreateSingleOrMultiplePage;