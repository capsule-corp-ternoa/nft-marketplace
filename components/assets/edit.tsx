import React from 'react'

interface EditProps {
  className?: string
}

const Edit = ({ className }: EditProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 15 15" fill="none">
    <path
      d="M0.315674 11.7581V14.6848H3.24243L11.8744 6.05285L8.94765 3.12609L0.315674 11.7581ZM14.6841 3.24316L11.7573 0.316406L9.78275 2.2988L12.7095 5.22555L14.6841 3.24316Z"
      fill="#0C0B0B"
    />
  </svg>
)

export default Edit
