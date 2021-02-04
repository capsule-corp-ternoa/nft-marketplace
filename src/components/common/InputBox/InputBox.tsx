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

type InputElementType = {
  inputType: InputType;
  label: string;
  key: string;
  subTitle?: string;
  boxOptions?: any[];
};

/** Box that contains Input (text, teaxarea,...) with label, and prefix/ suffix */
const InputBox: React.FC<InputElementType> = (props) => (
  <>
    {props.inputType === InputType.Standard && (
      <>
        <LabelStyled>{props.label}</LabelStyled>
        <Input medium light key={props.key} />
        {props.subTitle && <SubTitle>{props.subTitle}</SubTitle>}
      </>
    )}
    {props.inputType === InputType.TextBox && (
      <>
        <LabelStyled>{props.label}</LabelStyled>
        <TextArea medium light key={props.key} />
        {props.subTitle && <SubTitle>{props.subTitle}</SubTitle>}
      </>
    )}
    {props.inputType === InputType.Switch && (
      <Row>
        <Col>
          <LabelStyled>{props.label}</LabelStyled>
          {props.subTitle && <SubTitle>{props.subTitle}</SubTitle>}
        </Col>
        <Col style={{ paddingTop: '30px' }}>
          <CheckBox />
        </Col>
      </Row>
    )}
    {props.inputType === InputType.Upload && (
      <>
        <LabelStyled>{props.label}</LabelStyled>
        <UploadBox subTitle={props.subTitle || ''} />
      </>
    )}
    {props.inputType === InputType.Properties && (
      <>
        <LabelStyled>{props.label}</LabelStyled>
        <Row>
          <Col size="50">
            <Input full light key={props.key} />
          </Col>
          <Col size="50">
            <Input full light key={props.key} />
          </Col>
        </Row>
        {props.subTitle && <SubTitle>{props.subTitle}</SubTitle>}
      </>
    )}

    {props.inputType === InputType.BoxSelection && (
      <>
        <LabelStyled>{props.label}</LabelStyled>
        <Select options={props.boxOptions} />
      </>
    )}
  </>
);

export default InputBox;