import React from 'react';
import styled from 'styled-components';
import Col from '../ui-library/Col/Col';
import Row from '../ui-library/Row/Row';
import Button from '../ui-library/Button/Button';
import Input from '../ui-library/Input/Input';

const ContainerHeader = styled.div`
  padding:21px 40px;
  width:100%;
  height: 44px;
`;

const SiteName = styled.h3`
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  text-align: left;
`;

const MainHeader: React.FC = () => (
  <ContainerHeader>
    <Row>
      {/* Application name */}
      <Col size="20">
        <SiteName>Ternoa Stamp</SiteName>
      </Col>
      {/* Search Button */}
      <Col size="50">
        <Input full placeholder="test" type="search"  />
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
