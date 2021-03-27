import React from 'react';

interface ArrowLeftProps {
  className: string;
}

const ArrowLeft: React.FC<ArrowLeftProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 10 16"
  >
    <path
      fill="#080809"
      d="M9.133 1.903L7.798.575.38 8l7.425 7.425 1.328-1.327L3.035 8l6.098-6.097z"
    />
  </svg>
);

export default ArrowLeft;
