import React from 'react';

interface WalletLinkProps {
  className: string;
}

const WalletLink: React.FC<WalletLinkProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 27 26"
  >
    <g clipPath="url(#clip0WL)">
      <path
        fill="#1F57EA"
        d="M13.314 26c7.353 0 13.314-5.82 13.314-13S20.668 0 13.314 0C5.961 0 0 5.82 0 13s5.96 13 13.314 13z"
      />
      <path
        fill="#fff"
        d="M10.124 8.78h6.38c.616 0 1.106.502 1.106 1.105v6.38c0 .616-.503 1.106-1.106 1.106h-6.38a1.107 1.107 0 01-1.106-1.105v-6.38c0-.616.49-1.106 1.106-1.106z"
      />
    </g>
    <defs>
      <clipPath id="clip0WL">
        <path fill="#fff" d="M0 0H26.628V26H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default WalletLink;
