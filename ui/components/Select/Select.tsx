import React, { useState } from 'react';
import ArrowBottom from 'components/assets/arrowBottom';
import styled from 'styled-components';

interface Props {
  children: (f: (b: boolean) => void) => React.ReactNode;
  className?: string;
  color?: 'primary' | 'primaryInverted';
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

const SelectRoot = styled.button<{ color?: string }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #7417ea;
  border: none;
  border-radius: 1.2rem;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.25);
  color: white;
  cursor: pointer;
  font-family: 'Airbnb Cereal App Bold';
  font-size: 1.6rem;
  line-height: 1.3;
  outline: none;
  padding: 1.6rem 2.4rem;
  text-transform: capitalize;
  z-index: 2;

  &:disabled {
    border: 2px solid;
    cursor: disabled;
    opacity: 0.5;
  }
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
  background: #f7f7f7;
  border-radius: 1.2rem;
  box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.15);
  list-style-type: none;
  margin: -2rem 0 0;
  padding: 4rem 2rem 2rem;
  position: absolute;
  top: 5.2rem;
  left: 50%;
  transform: translateX(calc(-50% + 0px));

  > li {
    color: #b1b1b1;
    font-family: 'Airbnb Cereal App Bold';
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
