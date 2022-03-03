import { Sizes } from './types'

// For NFT Cards we must ensure a 0.625 ratio
export const sizes: Sizes = {
  cardHeight: {
    xs: '20.6rem',
    sm: '30.4rem',
    md: '40rem',
    lg: '48rem',
    xl: '67.2rem',
  },
  cardWidth: {
    xs: '13rem',
    sm: '19rem',
    md: '25rem',
    lg: '30rem',
    xl: '42rem',
  },
}

const sizesBase = {
  sizes,
}

export default sizesBase
