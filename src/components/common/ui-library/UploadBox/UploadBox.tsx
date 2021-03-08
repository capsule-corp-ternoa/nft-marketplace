/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';
import Input from '../Input/Input';

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
  onChange: any;
  name: string;
};

const UploadBox: React.FC<UploadBoxType> = (props) => {
  
  const inputUploadRef = useRef<HTMLInputElement>(null);

  const openFile = () => {
    inputUploadRef.current?.click();
  };
  
  return (
    <DottedBox>
      { props.subTitle && <p>{props.subTitle}</p>}

      <Input 
        ref={inputUploadRef} 
        type="file" 
        style={{ display: 'none' }} 
        onChange={props.onChange}
        name={props.name}
        accept="image/*" 
      />

      <Button onClick={openFile} primary>
        Upload
      </Button>

    </DottedBox>
  );
};

export default UploadBox;
