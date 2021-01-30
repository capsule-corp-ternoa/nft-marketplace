import React from 'react';
import styled from 'styled-components';

const H1Styled = styled.h1`
  font-family: Montserrat;
  font-size: 60px;
  font-style: normal;
  font-weight: 700;
  line-height: 73px;
  letter-spacing: 0em;
  text-align: left;
`;

const DescriptionTitle:React.FC = (props) => (
  <>
    <H1Styled>{props.children}</H1Styled>
  </>
);

export default DescriptionTitle;