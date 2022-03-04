import React from 'react'

interface UKProps {
  className?: string
  onClick?: React.MouseEventHandler<SVGSVGElement>
}

const UK = ({ className, onClick }: UKProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} onClick={onClick} fill="none" viewBox="0 0 26 17">
    <path fill="#002173" d="M23.067.229H2.608v15.764h20.46V.229z" />
    <path fill="#fff" d="M25.492 14.103L1.096.003.18 2.118l24.398 14.1.915-2.115z" />
    <path
      fill="#C61018"
      d="M.637 1.059l-.305.705 12.199 7.05.305-.705-12.2-7.05zM13.142 7.401l-.305.705 12.2 7.05.304-.705L13.142 7.4z"
    />
    <path fill="#fff" d="M24.58.003L.182 14.103l.915 2.115 24.398-14.1L24.58.003z" />
    <path
      fill="#C61018"
      d="M12.84 8.11L.64 15.16l.305.706 12.2-7.05-.306-.705zM24.732.355l-12.199 7.05.305.705 12.199-7.05-.305-.705z"
    />
    <path fill="#fff" d="M24.772 6.14h-10.23V.23h-3.41V6.14H.904v3.941h10.23v5.912h3.41v-5.912h10.229v-3.94z" />
    <path fill="#C61018" d="M24.772 6.928H13.861v-6.7h-2.046v6.7H.903v2.365h10.912v6.7h2.046v-6.7h10.911V6.928z" />
  </svg>
)

export default UK
