import React from 'react';

interface ArrowBottomProps {
  className: string;
}

const ArrowBottom: React.FC<ArrowBottomProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
  >
    <path d="M5 3l3.057-3L20 12 8.057 24 5 21l9-9z"></path>
  </svg>
);

export default ArrowBottom;
