import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { Container, Wrapper } from 'components/layout'
import Icon from 'components/ui/Icon'
import { AnchorButton } from 'components/ui/Button'
import { Colors } from 'style/theme/types'

export const NO_NFT_VARIANT_SOLD_OUT = 'sold_out'
export type NO_NFT_VARIANT_TYPE = typeof NO_NFT_VARIANT_SOLD_OUT

interface Props {
  body?: string | React.ReactNode
  className?: string
  href?: string
  linkLabel?: string
  title: string
  variant?: NO_NFT_VARIANT_TYPE
}

const NoNFTComponent = ({ body, className, href, linkLabel, title, variant }: Props) => {
  return (
    <Container className={className}>
      <Wrapper>
        <SIcon name="noNFTImage" />
        <STitle color={variant === NO_NFT_VARIANT_SOLD_OUT ? 'primary500' : 'contrast'}>{title}</STitle>
        {body && <SBody>{body}</SBody>}
        {href && (
          <SLinkWrapper>
            <Link href={href} passHref>
              <>
                <AnchorButton color="contrast" href={href} text={linkLabel} size="medium" variant="outlined" />
              </>
            </Link>
          </SLinkWrapper>
        )}
      </Wrapper>
    </Container>
  )
}

const SIcon = styled(Icon)`
  min-height: 22rem;
  width: 16rem;
  height: auto;
  margin: 0 auto;
`

const STitle = styled.span<{ color: keyof Colors }>`
  color: ${({ color, theme }) => theme.colors[color]};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 1.6rem;
  margin-top: 2.4rem;
  text-align: center;
`

const SBody = styled.span`
  color: ${({ theme }) => theme.colors.contrast};
  font-family: ${({ theme }) => theme.fonts.light};
  font-size: 1.4rem;
  text-align: center;
`

const SLinkWrapper = styled.div`
  width: fit-content;
  margin: 3.2rem auto 0;

  ${({ theme }) => theme.mediaQueries.xxl} {
    margin-top: 6.4rem;
  }
`

export default NoNFTComponent
