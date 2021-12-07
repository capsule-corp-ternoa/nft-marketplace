import React, { useState } from 'react';
import ArrowBottom from 'components/assets/arrowBottom';
import styled from 'styled-components';

import { Colors } from 'style/theme/types';

interface Props {
  children: (f: (b: boolean) => void) => React.ReactNode;
  className?: string;
  color?: keyof Colors;
  disabled?: boolean;
  text: string;
}

const Select = ({
  children,
  className,
  color,
  disabled = false,
  text,
}: Props) => {
  const [isExpanded, setSelectExpanded] = useState(false);

  const toggleSelect = () => {
    return setSelectExpanded((prevState) => !prevState);
  };

  return (
    <SelectContainer className={className}>
      <SelectRoot color={color} disabled={disabled} onClick={toggleSelect}>
        {text}
        <ArrowIcon isExpanded={isExpanded} />
      </SelectRoot>
      {isExpanded && <SelectOptions>{children(toggleSelect)}</SelectOptions>}
    </SelectContainer>
  );
};

const SelectContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  min-width: 23rem;
`;

const SelectRoot = styled.button<{ color?: keyof Colors; }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme, color }) =>
    color ? theme.colors[`${color}`] : theme.colors.invertedContrast};
  border: none;
  border-radius: 1.2rem;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 1.6rem;
  line-height: 1.3;
  outline: none;
  padding: 1.6rem 2.4rem;
  text-transform: capitalize;
  z-index: 20;

  &:disabled {
    border: 2px solid;
    cursor: disabled;
    opacity: 0.5;
  }

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

const ArrowIcon = styled(ArrowBottom)<{ isExpanded?: boolean }>`
  fill: white;
  position: absolute;
  right: 2.4rem;
  top: 1.8rem;
  width: 1.6rem;
  transform: ${({ isExpanded }) =>
    isExpanded ? 'rotate(-90deg)' : 'rotate(90deg)'};
  transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
`;

const SelectOptions = styled.ul`
  width: 100%;
  background: ${({ theme }) => theme.colors.neutral500};
  border-radius: 1.2rem;
  box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.15);
  list-style-type: none;
  margin: -2rem 0 0;
  padding: 4rem 2rem 2rem;
  position: absolute;
  top: 5.2rem;
  left: 50%;
  transform: translateX(calc(-50% + 0px));
  z-index: 10;

  > li {
    color: ${({ theme }) => theme.colors.neutral300};
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: 1.6rem;
    line-height: 1.3;
    margin-top: 2rem;
    text-transform: capitalize;

    &:first-child {
      margin-top: 0;
    }
  }
`;

export default Select;
