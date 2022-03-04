import React from 'react'

interface ScaleProps {
  className?: string
}

const Scale = ({ className }: ScaleProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24">
    <path d="M21.414 18.586L24 16v8h-8l2.586-2.586-5.172-5.172 2.828-2.828 5.172 5.172zm-13.656-8l2.828-2.828-5.172-5.172L8 0H0v8l2.586-2.586 5.172 5.172zm10.828-8L16 0h8v8l-2.586-2.586-5.172 5.172-2.828-2.828 5.172-5.172zm-8 13.656l-2.828-2.828-5.172 5.172L0 16v8h8l-2.586-2.586 5.172-5.172z"></path>
  </svg>
)

export default Scale
