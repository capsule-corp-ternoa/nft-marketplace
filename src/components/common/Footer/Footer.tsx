import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import Container from '../ui-library/Container/Container';
import colors from '../ui-library/styles/colors';
import Row from '../ui-library/Row/Row';
import Col from '../ui-library/Col/Col';
import Input from '../ui-library/Input/Input';
import Button from '../ui-library/Button/Button';
import { H3, P } from '../Title/Title';

import { ReactComponent as ReactLogo } from '../assets/logo-ternoa.svg';
import { ReactComponent as EnglishFlag } from '../assets/english-flag.svg';
import { ReactComponent as FrenchFlag } from '../assets/french-flag.svg';
import { ReactComponent as JapaneseFlag } from '../assets/japanese-flag.svg';

import FooterSubMenu from './FooterSubMenu/FooterSubMenu';

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
    { id: 1, uri: 'http://google.com', text: 'Team', isInternal: false },
    { id: 2, uri: 'http://google.com', text: 'Community', isInternal: true },
    { id: 3, uri: 'http://google.com', text: 'How it works', isInternal: false },
    { id: 4, uri: 'http://google.com', text: 'Ternoa tokens', isInternal: false },
  ],
  column2: [
    { id: 5, uri: 'http://google.com', text: 'Give us feedback', isInternal: false },
    { id: 6, uri: 'http://google.com', text: 'Support center', isInternal: false },
    { id: 7, uri: 'http://google.com', text: 'Download NFT template', isInternal: false },
    { id: 8, uri: 'http://google.com', text: 'FAQ', isInternal: false },
  ],
  column3: [
    { id: 9, uri: 'http://google.com', text: 'Twitter', isInternal: false },
    { id: 10, uri: 'http://google.com', text: 'Facebook', isInternal: false },
    { id: 11, uri: 'http://google.com', text: 'Discord', isInternal: false },
    { id: 12, uri: 'http://google.com', text: 'Instragram', isInternal: false },
  ],
};

const Footer: React.FC = () => {

  const { i18n } = useTranslation();

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <FooterContainer>
      <Logo />
      <Container>
        <Row>
          <Col small="100" medium="50" large="50">
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
          <Col small="100" medium="50" large="50">
            <div style={{ marginLeft: '40px' }}>
              <H3>Keep in touch</H3>
              <Input light placeholder="satoshi@gmail.com" />
              <Button primary>Go</Button>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <P>
              © Ternoa Stamps     All rights reserved     Terms     Privacy
            </P>
          </Col>
          <Col>
            
            <P>
              Languages &nbsp;
              <EnglishFlag style={{ cursor: 'pointer' }} onClick={()=>changeLang('en')} />
              &nbsp;
              <FrenchFlag style={{ cursor: 'pointer' }} onClick={()=>changeLang('fr')} />
              &nbsp;
              <JapaneseFlag style={{ cursor: 'pointer' }} onClick={()=>changeLang('ja')} />
            </P>
          </Col>
        </Row>
      </Container>

    </FooterContainer>
  );
};

export default Footer;