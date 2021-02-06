import React from 'react';
import styled from 'styled-components';

const ContainerStyled = styled.div`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  @media (min-width: 576px) {
    max-width: 540px;
}
@media (min-width: 768px) {
    max-width: 720px;
}
@media (min-width: 992px) {
    max-width: 960px;
}
@media (min-width: 1200px) {
    max-width: 1140px;
}
`;

const Container: React.FC = (props) => (
  <ContainerStyled>{props.children}</ContainerStyled>
);

export default Container;