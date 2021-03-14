import React from 'react';

interface YoutubeProps {
  className: string;
  onClick: React.MouseEventHandler<SVGSVGElement>;
}

const Youtube: React.FC<YoutubeProps> = ({ className, onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    onClick={onClick}
    fill="none"
    viewBox="0 0 28 24"
  >
    <g clipPath="url(#clip0YT)">
      <path
        fill="#fff"
        d="M27.236 3.74c-.321-1.418-1.26-2.536-2.453-2.919C22.61.118 13.905.118 13.905.118S5.202.118 3.023.8C1.853 1.183.892 2.327.57 3.744 0 6.331 0 11.696 0 11.696s0 5.397.574 7.958c.322 1.417 1.261 2.535 2.453 2.918 2.201.708 10.883.708 10.883.708s8.703 0 10.882-.683c1.192-.383 2.131-1.5 2.453-2.918.574-2.586.574-7.957.574-7.957s.013-5.39-.582-7.983zM11.136 16.657V6.74l7.237 4.962-7.237 4.956z"
      />
    </g>
    <defs>
      <clipPath id="clip0YT">
        <path
          fill="#fff"
          d="M0 0H27.811V23.163H0z"
          transform="translate(0 .118)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default Youtube;
