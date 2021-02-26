/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import Input from '../ui-library/Input/Input';
import TextArea from '../ui-library/TextArea/TextArea';
import CheckBox from '../ui-library/CheckBox/CheckBox';
import UploadBox from '../ui-library/UploadBox/UploadBox';
import Row from '../ui-library/Row/Row';
import Col from '../ui-library/Col/Col';
import { H3, SubTitle } from '../Title/Title';

const LabelStyled = styled(H3)`
  margin-right:30px;
  font-size: 20px;
  padding-left:0px;
  margin-bottom:10px;
`;

interface InputConfig {
  uid: string;
  label?: string;
  subTitle?: string;
}

interface StandartType extends 
  InputConfig, React.InputHTMLAttributes<HTMLInputElement> {}

interface TextAreaType extends 
  InputConfig, React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

interface SelectType extends InputConfig {
  boxOptions?: any[];
}


// Standard input  (<input type="text"/>)
export const InputBoxStandart: React.FC<StandartType> = (props) => {

  const { 
    label,
    uid,
    subTitle,
    ...rest
  } = props;

  return (
    <>
      {label && <LabelStyled>{label}</LabelStyled> }
      <Input medium light key={uid} {...rest} />
      {subTitle && <SubTitle>{subTitle}</SubTitle>}
    </>
  );

};

// TextArea input (<textarea>)
export const InputBoxTextArea: React.FC<TextAreaType> = (props) => {

  const { 
    label,
    uid,
    subTitle,
    value,
    ...rest
  } = props;

  return (
    <>
      {label && <LabelStyled>{label}</LabelStyled>}
      <TextArea medium light key={uid} {...rest}>{value}</TextArea>
      {subTitle && <SubTitle>{subTitle}</SubTitle>}
    </>
  );
};

// Toggle input
export const InputBoxToggle: React.FC<InputConfig> = (props) => {

  const { 
    label,
    uid,
    subTitle,
  } = props;

  return (
    <Row>
      <Col>
        {label && <LabelStyled>{label}</LabelStyled>}
        {subTitle && <SubTitle>{subTitle}</SubTitle>}
      </Col>
      <Col style={{ paddingTop: '30px' }}>
        <CheckBox name={uid} />
      </Col>
    </Row>
  );
};

// Upload input
export const InputBoxUpload: React.FC<InputConfig> = (props) => {

  const { 
    label,
    uid,
    subTitle,
  } = props;

  return (
    <>
      {label && <LabelStyled>{label}</LabelStyled>}
      <UploadBox key={uid} subTitle={subTitle || ''} />      
    </>
  );
};

// selectBox input
export const InputBoxSelect: React.FC<SelectType> = (props) => {

  const { 
    label,
    uid,
    subTitle,
    boxOptions,
  } = props;

  return (
    <>
      {label && <LabelStyled>{label}</LabelStyled> }
      <Select key={uid} options={boxOptions} />
      {subTitle && <SubTitle>{subTitle}</SubTitle>}
    </>  
  );
};

// Standard input
export const InputBoxProperties: React.FC<InputConfig> = (props) => {

  const { 
    label,
    uid,
    subTitle,
  } = props;

  return (
    <>
      {label && <LabelStyled>{label}</LabelStyled> }
      <Row>
        <Col size="50">
          <Input key={`key-${uid}`} full light />
        </Col>
        <Col size="50">
          <Input key={`value-${uid}`} full light />
        </Col>
      </Row>
      {subTitle && <SubTitle>{subTitle}</SubTitle>}
    </>
     
  );
};