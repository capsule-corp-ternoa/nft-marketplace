import React from 'react'

interface SoundOnProps {
  className?: string
}

const SoundOn = ({ className }: SoundOnProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 14 13">
    <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
      <g fill="#000000" fillRule="nonzero" transform="translate(-1326 -557)">
        <g transform="translate(1326 557)">
          <g>
            <path d="M8.949.048a.437.437 0 00-.456.036L3.795 3.5H.438A.437.437 0 000 3.938v4.374c0 .242.196.438.438.438h3.357l4.698 3.416a.436.436 0 00.694-.354V.438a.437.437 0 00-.238-.39zM10.969 3.938l-.31-.31-.618.619.309.31a2.22 2.22 0 010 3.137l-.31.31.62.618.309-.31a3.097 3.097 0 000-4.374z"></path>
            <path d="M12.162 2.125l-.619.619.31.31a4.314 4.314 0 011.272 3.071c0 1.16-.451 2.251-1.272 3.072l-.31.309.62.619.308-.31A5.184 5.184 0 0014 6.125a5.184 5.184 0 00-1.529-3.69l-.309-.31z"></path>
          </g>
        </g>
      </g>
    </g>
  </svg>
)

export default SoundOn
