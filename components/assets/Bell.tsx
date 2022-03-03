import React from 'react'

interface BellProps {
  className?: string
}

const Bell = ({ className }: BellProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 18 21">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.71429 1.47725C7.71429 1.47725 1.28571 1.47725 1.28571 13.0583L0 14.3451C0 17.8032 18 17.8836 18 14.3451L16.7143 13.0583C16.7143 1.47725 10.2857 1.47725 10.2857 1.47725C10.2857 -0.171485 7.71429 -0.211664 7.71429 1.47725ZM3.85714 13.9268C3.85714 13.9268 3.85714 4.05072 9 4.05072C14.1429 4.05072 14.1429 13.9268 14.1429 13.9268C10.2857 14.3449 7.71429 14.3449 3.85714 13.9268Z"
      fill="#B1B1B1"
    />
    <path
      d="M5.28348 17.8957C6.50893 21.7842 11.4911 21.7439 12.7165 17.8957C10.2857 18.2053 7.71429 18.2053 5.28348 17.8957Z"
      fill="#B1B1B1"
    />
  </svg>
)

export default Bell
