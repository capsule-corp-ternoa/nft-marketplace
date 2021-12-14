import React from 'react';

interface Props {
  className?: string;
}

const AnimatedLoader = ({ className }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width="200px"
    height="200px"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <circle
      cx="50"
      cy="50"
      fill="none"
      stroke="#ffffff"
      strokeWidth="5"
      r="15"
      strokeDasharray="70.68583470577033 25.561944901923447"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        repeatCount="indefinite"
        dur="1s"
        values="0 50 50;360 50 50"
        keyTimes="0;1"
      ></animateTransform>
    </circle>
  </svg>
);

export default AnimatedLoader;
