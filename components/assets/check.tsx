import React from 'react';

interface CheckProps {
  className: string;
}

const Check: React.FC<CheckProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 20 20"
  >
    <path
      fill="#0C0B0B"
      d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L8 12.17 5.41 9.59 4 11l4 4 8-8-1.41-1.42z"
    ></path>
  </svg>
);

export default Check;
