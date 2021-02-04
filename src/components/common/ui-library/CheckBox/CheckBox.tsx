import React from 'react';
import { Toggle } from 'react-toggle-component';

// https://github.com/gfazioli/react-toggle/blob/master/src/components/Toggle/index.tsx
const CheckBox: React.FC = () => (
  <Toggle
    leftBackgroundColor="#99a6ed"
    rightBackgroundColor="#1E34A9"
    leftBorderColor="#99a6ed"
    rightBorderColor="#1E34A9"
    knobColor="white"
    name="toggle-3"
  />
  
);

export default CheckBox;