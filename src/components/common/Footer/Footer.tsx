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
import { 
  DiscordIcon,
  TwitterIcon,
  LinkedinIcon,
  TelegramIcon,
  InstagramIcon,
  GithubIcon,
  TwitchIcon,
  YoutubeIcon,
} from '../Icons/Icons';

import { ReactComponent as ReactLogo } from '../assets/logo-ternoa.svg';
import { ReactComponent as EnglishFlag } from '../assets/english-flag.svg';
import { ReactComponent as FrenchFlag } from '../assets/french-flag.svg';
import { ReactComponent as JapaneseFlag } from '../assets/japanese-flag.svg';

const FooterContainer = styled.div`
  z-index:-100;
  margin-top:50px;
  height: 363px;
  width: 100%;
  background: ${colors.background_gray};
  border-top: solid 1px ${colors.background_gray_dark};
`;

const RoundedWrapper = styled.div`
  z-index:-1;
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

const LinkStyled = styled.a`
text-decoration: none;
color:black;
`;

const Footer: React.FC = () => {

  const { i18n, t } = useTranslation();

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <FooterContainer>
      <Logo />
      <Container>
        <Row>

          <Col small="100" medium="50" large="50">
            <div style={{ marginLeft: '40px' }}>
              <H3>{t('footer.keepInTouch')}</H3>
              <div style={{ position: 'relative' }}>
                <Input full light placeholder="Your Email..." />
                <Button style={{ position: 'absolute', top: '0px', right: '0px', height: '47px', margin: '0px' }} primary>Go</Button>
              </div>
            </div>
          </Col>

          <Col small="100" medium="50" large="50">
            <div>      
              <div style={{ width: '150px', textAlign: 'center', margin: '0px auto' }}>
                <H3>{t('footer.community')}</H3>
                <Row>
                  <Col size="one-third"><DiscordIcon size={40} /></Col>
                  <Col size="one-third"><TwitterIcon size={40} /></Col>
                  <Col size="one-third"><LinkedinIcon size={40} /></Col>
                </Row>

                <Row>
                  <Col size="one-third"><TelegramIcon size={40} /></Col>
                  <Col size="one-third"><InstagramIcon size={40} /></Col>
                  <Col size="one-third"><GithubIcon size={40} /></Col>
                </Row>

                <Row>
                  <Col size="one-third"><TwitchIcon size={40} /></Col>
                  <Col size="one-third"><YoutubeIcon size={40} /></Col>
                  <Col size="one-third"><YoutubeIcon size={40} /></Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <P>
              © Ternoa Stamps All rights reserved &nbsp;
              <LinkStyled href="#">Terms</LinkStyled> &nbsp;
              <LinkStyled href="#">Privacy</LinkStyled>
              
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