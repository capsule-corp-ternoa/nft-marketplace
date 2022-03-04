import React from 'react'
import styled, { css, keyframes } from 'styled-components'

const ModalLoader = () => (
  <SLoaderContainer>
    <SDot />
    <SDot />
    <SDot />
  </SLoaderContainer>
)

const SLoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const yPingPong = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`

const yPingPongAnimation = css`
  animation: ${yPingPong} 0.8s cubic-bezier(0.25, 1, 0.5, 1) infinite;
`

const SDot = styled.span`
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.invertedContrast};
  margin: 0 0.4rem;
  ${yPingPongAnimation};

  &:nth-child(2) {
    animation-delay: 100ms;
  }

  &:nth-child(3) {
    animation-delay: 200ms;
  }
`

export default ModalLoader
