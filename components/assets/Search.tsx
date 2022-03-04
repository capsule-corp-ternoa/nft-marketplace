import React from 'react'

interface SearchProps {
  className?: string
}

const Search = ({ className }: SearchProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 15 15" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.3 10.8C8.78528 10.8 10.8 8.78528 10.8 6.3C10.8 3.81472 8.78528 1.8 6.3 1.8C3.81472 1.8 1.8 3.81472 1.8 6.3C1.8 8.78528 3.81472 10.8 6.3 10.8ZM6.3 12.6C9.77939 12.6 12.6 9.77939 12.6 6.3C12.6 2.82061 9.77939 0 6.3 0C2.82061 0 0 2.82061 0 6.3C0 9.77939 2.82061 12.6 6.3 12.6Z"
      fill="#686464"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.3712 14.3712C14.024 14.7185 13.461 14.7185 13.1137 14.3712L9.62877 10.8863C9.28151 10.539 9.28151 9.97603 9.62877 9.62877C9.97603 9.28151 10.539 9.28151 10.8863 9.62877L14.3712 13.1137C14.7185 13.461 14.7185 14.024 14.3712 14.3712Z"
      fill="#686464"
    />
  </svg>
)

export default Search
