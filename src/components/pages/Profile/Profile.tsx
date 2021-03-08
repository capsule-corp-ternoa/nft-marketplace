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

type InitialStateType = { 
  displayName: string;
  customUrl: string;
  bio: string;
  twitter: string;
  site: string;
};

const initialState = { 
  displayName: '',
  customUrl: '',
  bio: '',
  twitter: '',
  site: '',
};

const Profile: React.FC<LoadablePageType> = ({ setIsLoading }) => {

  const [profile, setProfile] = 
    useState(initialState as InitialStateType);

  // Update partial element of the 'updateElement' state
  const updateField = (name: string, value: string) => {
    setProfile({
      ...profile,
      [name]: value,
    });
  };
  
  // // Retrieve user info when component loaded
  useEffect( () => {
    async function fetchData() {
      setIsLoading(true);
      const res = await axios.get(`${ApiProxyUri}/user/1`);
      setProfile(res.data.user);
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
        name="displayName" 
        value={profile.displayName}
        label={t('profile.displayName')}
        onChange={updateField}
        
      />

      <InputBoxStandart 
        name="customUrl" 
        label={t('profile.customUrl')}
        onChange={updateField}
        value={profile.customUrl}
      />

      <InputBoxTextArea
        name="bio" 
        label={t('profile.bio')}
        onChange={updateField}
        value={profile.bio}
      />

      <InputBoxStandart
        name="twitter"
        label={t('profile.twitter')}
        onChange={updateField}
        subTitle={t('profile.twitterSubText')}
        value={profile.twitter}
      />

      <InputBoxStandart
        name="site"
        label={t('profile.personalSite')}
        onChange={updateField}
        subTitle={t('profile.personalSiteSubText')}
        value={profile.site}
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
