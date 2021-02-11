import React from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';

const DottedBox = styled.div`
  background: #ffffff;
  border: 1px dashed #c1c1c1;
  box-sizing: border-box;
  border-radius: 8px;
  margin: 10px;
  padding: 10px;
  text-align:center;
`;

type UploadBoxType= {
  subTitle: string;
  key?: string;
};

const UploadBox: React.FC<UploadBoxType> = (props) => (
  <DottedBox>
    <p>{props.subTitle}</p>
    <Button key={props.key} primary>Upload</Button>
  </DottedBox>
);

export default UploadBox;
