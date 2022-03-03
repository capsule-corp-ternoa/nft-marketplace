import React from 'react'
import styled, { css } from 'styled-components'

import { InputLabel, InputShell, Insight, Label } from 'components/layout'

import Tooltip from '../Tooltip'

interface Props {
  className?: string
  disabled?: boolean
  endIcon?: string
  insight?: string
  isError?: boolean
  label?: string | React.ReactNode
  max?: string | number
  min?: string | number
  name?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  placeholder?: string
  startIcon?: string
  tag?: string
  tooltipText?: string
  type?: React.HTMLInputTypeAttribute
  value?: string | number | readonly string[]
}

const TextInput = ({
  className,
  disabled,
  endIcon,
  insight,
  isError,
  label,
  max,
  min,
  name,
  onChange,
  placeholder,
  startIcon,
  tag,
  tooltipText,
  type = 'text',
  value,
}: Props) => {
  return (
    <InputShell className={className}>
      {label && (
        <SInputLabel>
          {label}
          {tooltipText && <STooltip text={tooltipText} />}
          {insight && <SInsight>{insight}</SInsight>}
        </SInputLabel>
      )}
      <Label endIcon={endIcon} startIcon={startIcon}>
        {tag && <STagInput type="text" disabled placeholder={tag} name="tag" readOnly />}
        <SInput
          type={type}
          disabled={disabled}
          inputMode={type === 'number' ? 'numeric' : undefined}
          pattern={type === 'number' ? '[0-9]*' : undefined}
          placeholder={placeholder}
          onChange={onChange}
          max={max}
          min={min}
          name={name}
          value={value}
          isError={isError}
        />
      </Label>
    </InputShell>
  )
}

export const InputStyle = css<{
  endIcon?: string
  isError?: boolean
  startIcon?: string
}>`
  width: 100%;
  background: ${({ theme }) => theme.colors.neutral100};
  border: 0.2rem solid;
  border-color: ${({ isError, theme }) => (isError ? theme.colors.danger500 : 'rgba(0, 0, 0, 0)')};
  border-radius: 0.8rem;
  font-size: 1.6rem;
  outline: none;
  padding: ${({ endIcon, startIcon }) =>
    endIcon ? '1.6rem 5.6rem 1.6rem 1.6rem' : startIcon ? '1.6rem 1.6rem 1.6rem 5.6rem' : '1.6rem'};

  &:focus {
    border: 0.2rem solid;
    border-color: ${({ isError, theme }) => (isError ? theme.colors.danger500 : theme.colors.primary500)};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral300};
  }
`

const SInputLabel = styled(InputLabel)`
  margin-bottom: 1.6rem;
`

export const SInput = styled.input<{ isError?: boolean }>`
  ${InputStyle}
`

const STagInput = styled(SInput)`
  width: 5.2rem;
  margin-right: 0.8rem;
`

const STooltip = styled(Tooltip)`
  margin-left: 0.4rem;
`

const SInsight = styled(Insight)`
  margin-left: 0.8rem;
`

export default TextInput
