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
  label?: string;
  subTitle?: string;
}

interface InputConfigUpload extends 
  InputConfig, React.InputHTMLAttributes<HTMLInputElement>{
  onChange: any;
  name: string;
}

interface StandartType extends 
  InputConfig, React.InputHTMLAttributes<HTMLInputElement> {
  onChange: any,
}

interface TextAreaType extends 
  InputConfig, React.InputHTMLAttributes<HTMLTextAreaElement> {
  onChange: any,
}

interface ToggleType extends 
  InputConfig, React.InputHTMLAttributes<HTMLInputElement> {
  onChange: any,
  name: string,
}

interface TextAreaType extends 
  InputConfig, React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

interface SelectType extends 
  InputConfig, React.InputHTMLAttributes<HTMLInputElement> {
  boxOptions?: any[],
  onChange: any,
}


export const InputBoxStandart: React.FC<StandartType> = (props) => {

  const { 
    label,
    subTitle,
    onChange,
    ...rest
  } = props;

  const updateField = 
  (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(
      e.target.name, 
      e.target.value);
  };

  return (
    <>
      {label && <LabelStyled>{label}</LabelStyled> }
      <Input medium onChange={updateField} light {...rest} />
      {subTitle && <SubTitle>{subTitle}</SubTitle>}
    </>
  );

};

// TextArea input (<textarea>)
export const InputBoxTextArea: React.FC<TextAreaType> = (props) => {

  const { 
    label,
    subTitle,
    value,
    onChange,
    ...rest
  } = props;

  const updateField = 
  (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(
      e.target.name, 
      e.target.value);
  };
  return (
    <>
      {label && <LabelStyled>{label}</LabelStyled>}
      <TextArea onChange={updateField} medium light {...rest}>{value}</TextArea>
      {subTitle && <SubTitle>{subTitle}</SubTitle>}
    </>
  );
};

// Toggle input
export const InputBoxToggle: React.FC<ToggleType> = (props) => {

  const { 
    label,
    subTitle,
    name,
    onChange,
  } = props;

  const updateField = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.name, e.target.checked);
  };

  return (
    <Row>
      <Col>
        {label && <LabelStyled>{label}</LabelStyled>}
        {subTitle && <SubTitle>{subTitle}</SubTitle>}
      </Col>
      <Col style={{ paddingTop: '30px' }}>
        <CheckBox name={name} onToggle={updateField} />
      </Col>
    </Row>
  );
};

// Upload input
export const InputBoxUpload: React.FC<InputConfigUpload> = (props) => {

  const { 
    label,
    subTitle,
    onChange,
    name,
  } = props;

  const updateField = 
  (e: any) => {
    onChange(
      e.target.name, 
      e.target.files[0]);
  };

  return (
    <>
      {label && <LabelStyled>{label}</LabelStyled>}
      <UploadBox name={name} onChange={updateField} subTitle={subTitle || ''} />      
    </>
  );
};

// selectBox input
export const InputBoxSelect: React.FC<SelectType> = (props) => {

  const { 
    label,
    subTitle,
    boxOptions,
    onChange,
    name,
  } = props;

  const updateField = (e: {label: string, value: string}) => {
    onChange(
      name, 
      e.value);
  };

  return (
    <>
      {label && <LabelStyled>{label}</LabelStyled> }
      <Select onChange={updateField} options={boxOptions} />
      {subTitle && <SubTitle>{subTitle}</SubTitle>}
    </>  
  );
};

// Standard input for properties
export const InputBoxProperties: React.FC<StandartType> = (props) => {

  const { 
    label,
    subTitle,
    name,
  } = props;

  return (
    <>
      {label && <LabelStyled>{label}</LabelStyled> }
      <Row>
        <Col size="50">
          <Input key={`key-${name}`} full light />
        </Col>
        <Col size="50">
          <Input key={`value-${name}`} full light />
        </Col>
      </Row>
      {subTitle && <SubTitle>{subTitle}</SubTitle>}
    </>
     
  );
};