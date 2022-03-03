import React from 'react'
import styled from 'styled-components'

import Chip from '../Chip'

interface Props {
  className?: string
  endBadge?: number | string
  isActive?: boolean
  label: string
  onClick: () => void
  startBadge?: number | string
}

const Tab = ({ endBadge, className, isActive, label, onClick, startBadge }: Props) => {
  const isEndBadge = endBadge !== undefined && endBadge !== 0 && endBadge !== '0'
  const isStartBadge = startBadge !== undefined && startBadge !== 0 && endBadge !== '0'

  return (
    <STabContainer
      className={className}
      isActive={isActive}
      isBadge={isEndBadge || isStartBadge}
      onClick={
        isActive
          ? () => {
              return
            }
          : onClick
      }
    >
      {isStartBadge && (
        <SStartBadgeContainer>
          <Chip
            color={isActive ? 'invertedContrast' : 'primary500'}
            noBorder
            size="medium"
            text={startBadge}
            variant="rectangle"
          />
        </SStartBadgeContainer>
      )}
      {label}
      {isEndBadge && (
        <SEndBadgeContainer>
          <Chip
            color={isActive ? 'invertedContrast' : 'primary500'}
            noBorder
            size="medium"
            text={endBadge}
            variant="rectangle"
          />
        </SEndBadgeContainer>
      )}
    </STabContainer>
  )
}

const STabContainer = styled.button<{ isActive?: boolean; isBadge: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.neutral300};
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 1.6rem;
  line-height: 1.3;
  outline: none;
  padding: ${({ isBadge }) => (isBadge ? '0.8rem 0' : '1.6rem 0')};

  ${({ theme }) => theme.mediaQueries.lg} {
    width: auto;
    min-width: 19rem;
    min-height: 6.4rem;
    background: ${({ theme }) => theme.colors.primary500};
    border: 2px solid;
    border-color: ${({ theme }) => theme.colors.primary500};
    border-radius: 1.2rem;
    box-shadow: ${({ theme }) => theme.shadows.popupShadow};
    color: ${({ theme }) => theme.colors.invertedContrast};
    padding: ${({ isBadge }) => (isBadge ? '0.8rem 1.6rem' : '1.6rem')};

    ${({ isActive, theme }) =>
      !isActive &&
      `
        background: ${theme.colors.neutral100};
        border-color: rgba(0, 0, 0, 0);
        box-shadow: none;
        color: ${theme.colors.neutral300};
        opacity: 0.6;

        &:hover {
          border-color: ${theme.colors.primary500};
          opacity: 1;
        }
      }
    `}
  }
`

const SEndBadgeContainer = styled.div`
  margin-left: 1.6rem;
`

const SStartBadgeContainer = styled.div`
  margin-right: 1.6rem;
`

export default Tab
