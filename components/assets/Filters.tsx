import React from 'react'

interface FiltersProps {
  className?: string
}

const Filters = ({ className }: FiltersProps) => (
  <svg className={className} viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.38889 13H11.6111V10.8333H7.38889V13ZM0 0V2.16667H19V0H0ZM3.16667 7.58333H15.8333V5.41667H3.16667V7.58333Z"
      fill="white"
    />
  </svg>
)

export default Filters
