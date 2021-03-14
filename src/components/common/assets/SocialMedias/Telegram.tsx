import React from 'react';

interface TelegramProps {
  className: string;
  onClick: React.MouseEventHandler<SVGSVGElement>;
}

const Telegram: React.FC<TelegramProps> = ({ className, onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    onClick={onClick}
    fill="none"
    viewBox="0 0 24 24"
  >
    <g clipPath="url(#clip0TELE)">
      <path
        fill="#fff"
        d="M9.168 15.382l-.388 6.465c.552 0 .794-.282 1.082-.624l2.592-2.947 5.371 4.679c.986.651 1.68.31 1.944-1.08l3.528-19.656c.315-1.727-.525-2.405-1.483-1.976L1.085 9.683c-1.415.65-1.392 1.59-.242 2.013l5.298 1.96L18.45 4.493c.58-.456 1.105-.206.671.255L9.168 15.382z"
      />
    </g>
    <defs>
      <clipPath id="clip0TELE">
        <path
          fill="#fff"
          d="M0 0H23.366V23.163H0z"
          transform="translate(0 .118)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default Telegram;
