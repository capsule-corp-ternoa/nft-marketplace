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

export enum InputType {
  Standard,
  TextBox,
  Switch,
  Upload,
  Properties,
  BoxSelection
}

type InputElementType = React.InputHTMLAttributes<HTMLInputElement> & {
  inputType: InputType;
  label: string;
  key: string;
  subTitle?: string;
  boxOptions?: any[];
  value?: string;
};

/** Box that contains Input (text, teaxarea,...) with label, and prefix/ suffix */
const InputBox: React.FC<InputElementType> = (props) => {

  const { 
    inputType,
    label,
    key,
    subTitle,
    boxOptions,
    value,
  } = props;

  return (
    <>
      {inputType === InputType.Standard && (
      <>
        <LabelStyled>{label}</LabelStyled>
        <Input medium light key={key} value={value} />
        {subTitle && <SubTitle>{subTitle}</SubTitle>}
      </>
      )}
      {inputType === InputType.TextBox && (
      <>
        <LabelStyled>{label}</LabelStyled>
        <TextArea medium light key={key}>{value}</TextArea>
        {subTitle && <SubTitle>{subTitle}</SubTitle>}
      </>
      )}
      {inputType === InputType.Switch && (
      <Row>
        <Col>
          <LabelStyled>{label}</LabelStyled>
          {subTitle && <SubTitle>{subTitle}</SubTitle>}
        </Col>
        <Col style={{ paddingTop: '30px' }}>
          <CheckBox />
        </Col>
      </Row>
      )}
      {inputType === InputType.Upload && (
      <>
        <LabelStyled>{label}</LabelStyled>
        <UploadBox subTitle={subTitle || ''} />
      </>
      )}
      {inputType === InputType.Properties && (
      <>
        <LabelStyled>{label}</LabelStyled>
        <Row>
          <Col size="50">
            <Input full light key={key} />
          </Col>
          <Col size="50">
            <Input full light key={key} />
          </Col>
        </Row>
        {subTitle && <SubTitle>{subTitle}</SubTitle>}
      </>
      )}

      {inputType === InputType.BoxSelection && (
      <>
        <LabelStyled>{label}</LabelStyled>
        <Select options={boxOptions} />
      </>
      )}
    </>
  );
};

export default InputBox;