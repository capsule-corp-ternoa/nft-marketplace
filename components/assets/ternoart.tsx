import React from 'react';

interface TernoartProps {
  className: string;
}

const Ternoart: React.FC<TernoartProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 182 247"
  >
    <g fillRule="evenodd" clipRule="evenodd" filter="url(#filter0_fTRNT)">
      <path
        fill="#C3A2EE"
        d="M9.936 46.034C9.936 25.58 27.114 9 48.304 9h86.328C155.822 9 173 25.58 173 46.034V200.34c0 20.453-17.178 37.034-38.368 37.034H48.304c-21.19 0-38.368-16.581-38.368-37.034V46.034zm38.368-24.69c-14.127 0-25.578 11.054-25.578 24.69V200.34c0 13.636 11.452 24.689 25.578 24.689h86.328c14.127 0 25.579-11.053 25.579-24.689V46.034c0-13.636-11.452-24.69-25.579-24.69H48.304z"
      ></path>
      <path
        fill="url(#paint0_linearTRNT)"
        d="M9.936 46.034C9.936 25.58 27.114 9 48.304 9h86.328C155.822 9 173 25.58 173 46.034V200.34c0 20.453-17.178 37.034-38.368 37.034H48.304c-21.19 0-38.368-16.581-38.368-37.034V46.034zm38.368-24.69c-14.127 0-25.578 11.054-25.578 24.69V200.34c0 13.636 11.452 24.689 25.578 24.689h86.328c14.127 0 25.579-11.053 25.579-24.689V46.034c0-13.636-11.452-24.69-25.579-24.69H48.304z"
      ></path>
    </g>
    <path
      fill="#fff"
      d="M128.727 109.895c-2.473-2.491-5.83-3.851-9.363-3.851h-53.35c-3.474 0-6.772 1.303-9.186 3.681-2.474 2.379-3.828 5.55-3.828 8.891 0 5.663 4.004 10.646 9.716 12.118 1.06.283 2.179.397 3.298.397h10.07c2.06 0 3.709 1.585 3.709 3.567v35.223c0 .453 0 .963.059 1.416.765 6.399 6.242 11.099 12.955 11.099h.294c7.008-.17 12.72-5.89 12.72-12.798v-34.94c0-1.982 1.648-3.567 3.709-3.567h9.54c7.066 0 13.073-5.437 13.308-12.062.118-3.454-1.178-6.682-3.651-9.174zM90.689 98.228c9.529 0 17.253-7.428 17.253-16.592 0-9.163-7.724-16.592-17.253-16.592s-17.254 7.429-17.254 16.592c0 9.164 7.725 16.592 17.254 16.592z"
    ></path>
    <path
      fill="#7417EA"
      fillRule="evenodd"
      d="M91 182.828h.101c7.008-.17 12.72-5.889 12.72-12.798v-34.939c0-1.982 1.648-3.568 3.709-3.568h9.54c7.066 0 13.073-5.436 13.308-12.062.118-3.454-1.178-6.682-3.651-9.173-2.473-2.492-5.83-3.851-9.363-3.851H91v76.391zm0-84.605c9.385-.16 16.942-7.526 16.942-16.59 0-9.063-7.557-16.429-16.942-16.589v33.18z"
      clipRule="evenodd"
    ></path>
    <defs>
      <filter
        id="filter0_fTRNT"
        width="181.064"
        height="246.375"
        x="0.936"
        y="0"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
        <feBlend
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        ></feBlend>
        <feGaussianBlur
          result="effect1_foregroundBlur"
          stdDeviation="4.5"
        ></feGaussianBlur>
      </filter>
      <linearGradient
        id="paint0_linearTRNT"
        x1="91.468"
        x2="91.468"
        y1="9"
        y2="237.375"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.271" stopColor="#fff"></stop>
        <stop offset="0.938" stopColor="#fff" stopOpacity="0"></stop>
      </linearGradient>
    </defs>
  </svg>
);

export default Ternoart;
