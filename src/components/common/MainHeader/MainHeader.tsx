import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import Col from '../ui-library/Col/Col';
import Row from '../ui-library/Row/Row';
import colors from '../ui-library/styles/colors';

const ContainerHeader = styled.div`
  background-color: ${colors.grayBackground};
  padding:15px;
`;

const Menu = styled.ul`
  list-style: none;
`;

const MenuElement = styled.li`
  display: inline-block;
  margin: 0 10px;
`;

const MainHeader: React.FC = () => (
  <ContainerHeader>
    <Row>
      <Col size="20">Ternoa NFT marketplace</Col>
      <Col>
        <Menu>
          <MenuElement>
            <Link to="">Home</Link>
          </MenuElement>
          <MenuElement>
            <Link to="/profile">Profile</Link>
          </MenuElement>
        </Menu>
      </Col>
    </Row>
  </ContainerHeader>
);

export default MainHeader;
