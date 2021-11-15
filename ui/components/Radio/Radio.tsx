import React from 'react';
import styled from 'styled-components';

interface Props {
  checked?: boolean;
  className?: string;
  id?: string;
  label?: string;
  name?: string;
  readOnly?: boolean;
  value?: string;
}

const Radio = ({
  checked,
  className,
  id,
  label,
  name,
  readOnly,
  value,
}: Props) => (
  <RadioContainer className={className}>
    <RadioInput
      type="radio"
      id={id}
      checked={checked}
      name={name}
      readOnly={readOnly}
      value={value}
    />
    {label}
  </RadioContainer>
);

const RadioContainer = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  font-family: 'Airbnb Cereal App Bold';
  font-size: 1.6rem;
  line-height: 1.2;
  text-transform: capitalize;
`;

const RadioInput = styled.input`
  width: 2.4rem;
  height: 2.4rem;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  border: 0.2rem solid currentColor;
  border-radius: 50%;
  display: grid;
  margin: 0;
  place-content: center;

  &::before {
    content: '';
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    background: #7417EA;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1.2rem 1.2rem var(--form-control-color);
  }

  &:checked::before {
    transform: scale(1);
  }
`;

export default Radio;
