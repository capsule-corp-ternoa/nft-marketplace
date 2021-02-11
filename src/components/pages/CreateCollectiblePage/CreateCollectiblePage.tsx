import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { H1, H3, P } from '../../common/Title/Title';
import Col from '../../common/ui-library/Col/Col';
import Row from '../../common/ui-library/Row/Row';
import Card from '../../common/ui-library/Card/Card';
import TinyContainer from '../../common/ui-library/TinyContainer/TinyContainer';
import Colors from '../../common/ui-library/styles/colors';
import { GoBack } from '../../common/Utils/Utils';

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

  const { t } = useTranslation();

  const createSingle = () => {
    history.push('/create-single-collectible');
  };  

  const createMultiple = () => {
    history.push('/create-multiple-collectible');
  };  

  return (
    <TinyContainer>

      <GoBack text={t('createCollectible.goBack')} history={history} />

      <H1>{t('createCollectible.title')}</H1>

      <P>
        {t('createCollectible.introduction')}
      </P>

      <Row>
        <Col size="50">
          <CategoryCard onClick={createSingle}>
            <SampleCard />
            <H3>{t('createCollectible.single')}</H3>
          </CategoryCard>
        </Col>

        <Col size="50">
          <CategoryCard onClick={createMultiple}>
            <SampleCard />
            <H3>{t('createCollectible.multiple')}</H3>
          </CategoryCard>
        </Col>
      </Row>

      <P>
        {t('createCollectible.closing')}
      </P>
    </TinyContainer>
  );
};

export default CreateCollectiblePage;