import React from 'react';
import styled from 'styled-components';
import Input from '../ui-library/Input/Input';
import TextArea from '../ui-library/TextArea/TextArea';
import { H3 } from '../Title/Title';

const LabelStyled = styled(H3)`
  margin-right:30px;
  font-size: 20px;
  padding-left:0px;
  margin-bottom:10px;
`;

export enum InputType {
  Standard,
  TextBox
}

type InputElementType = {
  inputType: InputType;
  label: string;
  key: string;
  subTitle?: string;
};

const SubTitleStyled = styled.p`
  color: #969393;
  font-size: 12px;
  margin-top:0px;
`;

/** Box that contains Input (text, teaxarea,...) with label, and prefix/ suffix */
const InputBox: React.FC<InputElementType> = (props) => (
  <>
    <LabelStyled>{props.label}</LabelStyled>
    {props.inputType === InputType.Standard && (
      <Input medium light key={props.key} />
    )}
    {props.inputType === InputType.TextBox && (
      <TextArea medium light key={props.key} />
    )}
    {props.subTitle && <SubTitleStyled>{props.subTitle}</SubTitleStyled>}
  </>
);

export default InputBox;