import React from 'react';

const Button: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props
) => (
  <>
    <input type="button" {...props} />
  </>
);

export default Button;
