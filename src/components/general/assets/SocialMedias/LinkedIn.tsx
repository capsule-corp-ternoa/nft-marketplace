import React from 'react';

interface LinkedInProps {
  className: string;
  onClick: React.MouseEventHandler<SVGSVGElement>;
}

const LinkedIn: React.FC<LinkedInProps> = ({ className, onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    onClick={onClick}
    fill="none"
    viewBox="0 0 20 24"
  >
    <path
      fill="#fff"
      d="M19.469 23.28h.004v-8.496c0-4.157-.753-7.356-4.838-7.356-1.963 0-3.282 1.28-3.819 2.497h-.057V7.817H6.888V23.28h4.031v-7.659c0-2.018.32-3.967 2.419-3.967 2.069 0 2.1 2.302 2.1 4.094v7.532h4.03zM.32 7.817h4.038V23.28H.32V7.817zM2.339.118C1.046.118 0 1.362 0 2.9s1.046 2.81 2.339 2.81S4.678 4.433 4.678 2.9C4.674 1.362 3.628.118 2.339.118z"
    />
  </svg>
);

export default LinkedIn;
