import React from 'react';
import styled from 'styled-components';
import Icon, { IconNameType } from 'components/assets/Icon';
import { Colors } from 'style/theme/types';

interface IChip {
  color?: keyof Colors;
  isDeletable?: boolean;
  size?: 'small' | 'medium';
  variant?: 'rectangle' | 'round';
}

interface Props extends IChip {
  className?: string;
  icon?: IconNameType;
  onDelete?: () => void;
  text: string | React.ReactNode;
}

const Chip = ({
  className,
  color,
  icon,
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
      size={size}
      variant={variant}
    >
      {icon && <SIcon name={icon} size={size} />}
      <SText color={color} size={size}>
        {text}
      </SText>
      {onDelete && (
        <SButton color={color} onClick={onDelete}>
          <SCross1 color={color} />
          <SCross2 color={color} />
        </SButton>
      )}
    </SChipContainer>
  );
};

const SChipContainer = styled.div<IChip>`
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme, color }) =>
    color ? theme.colors[`${color}`] : 'transparent'};
  backdrop-filter: ${({ color }) =>
    color === 'whiteBlur' ? 'blur(2.8rem)' : 'blur(0)'};
  border: ${({ color }) =>
    color === 'invertedContrast' ? '2px dashed #E0E0E0' : 'none'};
  border-radius: ${({ isDeletable, variant }) =>
    isDeletable || variant === 'rectangle' ? '0.8rem' : '6.4rem'};
  padding: ${({ size }) =>
    size === 'small' ? '0.4rem 1.2rem' : '0.8rem 1.2rem'};
`;

const SIcon = styled(Icon)<IChip>`
  width: ${({ size }) => (size === 'small' ? '1.2rem' : '2rem')};
  height: ${({ size }) => (size === 'small' ? '1.2rem' : '2rem')};
  margin-right: ${({ size }) => (size === 'small' ? '0.4rem' : '0.8rem')};
`;

const SText = styled.div<IChip>`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ size }) => (size === 'small' ? '1rem' : '1.6rem')};
  white-space: nowrap;

  color: ${({ theme, color }) => {
    switch (color) {
      case 'primary':
        return theme.colors.invertedContrast;
      case 'primaryLight':
        return theme.colors.primary;
      case 'invertedContrast':
      case 'whiteBlur':
      default:
        return theme.colors.contrast;
    }
  }};
`;

const SButton = styled.button<IChip>`
  background: transparent;
  border: none;
  position: relative;
  margin-left: 0.8rem;
`;

const SCross = styled.div<{ color?: keyof Colors }>`
  position: absolute;
  top: 0;
  left: 0.8rem;
  width: 2px;
  height: 14px;
  margin-top: -0.6rem;

  background: ${({ theme, color }) => {
    switch (color) {
      case 'primary':
        return theme.colors.invertedContrast;
      case 'primaryLight':
        return theme.colors.primary;
      case 'invertedContrast':
      case 'whiteBlur':
      default:
        return theme.colors.contrast;
    }
  }};
`;

const SCross1 = styled(SCross)`
  transform: rotate(-45deg);
`;

const SCross2 = styled(SCross)`
  transform: rotate(45deg);
`;

export default Chip;
