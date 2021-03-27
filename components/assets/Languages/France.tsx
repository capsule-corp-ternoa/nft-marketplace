import React from 'react';

interface FranceProps {
  className: string;
  onClick: React.MouseEventHandler<SVGSVGElement>;
}

const France: React.FC<FranceProps> = ({ className, onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    onClick={onClick}
    fill="none"
    viewBox="0 0 22 17"
  >
    <path fill="#E80C20" d="M21.65 0h-8.032v16.214h8.033V0z" />
    <path fill="#fff" d="M13.618 0H8.263v16.214h5.355V0z" />
    <path fill="#002A94" d="M8.263 0H.231v16.214h8.032V0z" />
  </svg>
);

export default France;
