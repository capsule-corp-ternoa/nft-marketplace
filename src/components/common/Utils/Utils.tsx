/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

type GoBackType = {
  history: any;
  text: string;
};
export const GoBack: React.FC<GoBackType> = (props) => (
  <div style={{ cursor: 'pointer' }}>
    <FaArrowLeft /> &nbsp;
    <span style={{ verticalAlign: 'top' }} role="button" tabIndex={0} onClick={() => props.history.goBack()}>{props.text}</span>
  </div>
);

