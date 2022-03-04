import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'

import { Colors } from 'style/theme/types'

interface Props {
  className?: string
  color?: keyof Colors
  useLottie?: boolean
  size?: 'small' | 'medium'
}

const Loader = ({ className, color = 'invertedContrast', useLottie = false, size }: Props) => {
  const ref = useRef(null)
  const [lottie, setLottie] = useState<any>(null)
  const [lottieLoaded, setLottieLoaded] = useState(false)

  useEffect(() => {
    let shouldImport = true
    if (useLottie) {
      import('lottie-web').then((Lottie) => {
        if (shouldImport) {
          setLottie(Lottie.default)
        }
      })
    }
    return () => {
      shouldImport = false
    }
  }, [useLottie])

  useEffect(() => {
    let shouldUpdate = true
    const getLottieLoader = async () => {
      try {
        if (lottie && ref.current) {
          const animation = await lottie.loadAnimation({
            container: ref.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: color === 'contrast' ? '/lottieLoaderBlack.json' : '/lottieLoaderWhite.json',
          })
          if (shouldUpdate) return () => animation.destroy()
        }
      } catch (error) {
        console.log(error)
      }
    }

    const timer = setTimeout(() => {
      return
    }, 2000)
    getLottieLoader()
    if (shouldUpdate) setLottieLoaded(true)

    return () => {
      shouldUpdate = false
      clearTimeout(timer)
    }
  }, [color, lottie])

  return useLottie && lottieLoaded ? (
    <LottieLoaderContainer className={className} ref={ref} size={size} />
  ) : (
    <LoaderContainer className={className} color={color} size={size}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </LoaderContainer>
  )
}

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const LottieLoaderContainer = styled.div<{ size?: 'small' | 'medium' }>`
  height: ${({ size }) => (size === 'small' ? '2.4rem' : size === 'medium' ? '3.2rem' : '6.4rem')};
  width: ${({ size }) => (size === 'small' ? '2.4rem' : size === 'medium' ? '3.2rem' : '6.4rem')};
  align-self: center;
  margin: 0 auto;
`

const LoaderContainer = styled.div<{ color: keyof Colors; size?: 'small' | 'medium' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: ${({ size }) => (size === 'small' ? '1.6rem' : size === 'medium' ? '2rem' : '8rem')};
  height: ${({ size }) => (size === 'small' ? '1.6rem' : size === 'medium' ? '2rem' : '8rem')};

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: ${({ size }) => (size === 'small' ? '1.6rem' : size === 'medium' ? '2rem' : '6.4rem')};
    height: ${({ size }) => (size === 'small' ? '1.6rem' : size === 'medium' ? '2rem' : '6.4rem')};
    border: ${({ size }) => (size === 'small' ? '0.2rem solid' : size === 'medium' ? '0.3rem solid' : '0.8rem solid')};
    border-radius: 50%;
    animation: ${rotation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${({ color, theme }) => `${theme.colors[color]} transparent transparent transparent`};

    &:nth-child(1) {
      animation-delay: -0.45s;
    }

    &:nth-child(2) {
      animation-delay: -0.3s;
    }

    &:nth-child(3) {
      animation-delay: -0.15s;
    }
  }
`

export default Loader
