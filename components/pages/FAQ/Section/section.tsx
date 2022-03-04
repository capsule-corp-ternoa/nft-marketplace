import React, { useState } from 'react'
import styled from 'styled-components'

import Icon from 'components/ui/Icon'

export interface QuestionProps {
  className?: string
  section: { question: string; answer: string }
}

const Question: React.FC<QuestionProps> = ({ className, section }) => {
  const { answer, question } = section
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleQuestion = (): void => {
    setIsExpanded((prevState) => !prevState)
  }

  return (
    <SSection className={className}>
      <SIconContainer isExpanded={isExpanded} onClick={toggleQuestion}>
        <Icon name="faqArrow" />
      </SIconContainer>
      <SDataContainer>
        <SQuestion isExpanded={isExpanded} onClick={toggleQuestion}>
          {question}
        </SQuestion>
        <SAnswer isExpanded={isExpanded}>{answer}</SAnswer>
      </SDataContainer>
    </SSection>
  )
}

const SSection = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 3.2rem;
`

const SIconContainer = styled.div<{ isExpanded: boolean }>`
  > * {
    width: 2rem;
    transform: translateY(5px) rotate(0deg);
    margin-right: 2.4rem;
    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    cursor: pointer;

    ${({ isExpanded }) =>
      isExpanded &&
      `
      transform: translateY(5px) rotate(90deg);
    `}
  }
`

const SDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.lg} {
    max-width: 65rem;
  }
`

const SQuestion = styled.div<{ isExpanded: boolean }>`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  align-self: flex-start;
  cursor: pointer;
  font-familly: ${({ theme }) => theme.fonts.bold};
  font-size: 1.6rem;
  margin-top: 0.4rem;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);

  ${({ isExpanded, theme }) =>
    isExpanded &&
    `
      color: ${theme.colors.primary500};
    `}

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 2.4rem;
    margin-top: 0;
  }
`

const SAnswer = styled.div<{ isExpanded: boolean }>`
  display: none;
  color: ${({ theme }) => theme.colors.neutral600};
  font-size: 1.6rem;
  margin-top: 1.2rem;

  ${({ isExpanded }) =>
    isExpanded &&
    `
    display: inline-block;
  `}
`

export default Question
