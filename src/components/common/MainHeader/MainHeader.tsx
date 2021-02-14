import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { FaSearch } from 'react-icons/fa';
import Col from '../ui-library/Col/Col';
import Row from '../ui-library/Row/Row';
import Button from '../ui-library/Button/Button';
import Input from '../ui-library/Input/Input';
import colors from '../ui-library/styles/colors';
import { Context } from '../../../utils/store/store';
import { H3 } from '../Title/Title';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { ReactComponent as TernoaLogo } from '../assets/logo-ternoa.svg';

const ContainerHeader = styled.div`
  padding:21px 0;
  width:100%;
`;

const TitleHeader = styled(H3)`
  text-align:right;
  margin:0;
  padding:0;
  cursor: pointer;
  outline: none;
`;

const SearchStyled = styled.div`
  position: relative;
  display: block;
  margin: 0px auto;
  text-align: center;
  z-index: 2;
`;

const FaSearchStyled = styled(FaSearch)`
  position: absolute;
  top: 12px;
  left: 15px;
  font-weight: bold;
  font-style: normal;
`;

const InputStyled = styled(Input)`
  line-height: 30px;
  padding-left: 30px;
  z-index: 1;
  &:focus {
   outline: none;
   border: 1px solid ${colors.gray_button};
  }
`;

const MainHeader: React.FC = () => {
  
  const { state } = useContext(Context);
  const history = useHistory();
  const { t } = useTranslation();

  const goToTopPage= () => {
    history.push('/');
  };

  return (
    <ContainerHeader>
      {state.isLoading && <LoadingSpinner />}
      <Row>
        {/* Application name */}
        <Col small="50" medium="20" large="20">
          <TitleHeader role="button" tabIndex={0} onClick={goToTopPage}>
            <TernoaLogo />
            <span>&nbsp; Ternoa Stamp</span>
          </TitleHeader>
          
        </Col>
        {/* Search Button */}
        <Col small="50" medium="50" large="50">
          <SearchStyled>
            <FaSearchStyled />
            <InputStyled full placeholder={t('header.find')} type="search" />
          </SearchStyled>
        </Col>
        
        {/* Buttons menu */}
        <Col small="100" medium="30" large="30">
          <div>
            <Button 
              primary 
              onClick={() => {history.push('/create');}}
            >
              {t('header.createButton')}
            </Button>
        
            <Button 
              onClick={() => {history.push('/connect-wallet');}}
            >
              {t('header.connectWallet')}
            </Button>
          </div>
        
        </Col>
      </Row>
    </ContainerHeader>
  );
};

export default MainHeader;
