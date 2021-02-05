import React from 'react';
import styled from 'styled-components';
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

const CreateSingleCollectiblePage: React.FC = () => (
  <TinyContainer>
    <span>
      <FaArrowLeft />
      <span>Manage collectible type</span>
    </span>

    <H1>Create single collectible</H1>

    <Row>
    
      <Col size="70">
        <InputBox
          inputType={InputType.Upload}
          key="create_upload"
          label="Upload"
          subTitle="PNG, GIF, WEBP, MP4 or MP3. Max 30mb."
        />

        <InputBox
          inputType={InputType.Switch}
          key="create_bids"
          label="Put on sale"
          subTitle="You’ll receive bids on this item"
        />

        <InputBox
          inputType={InputType.Switch}
          key="create_price"
          label="Instant sale price"
          subTitle="Enter the price for which the item will be instantly sold"
        />

        <InputBox
          inputType={InputType.Switch}
          key="create_unlock"
          label="Unlock once purchased"
          subTitle="Content will be unlocked after successful transaction"
        />

        <InputBox
          inputType={InputType.BoxSelection}
          key="create_unlock_2"
          boxOptions={options}
          label="Unlock once purchased"
          subTitle="Content will be unlocked after successful transaction"
        />

        <InputBox 
          inputType={InputType.Standard} 
          key="create_name" 
          label="Name"
        />

        <InputBox
          inputType={InputType.Standard}
          key="create_description"
          label="Description"
        />

        <InputBox
          inputType={InputType.Standard}
          key="create_Royalties"
          label="Royalties"
          subTitle="Suggested: 10%, 20%, 30%"
        />

        <InputBox
          inputType={InputType.Properties}
          key="create_properties"
          label="Properties (Optional)"
        />

        <br />

        <Button primary>Create item</Button>
      </Col>
      <Col size="30">
        <PreviewStyled />
      </Col>
    </Row>
  </TinyContainer>
);

export default CreateSingleCollectiblePage;