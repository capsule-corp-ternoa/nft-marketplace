import React from 'react'

interface CopyPasteProps {
  className?: string
}

const CopyPaste = ({ className }: CopyPasteProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24">
    <path d="M22 6v16H6V6h16zm2-2H4v20h20V4zM0 21V0h21v2H2v19H0z"></path>
  </svg>
)

export default CopyPaste
