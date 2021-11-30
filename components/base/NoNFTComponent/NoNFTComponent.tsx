import React from 'react';
import styled from 'styled-components';
import { Container, Wrapper } from 'components/layout';
import Icon from 'components/ui/Icon';

const Code = () => {
  return (
    <Container>
      <Wrapper>
        <SIcon name="noNFTImage" />
        <STitle>All NFTs are sold !</STitle>
        <SBody>
          Come later to discover new NFTs.
          <br />
          <br />
          Thanks !
        </SBody>
      </Wrapper>
    </Container>
  );
};

const SIcon = styled(Icon)`
  width: 16rem;
  height: auto;
  margin: 0 auto;
`;

const STitle = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 1.6rem;
  margin-top: 2.4rem;
  text-align: center;
`;

const SBody = styled.span`
  color: ${({ theme }) => theme.colors.contrast};
  font-family: ${({ theme }) => theme.fonts.light};
  font-size: 1.4rem;
  text-align: center;
`;

export default Code;
