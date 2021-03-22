import React from 'react';

interface EditProps {
  className: string;
}

const Edit: React.FC<EditProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
  >
    <path d="M14.078 4.232L1.438 16.871 0 24l7.127-1.438 12.641-12.64-5.69-5.69zM3.709 19.125l-.85-.85L14 7.15l.849.849-11.14 11.126zm2.008 2.008l-.85-.85L16.008 9.158l.85.85L5.717 21.133zM24 5.689l-2.816 2.818-5.691-5.691L18.309 0 24 5.689z"></path>
  </svg>
);

export default Edit;
