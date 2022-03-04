import { keyframes, Keyframes } from 'styled-components'

export const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opaciy: 1;
  }
`

export const ySlide = (yStart: string, yEnd: string): Keyframes => keyframes`
  0% {
    transform: translateY(${yStart});
  }
  100% {
    transform: translateY(${yEnd});
  }
`

export const scale = (start: string, end: string): Keyframes => keyframes`
  0% {
    transform: scale(${start});
  }
  100% {
    transform: scale(${end});
  }
`
