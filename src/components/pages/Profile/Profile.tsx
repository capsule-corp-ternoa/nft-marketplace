import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { ApiProxyUri } from '../../../utils/utils';
import { 
  InputBoxStandart, 
  InputBoxTextArea } from '../../common/InputBox/InputBox';
import { H1 } from '../../common/Title/Title';
import Button from '../../common/ui-library/Button/Button';

const WarningMessageStyled = styled.p`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  align-items: center;
  color: #878cff;
`;

const Profile: React.FC<LoadablePageType> = ({ setIsLoading }) => {

  // Nft information
  const [user, setUser] = useState({} as UserType);
  
  // // Retrieve NFT info when component loaded
  useEffect(  () => {
    async function fetchData() {
      setIsLoading(true);
      const res = await axios.get(`${ApiProxyUri}/user/1`);
      setUser(res.data.user);
      setIsLoading(false);
    }
    fetchData();
  }, [setIsLoading]);

  const { t } = useTranslation();

  return (
    <>

      <Helmet>
        <title>{t('profile.seo.title')}</title>
        <meta name="description" content={t('profile.seo.description')} />
        <meta name="keywords" content={t('profile.seo.keywords')} />
      </Helmet>

      <H1>{t('profile.settings')}</H1>
      <InputBoxStandart 
        uid="settings_name" 
        label={t('profile.displayName')}
        value={user && user.displayName}
      />

      <InputBoxStandart 
        uid="settings_url" 
        label={t('profile.customUrl')}
        value={user && user.customUrl}
      />

      <InputBoxTextArea
        uid="settings_bio" 
        label={t('profile.bio')}
        value={user && user.bio}
      />

      <InputBoxStandart
        uid="settings_twitter"
        label={t('profile.twitter')}
        subTitle={t('profile.twitterSubText')}
        value={user && user.twitter}
      />

      <InputBoxStandart
        uid="settings_portfolio"
        label={t('profile.personalSite')}
        subTitle={t('profile.personalSiteSubText')}
        value={user && user.site}
      />

      <WarningMessageStyled>
        {t('profile.explanation1')}
        <br />
        {t('profile.explanation2')}
      </WarningMessageStyled>

      <Button primary>{t('profile.updateButton')}</Button>

    </>
  );
};

export default Profile;
