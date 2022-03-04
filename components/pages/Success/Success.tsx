import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import { Container, Wrapper } from 'components/layout'
import Button from 'components/ui/Button'
import Icon from 'components/ui/Icon'

export interface SuccessProps {
  title: string
  text?: string
  buttonText: string
  returnUrl: string
  subText?: string
}

const Success = ({ title, text, buttonText, returnUrl, subText }: SuccessProps) => (
  <Container>
    <Wrapper>
      <SIcon name="successImage" />
      <STitle>{title}</STitle>
      {text && <SText>{text}</SText>}
      {subText &&
        subText
          .split(',')
          .filter((x) => x.length > 0)
          .map((x, i) => <SSubText key={i}>{x}</SSubText>)}
      <SButtonContainer>
        <Link href={returnUrl} passHref>
          <Button color="primary500" size="medium" text={buttonText} variant="outlined" />
        </Link>
      </SButtonContainer>
    </Wrapper>
  </Container>
)

const SIcon = styled(Icon)`
  max-width: 40rem;
  margin: 0 auto;
`

const STitle = styled.h2`
  color: ${({ theme }) => theme.colors.contrast};
  font-family: ${({ theme }) => theme.fonts.black};
  font-size: 4rem;
  margin: 4rem 0 0;
  text-align: center;
`

const SText = styled.div`
  color: ${({ theme }) => theme.colors.contrast};
  font-family: ${({ theme }) => theme.fonts.light};
  font-size: 2.4rem;
  margin-top: 2.4rem;
  text-align: center;
`

const SSubText = styled.div`
  color: ${({ theme }) => theme.colors.contrast};
  font-family: ${({ theme }) => theme.fonts.light};
  font-size: 1.6rem;
  margin-top: 2.4rem;
  text-align: center;
`

const SButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3.2rem;
`

export default Success
