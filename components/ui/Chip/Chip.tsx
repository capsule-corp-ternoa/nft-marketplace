import React from 'react';
import styled from 'styled-components';
import { Colors } from 'style/theme/types';

interface IChip {
  color: keyof Colors;
  isDeletable?: boolean;
  size?: 'small' | 'medium';
  variant?: 'rectangle' | 'round';
}

interface Props extends IChip {
  className?: string;
  icon?: React.SVGProps<SVGSVGElement>;
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
      {icon}
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
  background: ${({ theme, color }) => theme.colors[`${color}`]};
  backdrop-filter: ${({ color }) =>
    color === 'transparent' ? 'blur(2.8rem)' : 'blur(0)'};
  border-radius: ${({ isDeletable, variant }) =>
    isDeletable || variant === 'rectangle' ? '0.8rem' : '6.4rem'};
  padding: ${({ size }) =>
    size === 'small' ? '0.4rem 1.2rem' : '0.8rem 1.2rem'};
`;

const SText = styled.div<IChip>`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ size }) => (size === 'small' ? '1.4rem' : '1.6rem')};
  margin-left: 0.4rem;
  white-space: nowrap;

  color: ${({ theme, color }) => {
    switch (color) {
      case 'primary':
        return theme.colors.invertedContrast;
      case 'primaryLight':
        return theme.colors.primary;
      case 'transparent':
        return theme.colors.contrast;
      default:
        return theme.colors.invertedContrast;
    }
  }};
`;

const SButton = styled.button<IChip>`
  background: transparent;
  border: none;
  position: relative;
  margin-left: 0.8rem;
`;

const SCross = styled.div<{ color: keyof Colors }>`
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
      case 'transparent':
        return theme.colors.contrast;
      default:
        return theme.colors.invertedContrast;
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
