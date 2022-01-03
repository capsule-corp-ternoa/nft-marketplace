import React from 'react';
import styled, { css, DefaultTheme } from 'styled-components';
import Icon, { IconNameType } from 'components/ui/Icon';
import { Colors } from 'style/theme/types';

interface IButton {
  color?: keyof Colors;
  disabled?: boolean;
  isIconOnly?: boolean;
  noHover?: boolean;
  size?: 'small' | 'medium';
  variant?: 'contained' | 'outlined';
}
interface Props extends IButton {
  className?: string;
  href?: string;
  icon?: IconNameType;
  onClick?: () => void;
  text?: string;
}

const containedColors = (theme: DefaultTheme, color?: keyof Colors) => {
  switch (color) {
    case 'contrast':
    case 'primary':
      return theme.colors.invertedContrast;
    case 'primaryLight':
      return theme.colors.primary;
    case 'invertedContrast':
    case 'whiteBlur':
    default:
      return theme.colors.contrast;
  }
};

const outlinedColors = (theme: DefaultTheme, color?: keyof Colors) => {
  switch (color) {
    case 'primary':
      return theme.colors.primary;
    default:
      return theme.colors.contrast;
  }
};

const ButtonStyle = css<IButton>`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  background: ${({ theme, color, variant }) =>
    variant === 'contained' && color
      ? theme.colors[`${color}`]
      : 'transparent'};
  border: ${({ size, variant }) => (variant === 'outlined' ? size === 'small' ? '1px solid' : '2px solid' : 'none')};
  border-radius: 4rem;
  box-shadow: 0 0 0.8rem 0.4rem rgba(0, 0, 0, 0.05);
  cursor: ${({ noHover }) => (noHover ? 'default' : 'pointer')};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ size }) => (size === 'small' ? '1.2rem' : '1.6rem')};
  opacity: ${({ disabled }) => (disabled ? '0.4' : '1')};
  padding: ${({ isIconOnly, size }) =>
    isIconOnly
      ? '1.2rem'
      : size === 'small'
      ? '0.8rem 2.4rem'
      : '1.2rem 3.2rem'};
  pointer-events: ${({ disabled, noHover }) => (disabled || noHover ? 'none' : 'auto')};
  text-align: center;
  transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
  z-index: 1;

  ${({ noHover, theme }) =>
    !noHover &&
    `&:hover {
      color: ${theme.colors.invertedContrast};
      background-color: ${theme.colors.contrast};
      border-color: ${theme.colors.contrast};

      path {
        fill: ${theme.colors.invertedContrast};
        transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
      }
    }`}

  border-color: ${({ theme, color }) => {
    switch (color) {
      case 'primary':
        return theme.colors.primary;
      case 'contrast':
      case 'invertedContrast':
        return theme.colors.contrast;
      case 'whiteBlur':
      default:
        return theme.colors.neutral400;
    }
  }};

  color: ${({ theme, color, variant }) => {
    switch (variant) {
      case 'contained':
        return containedColors(theme, color);
      case 'outlined':
      default:
        return outlinedColors(theme, color);
    }
  }};
`;

const Button = ({
  className,
  color,
  disabled,
  href,
  icon,
  noHover = false,
  onClick,
  size = 'medium',
  text,
  variant = 'contained',
}: Props) => {
  if (href !== null && href !== undefined) {
    return (
      <SAnchor
        className={className}
        color={color}
        disabled={disabled}
        href={href}
        isIconOnly={text === undefined}
        noHover={noHover}
        size={size}
        variant={variant}
      >
        {icon && (
          <SIcon isIconOnly={text === undefined} name={icon} size={size} />
        )}
        {text}
      </SAnchor>
    );
  }

  return (
    <SButton
      className={className}
      color={color}
      disabled={disabled}
      isIconOnly={text === undefined}
      noHover={noHover}
      onClick={onClick}
      size={size}
      variant={variant}
    >
      {icon && (
        <SIcon isIconOnly={text === undefined} name={icon} size={size} />
      )}
      {text}
    </SButton>
  );
};

const SIcon = styled(Icon)<{ isIconOnly: boolean; size: 'small' | 'medium' }>`
  width: ${({ size }) => (size === 'small' ? '1.2rem' : '2rem')};
  height: ${({ size }) => (size === 'small' ? '1.2rem' : '2rem')};
  margin-right: ${({ isIconOnly, size }) =>
    isIconOnly ? 0 : size === 'small' ? '0.8rem' : '1.6rem'};
`;

const SAnchor = styled.a<IButton>`
  ${ButtonStyle}
`;

const SButton = styled.button<IButton>`
  ${ButtonStyle}
`;

export default Button;
