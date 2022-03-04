import React from 'react'

interface EyeProps {
  className?: string
}

const Eye = ({ className }: EyeProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24">
    <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449S19.748 20 12.015 20C4.835 20 0 11.551 0 11.551S4.446 4 12.015 4C19.709 4 24 11.551 24 11.551zM17 12c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"></path>
  </svg>
)

export default Eye
