import React from 'react';
import styled from 'styled-components';
import Col from '../ui-library/Col/Col';
import Row from '../ui-library/Row/Row';
import Button from '../ui-library/Button/Button';
import Input from '../ui-library/Input/Input';
import { H3 } from '../Title/Title';
import { ReactComponent as ReactLogo } from '../assets/logo-ternoa.svg';

const ContainerHeader = styled.div`
  padding:21px 0;
  width:100%;
  height: 44px;
`;

const MainHeader: React.FC = () => (
  <ContainerHeader>
    <Row>
      {/* Application name */}
      <Col size="20">
        <H3 style={{ paddingTop: '-20px' }}>
          <i><ReactLogo />&nbsp;</i>
          Ternoa Stamp
        </H3>
      </Col>
      {/* Search Button */}
      <Col size="50">
        <Input full placeholder="test" type="search" />
      </Col>
      {/* Buttons */}
      <Col size="30">
        <Button primary>Create</Button>
        <Button>Connect Wallet</Button>
      </Col>
    </Row>
  </ContainerHeader>
);

export default MainHeader;
