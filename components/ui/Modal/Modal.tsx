import React from 'react'
import ClickAwayListener from 'react-click-away-listener'
import styled from 'styled-components'

import Icon from '../Icon'
import { MODAL_CONTAINER_VARIANT, MODAL_SHOWCASE_VARIANT } from './constants'
import { MODAL_VARIANT_TYPE } from './interfaces'

export interface ModalProps {
  children?: React.ReactNode
  error?: string
  setExpanded: (b: boolean) => void
  subtitle?: string
  title?: string
  variant?: MODAL_VARIANT_TYPE
}

const Modal: React.FC<ModalProps> = ({
  children,
  error,
  setExpanded,
  subtitle,
  title,
  variant = MODAL_CONTAINER_VARIANT,
}) => (
  <SModalBackground>
    {variant === MODAL_SHOWCASE_VARIANT && (
      <SCloseIconShowcase onClick={() => setExpanded(false)}>
        <Icon name="close" />
      </SCloseIconShowcase>
    )}
    <ClickAwayListener
      onClickAway={() => {
        setExpanded(false)
      }}
    >
      {
        {
          [MODAL_CONTAINER_VARIANT]: (
            <SModalContainer>
              <SCloseIcon onClick={() => setExpanded(false)}>
                <Icon name="close" />
              </SCloseIcon>
              {title && <STitle>{title}</STitle>}
              {subtitle && <SSubtitle>{subtitle}</SSubtitle>}
              {error && <SError>{error}</SError>}
              {!error && children && <SBody>{children}</SBody>}
            </SModalContainer>
          ),
          [MODAL_SHOWCASE_VARIANT]: <>{children}</>,
        }[variant]
      }
    </ClickAwayListener>
  </SModalBackground>
)

const SModalBackground = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 110;
`

const SCloseIcon = styled.div`
  display: flex;
  position: absolute;
  z-index: 130;
  fill: ${({ theme }) => theme.colors.invertedContrast};
  top: 2.4rem;
  right: 2.4rem;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
`

const SCloseIconShowcase = styled(SCloseIcon)`
  top: 5.6rem;
  right: 5.6rem;
  width: 3.2rem;
  height: 3.2rem;
`

const SModalContainer = styled.div`
  width: 340px;
  border-radius: 2.4rem;
  background-color: ${({ theme }) => theme.colors.contrast};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3.2rem 2.4rem;
  position: relative;

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 56rem;
    padding: 5.6rem 4rem;
  }
`

const STitle = styled.h3`
  color: ${({ theme }) => theme.colors.invertedContrast};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 2.4rem;
  margin: 0;
  text-align: center;
`

const SSubtitle = styled.div`
  color: ${({ theme }) => theme.colors.invertedContrast};
  font-family: ${({ theme }) => theme.fonts.light};
  font-size: 1.6rem;
  margin-top: 0.8rem;
  text-align: center;
`

const SBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;
`

const SError = styled.div`
  color: ${({ theme }) => theme.colors.danger500};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 1.6rem;
  margin-top: 4rem;
`

export default Modal
