import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { Container, Wrapper } from 'components/layout'
import { AnchorButton } from 'components/ui/Button'
import Icon from 'components/ui/Icon'

export const ERROR_PAGE_404 = 'error404'
export const ERROR_PAGE_500 = 'error500'

export interface ErrorProps {
  description?: string
  title: string
  variant: typeof ERROR_PAGE_404 | typeof ERROR_PAGE_500
}

const Error = ({ description, title, variant }: ErrorProps) => (
  <Container>
    <SWrapper>
      <SIcon name={variant} />
      <STitle>{title}</STitle>
      {description && <SDescription>{description}</SDescription>}
      <SLinkWrapper>
        <Link href="/" passHref>
          <>
            <AnchorButton color={variant === 'error500' ? 'danger400' : 'primary500'} href="/" text="Return to home" />
          </>
        </Link>
      </SLinkWrapper>
    </SWrapper>
  </Container>
)

const SWrapper = styled(Wrapper)`
  align-items: center;
`

const SIcon = styled(Icon)`
  height: 24rem;
  width: auto;
`

const STitle = styled.span`
  color: ${({ theme }) => theme.colors.contrast};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 3.2rem;
  margin-top: 6.4rem;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.xxl} {
    font-size: 4rem;
    margin-top: 7.2rem;
  }
`

const SDescription = styled.span`
  color: ${({ theme }) => theme.colors.contrast};
  font-size: 1.6rem;
  margin-top: 2.4rem;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.xxl} {
    font-size: 2rem;
    margin-top: 3.2rem;
    max-width: 40rem;
  }
`

const SLinkWrapper = styled.div`
  margin-top: 5.6rem;

  ${({ theme }) => theme.mediaQueries.xxl} {
    margin-top: 6.4rem;
  }
`

export default Error
