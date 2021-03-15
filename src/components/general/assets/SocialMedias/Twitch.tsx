import React from 'react';

interface TwitchProps {
  className: string;
  onClick: React.MouseEventHandler<SVGSVGElement>;
}

const Twitch: React.FC<TwitchProps> = ({ className, onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    onClick={onClick}
    fill="none"
    viewBox="0 0 19 24"
  >
    <g fill="#fff" clipPath="url(#clip0TWI)">
      <path d="M0 4.149v16.11h4.674v3.021H7.23l2.55-3.022h3.829l5.1-6.04V.119H1.274L0 4.148zM2.974 2.13h14.03V13.21l-2.973 3.524H9.353l-2.547 3.018v-3.018H2.974V2.131z" />
      <path d="M7.652 6.162h1.7v6.04h-1.7v-6.04zM12.33 6.162h1.7v6.04h-1.7v-6.04z" />
    </g>
    <defs>
      <clipPath id="clip0TWI">
        <path
          fill="#fff"
          d="M0 0H18.709V23.163H0z"
          transform="translate(0 .118)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default Twitch;
