import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { H1, H3, P } from '../../common/Title/Title';
import Col from '../../common/ui-library/Col/Col';
import Row from '../../common/ui-library/Row/Row';
import Card from '../../common/ui-library/Card/Card';
import TinyContainer from '../../common/ui-library/TinyContainer/TinyContainer';
import Colors from '../../common/ui-library/styles/colors';

const CategoryCard = styled(Card)`
  text-align: center;
  margin: 0 auto;
  & h3,
  div {
    text-align: center;
    margin: 0 auto;
    padding: 0;
  }
  &:hover {
    background: ${Colors.background_gray};
    cursor: pointer;
  }
`;

const SampleCard = styled.div`
  background: linear-gradient(180deg, #f29fff 0%, #878cff 100%);
  border-radius: 4px;
  height: 112px;
  width: 79px;
`;



const CreateCollectiblePage: React.FC = () => {

  const history = useHistory();

  const createSingle = () => {
    history.push('/create-single-collectible');
  };  

  const createMultiple = () => {
    history.push('/create-multiple-collectible');
  };  

  return (
    <TinyContainer>
      <span>
        <FaArrowLeft />
        &nbsp; Go back
      </span>

      <H1>Create Collectible</H1>

      <P>
        Choose “Single” if you want your collectible to be one of a kind or
        “Multiple” if you want to sell one collectible multiple times
      </P>

      <Row>
        <Col size="50">
          <CategoryCard onClick={createSingle}>
            <SampleCard />
            <H3>Single</H3>
          </CategoryCard>
        </Col>

        <Col size="50">
          <CategoryCard onClick={createMultiple}>
            <SampleCard />
            <H3>Multiple</H3>
          </CategoryCard>
        </Col>
      </Row>

      <P>
        We do not own your private keys and cannot access your funds without
        your confirmation
      </P>
    </TinyContainer>
  );
};

export default CreateCollectiblePage;