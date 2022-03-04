import React from 'react'

interface JapanProps {
  className?: string
  onClick?: React.MouseEventHandler<SVGSVGElement>
}

const Japan = ({ className, onClick }: JapanProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} onClick={onClick} fill="none" viewBox="0 0 22 17">
    <path fill="#fff" d="M21.78 0H.36v16.214h21.42V0z" />
    <path
      fill="#C00026"
      d="M11.07 12.16c1.973 0 3.57-1.815 3.57-4.053 0-2.239-1.598-4.054-3.57-4.054-1.97 0-3.57 1.815-3.57 4.054 0 2.238 1.6 4.053 3.57 4.053z"
    />
  </svg>
)

export default Japan
