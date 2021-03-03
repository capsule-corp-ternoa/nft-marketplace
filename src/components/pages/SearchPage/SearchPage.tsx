import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { ApiProxyUri } from '../../../utils/utils';
import NftCard from '../../common/NftCard/NftCard';
import Col from '../../common/ui-library/Col/Col';
import Row from '../../common/ui-library/Row/Row';
import { H4, GradientText } from '../../common/Title/Title';
import useQuery from '../../../hooks/useQuery';

const SearchPage: React.FC<LoadablePageType> = ({ setIsLoading }) => {

  // Nft list in state
  const [nftList, setNftList] = useState([] as NftObjectType[]);

  const query = useQuery();

  useEffect(  () => {
    async function fetchData() {
      setIsLoading(true);
      const res = await axios.get(`${ApiProxyUri}/nfts`);
      setNftList(res.data.nfts);
      setIsLoading(false);
    }
    fetchData();
  }, [setIsLoading]);

  const { t } = useTranslation();

  return (
    <>
      <H4 style={{ margin: '20px' }}>{t('searchPage.resultsFor')} <GradientText> {query.get('q')} </GradientText></H4>
      <Row>
        {nftList?.map((nft, index) => (
          <NftCard key={nft.id} nft={nft} />
        ))}
        <Col size="20" />
      </Row>
    </>
  );
};

export default SearchPage;