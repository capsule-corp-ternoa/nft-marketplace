import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Container, Wrapper } from 'components/layout';
import Button from 'components/ui/Button';
import Icon from 'components/ui/Icon';

export const ERROR_PAGE_404 = 'error404';
export const ERROR_PAGE_500 = 'error500';

export interface ErrorProps {
  description?: string;
  title: string;
  variant: typeof ERROR_PAGE_404 | typeof ERROR_PAGE_500;
}

const Error = ({ description, title, variant }: ErrorProps) => (
  <Container>
    <SWrapper>
      <SIcon name={variant} />
      <STitle>{title}</STitle>
      {description && <SDescription>{description}</SDescription>}
      <SLinkWrapper>
        <Link href="/">
          <Button
            color={variant === 'error500' ? 'secondary' : 'primary'}
            href="/"
            text="Return to home"
          />
        </Link>
      </SLinkWrapper>
    </SWrapper>
  </Container>
);

const SWrapper = styled(Wrapper)`
  align-items: center;
`;

const SIcon = styled(Icon)`
  height: 24rem;
  width: auto;

  ${({ theme }) => theme.mediaQueries.md} {
    height: 40rem;
  }
`;

const STitle = styled.span`
  color: ${({ theme }) => theme.colors.contrast};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 3.2rem;
  margin-top: 6.4rem;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 4.8rem;
    margin-top: 8.8rem;
  }
`;

const SDescription = styled.span`
  color: ${({ theme }) => theme.colors.contrast};
  font-size: 1.6rem;
  margin-top: 2.4rem;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 2.4rem;
    margin-top: 4rem;
    max-width: 56rem;
  }
`;

const SLinkWrapper = styled.div`
  margin-top: 5.6rem;

  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 8rem;
  }
`;

export default Error;
