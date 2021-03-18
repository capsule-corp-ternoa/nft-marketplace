import React from 'react';

interface WalletConnectProps {
  className: string;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 43 27"
  >
    <path
      fill="#006FFF"
      d="M8.74 5.084c6.953-6.77 18.233-6.77 25.202 0l.842.809a.851.851 0 010 1.227l-2.86 2.786a.44.44 0 01-.625 0L30.153 8.78c-4.85-4.72-12.732-4.72-17.58 0l-1.235 1.198a.44.44 0 01-.624 0L7.81 7.207a.85.85 0 010-1.228l.93-.895zm31.125 5.775l2.555 2.483a.851.851 0 010 1.227L30.922 25.757a.925.925 0 01-1.263 0l-8.159-7.94a.229.229 0 00-.32 0l-8.158 7.94a.925.925 0 01-1.263 0L.261 14.555a.85.85 0 010-1.227l2.555-2.483a.925.925 0 011.263 0l8.16 7.94a.229.229 0 00.319 0l8.158-7.94a.925.925 0 011.263 0l8.16 7.94a.229.229 0 00.319 0l8.158-7.94a.893.893 0 011.249.014z"
    />
  </svg>
);

export default WalletConnect;
