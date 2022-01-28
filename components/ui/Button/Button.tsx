import React from 'react';
import styled, { css, DefaultTheme } from 'styled-components';
import Icon, { IconNameType, Loader } from 'components/ui/Icon';
import { Colors } from 'style/theme/types';

interface IButton {
  color?: keyof Colors;
  disabled?: boolean;
  isIconOnly?: boolean;
  isLoading?: boolean;
  noHover?: boolean;
  size?: 'small' | 'medium';
  variant?: 'contained' | 'outlined';
}
interface Props extends IButton {
  className?: string;
  href?: string;
  icon?: IconNameType;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  text?: string;
}

const handleColor = (theme: DefaultTheme, color?: keyof Colors, variant?: 'contained' | 'outlined'): string => {
  if (color === undefined) {
    return theme.colors.contrast;
  }

  switch (variant) {
    case 'contained':
      return containedColors(theme, color);
    case 'outlined':
    default:
      return outlinedColors(theme, color);
  }
};

const containedColors = (theme: DefaultTheme, color: keyof Colors): string => {
  switch (color) {
    case 'contrast':
    case 'primary500':
      return theme.colors.invertedContrast;
    case 'primary300':
      return theme.colors.primary500;
    case 'invertedContrast':
    case 'whiteBlur':
    default:
      return theme.colors.contrast;
  }
};

const outlinedColors = (theme: DefaultTheme, color: keyof Colors): string => {
  switch (color) {
    case 'invertedContrast':
    case 'neutral600':
    case 'neutral300':
    case 'neutral600':
    case 'neutral100':
    case 'whiteBlur':
      return theme.colors.contrast;
    default:
      return theme.colors[color];
  }
};

const ButtonStyle = css<IButton>`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  background: ${({ theme, color, variant }) =>
    variant === 'contained' && color ? theme.colors[`${color}`] : 'transparent'};
  border: ${({ size, variant }) => (variant === 'outlined' ? (size === 'small' ? '1px solid' : '2px solid') : 'none')};
  border-radius: 4rem;
  box-shadow: ${({ disabled, theme }) => (disabled ? 'none' : theme.shadows.popupShadow)};
  cursor: ${({ noHover }) => (noHover ? 'default' : 'pointer')};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ size }) => (size === 'small' ? '1.2rem' : '1.6rem')};
  opacity: ${({ disabled }) => (disabled ? '0.4' : '1')};
  padding: ${({ isIconOnly, size }) => (isIconOnly ? '1.2rem' : size === 'small' ? '0.8rem 2rem' : '1.2rem 3.2rem')};
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
    if (color === undefined) {
      return theme.colors.contrast;
    }

    switch (color) {
      case 'invertedContrast':
      case 'neutral600':
      case 'neutral300':
      case 'neutral600':
      case 'neutral100':
      case 'whiteBlur':
        return theme.colors.neutral600;
      default:
        return theme.colors[color];
    }
  }};

  color: ${({ theme, color, variant }) => handleColor(theme, color, variant)};

  svg,
  path {
    fill: ${({ theme, color, variant }) => handleColor(theme, color, variant)};
  }
`;

const Button = ({
  className,
  color,
  disabled,
  href,
  icon,
  isLoading = false,
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
        {icon && <SIcon isIconOnly={text === undefined} name={icon} size={size} />}
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
      {isLoading ? (
        <SLoader color={color ?? 'invertedContrast'} size={size} variant={variant} />
      ) : (
        <>
          {icon && <SIcon isIconOnly={text === undefined} name={icon} size={size} />}
          {text}
        </>
      )}
    </SButton>
  );
};

const SLoader = styled(Loader)<{ color: keyof Colors; variant?: 'contained' | 'outlined' }>`
  margin: 0 auto;

  div {
    border-color: ${({ color, theme, variant }) =>
      `${handleColor(theme, color, variant)} transparent transparent transparent`};
  }
`;

const SIcon = styled(Icon)<{ isIconOnly: boolean; size: 'small' | 'medium' }>`
  width: ${({ size }) => (size === 'small' ? '1.6rem' : '2rem')};
  height: ${({ size }) => (size === 'small' ? '1.6rem' : '2rem')};
  margin-right: ${({ isIconOnly, size }) => (isIconOnly ? 0 : size === 'small' ? '1.2rem' : '1.6rem')};
`;

const SAnchor = styled.a<IButton>`
  ${ButtonStyle}
`;

const SButton = styled.button<IButton>`
  ${ButtonStyle}
`;

export default Button;
