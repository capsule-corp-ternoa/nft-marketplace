import React from 'react';
import styled, { css } from 'styled-components';

import { InputLabel, InputShell, Insight } from 'components/layout';

import Tooltip from '../Tooltip';

interface Props {
  className?: string;
  insight?: string;
  isError?: boolean;
  label?: string;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  tooltipText?: string;
  value?: string | number | readonly string[];
}

const TextInput = ({
  className,
  insight,
  isError,
  label,
  name,
  onChange,
  placeholder,
  tooltipText,
  value,
}: Props) => {
  return (
    <InputShell className={className}>
      {label && (
        <InputLabel>
          {label}
          {tooltipText && <STooltip text={tooltipText} />}
          {insight && <SInsight>{insight}</SInsight>}
        </InputLabel>
      )}
      <Input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        value={value}
        isError={isError}
      />
    </InputShell>
  );
};

export const InputStyle = css<{
  isError?: boolean;
}>`
  width: 100%;
  background: ${({ theme }) => theme.colors.neutral500};
  border: 0.2rem solid;
  border-color: ${({ isError, theme }) =>
    isError ? theme.colors.danger : 'rgba(0, 0, 0, 0)'};
  border-radius: 0.8rem;
  font-size: 1.6rem;
  margin-top: 1.6rem;
  outline: none;
  padding: 1.6rem;

  &:focus {
    border: 0.2rem solid;
    border-color: ${({ isError, theme }) =>
      isError ? theme.colors.danger : theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral300};
  }
`;

export const Input = styled.input<{ isError?: boolean }>`
  ${InputStyle}
`;

const STooltip = styled(Tooltip)`
  margin-left: 0.4rem;
`;

const SInsight = styled(Insight)`
  margin-left: 0.8rem;
`;

export default TextInput;
