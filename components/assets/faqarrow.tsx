import React from 'react'

interface ArrProps {
  className?: string
  onClick?: React.MouseEventHandler<SVGSVGElement>
}

const Arr = ({ className, onClick }: ArrProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} onClick={onClick} fill="none" viewBox="0 0 20 20">
    <path
      fill="#0C0B0B"
      d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zM8 14.5v-9l6 4.5-6 4.5z"
    ></path>
  </svg>
)

export default Arr
