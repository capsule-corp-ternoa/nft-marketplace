import React from 'react';

interface ArrowRightProps {
  className: string;
}

const ArrowRight: React.FC<ArrowRightProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 10 16"
  >
    <path
      fill="#080809"
      d="M.867 14.097l1.336 1.328L9.62 8 2.195.575.867 1.902 6.965 8 .867 14.097z"
    />
  </svg>
);

export default ArrowRight;
