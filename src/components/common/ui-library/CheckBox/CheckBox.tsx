/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Toggle } from 'react-toggle-component';

type CheckBoxType= {
  name: string;
  onToggle: any;
};

// https://github.com/gfazioli/react-toggle/blob/master/src/components/Toggle/index.tsx
const CheckBox: React.FC<CheckBoxType> = (props) => (
  <Toggle
    leftBackgroundColor="#99a6ed"
    rightBackgroundColor="#1E34A9"
    leftBorderColor="#99a6ed"
    rightBorderColor="#1E34A9"
    knobColor="white"
    name={props.name}
    onToggle={props.onToggle}
  />
  
);

export default CheckBox;