/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Col from '../../common/ui-library/Col/Col';
import Row from '../../common/ui-library/Row/Row';
import Button from '../../common/ui-library/Button/Button';
import NftCard from '../../common/NftCard/NftCard';
import { ApiProxyUri } from '../../../utils/utils';
import 'react-tabs/style/react-tabs.css';

type TempTabContentProps =  {
  nftList: any[];
};

const TempTabContent: React.FC<TempTabContentProps> = ({ nftList }) => (
  <Row>
    {/* nftList?.map((nft, index) => (
      <NftCard key={nft.id} nft={nft} />
    )) */}
    <Col size="20" />
  </Row>
);

const ProfileTopPagePage: React.FC<LoadablePageType> = ({ setIsLoading }) => {

  const { t } = useTranslation();

  const history = useHistory();

  // Nft list in state
  const [nftList, setNftList] = useState([]);

  // // Retrieve NFT info when component loaded
  useEffect(  () => {
    async function fetchData() {
      setIsLoading(true);
      const res = await axios.get(`${ApiProxyUri}/nfts`);
      setNftList(res.data.nfts);
      setIsLoading(false);
    }
    fetchData();
  }, [setIsLoading]);

  return (
    <div>
      <div style={{ textAlign: 'right', margin: '0 auto' }}>
        <Button onClick={() => history.push('/profile')}>Profile</Button>
      </div>
      <Tabs>
        <TabList>
          <Tab>{t('profileTopPage.tab1')}</Tab>
          <Tab>{t('profileTopPage.tab2')}</Tab>
          <Tab>{t('profileTopPage.tab3')}</Tab>
          <Tab>{t('profileTopPage.tab4')}</Tab>
          <Tab>{t('profileTopPage.tab5')}</Tab>
          <Tab>{t('profileTopPage.tab6')}</Tab>
        </TabList>

        <TabPanel>
          <TempTabContent nftList={nftList} />
        </TabPanel>
        <TabPanel>
          <TempTabContent nftList={nftList} />
        </TabPanel>
        <TabPanel>
          <TempTabContent nftList={nftList} />
        </TabPanel>
        <TabPanel>
          <TempTabContent nftList={nftList} />
        </TabPanel>
        <TabPanel>
          <TempTabContent nftList={nftList} />
        </TabPanel>
        <TabPanel>
          <TempTabContent nftList={nftList} />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default ProfileTopPagePage;