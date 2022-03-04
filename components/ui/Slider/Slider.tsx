import React from 'react'
import styled from 'styled-components'

interface Props {
  className?: string
  id?: string
  max?: string | number
  min?: string | number
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  onChange: React.ChangeEventHandler<HTMLInputElement>
  step?: string | number
  value: string | number | readonly string[]
}

const Slider = ({ className, id, max, min, onBlur, onChange, step, value }: Props) => (
  <div className={className}>
    <SliderContainer>
      <SliderInput
        type="range"
        id={id}
        min={min}
        max={max}
        onBlur={onBlur}
        onChange={onChange}
        step={step}
        value={value}
      />
    </SliderContainer>
  </div>
)

const SliderContainer = styled.div`
  width: 100%;
  height: 3.2rem;
  display: flex;
  align-items: center;
  background: rgb(255, 255, 255, 0.4);
  backdrop-filter: blur(0.8rem);
  border-radius: 2.4rem;
  padding: 0 2.4rem;
`

const SliderInput = styled.input`
  width: 100%;
  height: 0.2rem;
  -webkit-appearance: none;
  appearance: none;
  background: ${({ max, theme, value }) =>
    Number(max) > 0 && value
      ? `linear-gradient(
    to right,
    ${theme.colors.primary500} 0%,
    ${theme.colors.primary500} ${(Number(value) / Number(max)) * 100}%,
    ${theme.colors.primary700} ${(Number(value) / Number(max)) * 100}%,
    ${theme.colors.primary700} 100%
  )`
      : theme.colors.primary700};
  border-radius: 0.2rem;
  outline: none;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    width: 1.2rem;
    height: 1.2rem;
    -webkit-appearance: none;
    appearance: none;
    background: ${({ theme }) => theme.colors.primary500};
    border-radius: 50%;
    cursor: pointer;
    transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      bottom 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

    &:hover {
      box-shadow: rgba(116, 23, 234, 0.2) 0px 0px 0px 8px;
    }
  }

  &::-moz-range-thumb {
    width: 1.2rem;
    height: 1.2rem;
    -webkit-appearance: none;
    appearance: none;
    background: ${({ theme }) => theme.colors.primary500};
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      bottom 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

    &:hover {
      box-shadow: rgba(116, 23, 234, 0.2) 0px 0px 0px 8px;
    }
  }

  ::-moz-range-track {
    background-color: rgba(116, 23, 234, 0.4);
  }

  ::-moz-range-progress {
    background-color: ${({ theme }) => theme.colors.primary500};
  }
`

export default Slider
