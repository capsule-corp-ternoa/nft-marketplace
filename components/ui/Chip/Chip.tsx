import React from 'react'
import styled from 'styled-components'
import { Colors } from 'style/theme/types'

import Emoji from '../Emoji'
import Icon, { IconNameType } from '../Icon'

interface IChip {
  color?: keyof Colors
  isDeletable?: boolean
  noBorder?: boolean
  size?: 'small' | 'medium'
  variant?: 'rectangle' | 'round'
}

interface Props extends IChip {
  className?: string
  emoji?: string
  icon?: IconNameType
  onDelete?: () => void
  text?: string | React.ReactNode
}

const Chip = ({
  className,
  color,
  emoji,
  icon,
  noBorder = false,
  onDelete,
  size = 'medium',
  text,
  variant = 'round',
}: Props) => {
  return (
    <SChipContainer
      className={className}
      color={color}
      isDeletable={!!onDelete}
      noBorder={noBorder}
      size={size}
      variant={variant}
    >
      {emoji && <SEmoji isEmojiOnly={text === undefined} size={size} symbol={emoji} />}
      {icon && <SIcon isIconOnly={text === undefined} name={icon} size={size} />}
      {text && (
        <SText color={color} size={size}>
          {text}
        </SText>
      )}
      {onDelete && (
        <SButton color={color} onClick={onDelete}>
          <SCross1 color={color} />
          <SCross2 color={color} />
        </SButton>
      )}
    </SChipContainer>
  )
}

const SChipContainer = styled.div<IChip>`
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme, color }) => (color ? theme.colors[`${color}`] : 'transparent')};
  backdrop-filter: ${({ color }) => (color === 'whiteBlur' ? 'blur(2.8rem)' : 'blur(0)')};
  border: ${({ color, noBorder }) => (!noBorder && color === 'invertedContrast' ? '2px dashed' : 'none')};
  border-color: ${({ color, theme }) => (color === 'invertedContrast' ? theme.colors.neutral600 : 'none')};
  border-radius: ${({ isDeletable, variant }) => (isDeletable || variant === 'rectangle' ? '0.8rem' : '6.4rem')};
  padding: ${({ size }) => (size === 'small' ? '0.4rem 1.2rem' : '0.8rem 1.6rem')};
`

const SIcon = styled(Icon)<{ isIconOnly: boolean; size: 'small' | 'medium' }>`
  width: ${({ size }) => (size === 'small' ? '1.2rem' : '2rem')};
  height: ${({ size }) => (size === 'small' ? '1.2rem' : '2rem')};
  margin-right: ${({ isIconOnly, size }) => (isIconOnly ? 0 : size === 'small' ? '0.4rem' : '0.8rem')};
`

const SEmoji = styled(Emoji)<{ isEmojiOnly: boolean; size: 'small' | 'medium' }>`
  margin-right: ${({ isEmojiOnly, size }) => (isEmojiOnly ? 0 : size === 'small' ? '0.4rem' : '0.8rem')};
`

const SText = styled.div<IChip>`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ size }) => (size === 'small' ? '1rem' : '1.6rem')};
  white-space: nowrap;

  color: ${({ theme, color }) => {
    switch (color) {
      case 'primary500':
        return theme.colors.invertedContrast
      case 'primary200':
        return theme.colors.primary500
      case 'invertedContrast':
      case 'whiteBlur':
      default:
        return theme.colors.contrast
    }
  }};
`

const SButton = styled.button<IChip>`
  cursor: pointer;
  background: transparent;
  border: none;
  padding-left: 1.6rem;
  position: relative;
`

const SCross = styled.div<{ color?: keyof Colors }>`
  position: relative;
  width: 2px;
  height: 14px;
  margin-top: -1.3rem;

  background: ${({ theme, color }) => {
    switch (color) {
      case 'primary500':
        return theme.colors.invertedContrast
      case 'primary200':
        return theme.colors.primary500
      case 'invertedContrast':
      case 'whiteBlur':
      default:
        return theme.colors.contrast
    }
  }};
`

const SCross1 = styled(SCross)`
  transform: rotate(-45deg);
  position: relative;
  top: 0.1rem;
  left: 0;
  margin: 0;
`

const SCross2 = styled(SCross)`
  transform: rotate(45deg);
`

export default Chip
