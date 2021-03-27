import React from 'react';

interface SoundOffProps {
  className: string;
}

const SoundOff: React.FC<SoundOffProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 12 12"
  >
    <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
      <g fill="#000000" fillRule="nonzero" transform="translate(-608 -1113)">
        <g transform="translate(608 1113)">
          <path d="M5.284 8.838L8.7 11.4a.497.497 0 00.524.047A.5.5 0 009.5 11V4.621L5.284 8.837zM1 8.5h2.5l6-6V1a.5.5 0 00-.8-.4L4.834 3.5H1a.5.5 0 00-.5.5v4a.5.5 0 00.5.5z"></path>
          <path d="M.5 12a.499.499 0 01-.354-.854l11-11a.5.5 0 11.707.708l-11 11A.499.499 0 01.5 12z"></path>
        </g>
      </g>
    </g>
  </svg>
);

export default SoundOff;
