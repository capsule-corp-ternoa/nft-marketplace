import React from 'react'
import theme from 'style/theme'

interface BadgeProps {
  className?: string
}

const Badge = ({ className }: BadgeProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 13 13">
    <g clipPath="url(#clip0_4184_18562)">
      <rect
        x="1.44038"
        y="1.7814"
        width="9.91751"
        height="9.9003"
        rx="4.95015"
        fill={theme.colors.primary500}
        stroke="white"
        strokeWidth="1.54961"
      />
      <path
        d="M5.07615 6.88575L6.03548 7.84364L7.95414 5.92786"
        stroke="white"
        strokeWidth="0.770017"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_4184_18562">
        <rect width="11.4671" height="11.777" fill="white" transform="translate(0.665573 0.679443)" />
      </clipPath>
    </defs>
  </svg>
)

export default Badge
