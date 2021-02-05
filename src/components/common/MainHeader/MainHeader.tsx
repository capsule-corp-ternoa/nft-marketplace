import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Col from '../ui-library/Col/Col';
import Row from '../ui-library/Row/Row';
import Button from '../ui-library/Button/Button';
import Input from '../ui-library/Input/Input';
import { Context } from '../../../utils/store/store';
import { H3 } from '../Title/Title';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { ReactComponent as TernoaLogo } from '../assets/logo-ternoa.svg';

const ContainerHeader = styled.div`
  padding:21px 0;
  width:100%;
  height: 44px;
`;

const TitleHeader = styled(H3)`
  text-align:center;
  margin:0;
  padding:0;
`;

const MainHeader: React.FC = () => {
  
  const { state } = useContext(Context);
  const history = useHistory();
  
  const goToTopPage= () => {
    history.push('/');
  };

  return (
    <ContainerHeader>
      {state.isLoading && <LoadingSpinner />}
      <Row>
        {/* Application name */}
        <Col size="20">
          <TitleHeader role="button" tabIndex={0} onClick={goToTopPage}>
            <TernoaLogo />
            &nbsp;
            Ternoa Stamp
          </TitleHeader>
        </Col>
        {/* Search Button */}
        <Col size="50">
          <Input full placeholder="test" type="search" />
        </Col>
        
        {/* Buttons menu */}
        <Col size="30">
          <Button 
            primary 
            onClick={() => {history.push('/create');}}
          >
            Create
          </Button>
        
          <Button 
            onClick={() => {history.push('/connect-wallet');}}
          >
            Connect Wallet
          </Button>
        
        </Col>
      </Row>
    </ContainerHeader>
  );
};

export default MainHeader;
