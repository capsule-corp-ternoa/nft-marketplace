import React from 'react';
import styled from 'styled-components';
import Container from '../ui-library/Container/Container';
import colors from '../ui-library/styles/colors';

import Row from '../ui-library/Row/Row';
import Col from '../ui-library/Col/Col';
import Input from '../ui-library/Input/Input';
import Button from '../ui-library/Button/Button';

import { ReactComponent as ReactLogo } from '../assets/logo-ternoa.svg';

import FooterSubMenu, { FooterMenuTitle } from './FooterSubMenu/FooterSubMenu';

const FooterContainer = styled.div`
  margin-top:50px;
  height: 363px;
  width: 100%;
  background: ${colors.background_gray};
  border-top: solid 1px ${colors.background_gray_dark};
`;

const RoundedWrapper = styled.div`
  width: 300px;
  height: 300px;
  background: #fff;
  border-radius: 10000px;
  text-align: center;
  vertical-align: middle;
  margin-top: -250px;
  margin-left: 50px;
`;


const Logo: React.FC = () => (
  <RoundedWrapper>
    <ReactLogo style={{ height: '25px', paddingTop: '230px' }} />
    <div>Ternoa</div>
  </RoundedWrapper>
);

const listLinks = {
  column1: [
    { uri: '', text: 'Team' },
    { uri: '', text: 'Community' },
    { uri: '', text: 'How it works' },
    { uri: '', text: 'Ternoa tokens' },
  ],
  column2: [
    { uri: '', text: 'Give us feedback' },
    { uri: '', text: 'Support center' },
    { uri: '', text: 'Download NFT template' },
    { uri: '', text: 'FAQ' },
  ],
  column3: [
    { uri: '', text: 'Twitter' },
    { uri: '', text: 'Facebook' },
    { uri: '', text: 'Discord' },
    { uri: '', text: 'Instragram' },
  ],
};

const Footer: React.FC = () => (
  <FooterContainer>
    <Logo />
    <Container>
      <Row>
        <Col size="50">
          <Row>
            <Col size="one-third">
              <FooterSubMenu
                subTitle="About Us"
                menuElements={listLinks.column1}
              />
            </Col>
            <Col size="one-third">
              <FooterSubMenu
                subTitle="Support"
                menuElements={listLinks.column2}
              />
            </Col>
            <Col size="one-third">
              <FooterSubMenu
                subTitle="Community"
                menuElements={listLinks.column3}
              />
            </Col>
          </Row>
        </Col>
        <Col size="50">
          <div style={{ textAlign: 'center' }}>
            <FooterMenuTitle>Keep in touch</FooterMenuTitle>
            <Input placeholder="satoshi@gmail.com" />
            <Button primary>Go</Button>
          </div>
        </Col>
      </Row>
    </Container>
  </FooterContainer>
);

export default Footer;