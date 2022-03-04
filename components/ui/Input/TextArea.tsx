import React from 'react'
import styled from 'styled-components'

import { InputLabel, InputShell, Insight } from 'components/layout'

import Tooltip from '../Tooltip'
import { InputStyle } from './Input'

interface Props {
  className?: string
  insight?: string
  isError?: boolean
  label?: string
  name?: string
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>
  placeholder?: string
  tooltipText?: string
  value?: string | number | readonly string[]
}

const TextArea = ({ className, insight, isError, label, name, onChange, placeholder, tooltipText, value }: Props) => {
  return (
    <InputShell className={className}>
      {label && (
        <InputLabel>
          {label}
          {tooltipText && <STooltip text={tooltipText} />}
          {insight && <SInsight>{insight}</SInsight>}
        </InputLabel>
      )}
      <Textarea isError={isError} name={name} onChange={onChange} placeholder={placeholder} value={value} />
    </InputShell>
  )
}

export const Textarea = styled.textarea`
  flex: 1;
  resize: none;

  ${InputStyle}
`

const STooltip = styled(Tooltip)`
  margin-left: 0.4rem;
`

const SInsight = styled(Insight)`
  margin-left: 0.8rem;
`

export default TextArea
