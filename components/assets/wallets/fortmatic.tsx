import React from 'react'

interface FortmaticProps {
  className?: string
}

const Fortmatic = ({ className }: FortmaticProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 27 26">
    <g fill="#617BFF" clipPath="url(#clip0FRTMC)">
      <path d="M19.514 0H0V25.973h6.514V6.54h19.541V.027h-6.541V0z" />
      <path d="M13.055 19.486h6.459V26h.246c1.67 0 3.257-.657 4.434-1.834a6.254 6.254 0 001.833-4.433v-6.706H13.055v6.46z" />
    </g>
    <defs>
      <clipPath id="clip0FRTMC">
        <path fill="#fff" d="M0 0H26.055V26H0z" />
      </clipPath>
    </defs>
  </svg>
)

export default Fortmatic
