import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Context } from '../../../utils/store/store';
import { fetchOneUser } from '../../../utils/store/dataFetcher';
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

const Profile: React.FC = () => {

  // Get the context
  const { dispatch, state } = useContext(Context);

  const { t } = useTranslation();

  // Retrieve NFT info when component loaded
  useEffect(() => {
    fetchOneUser(dispatch);
  }, [dispatch]);
  
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
        value={state.user && state.user.displayName}
      />

      <InputBoxStandart 
        uid="settings_url" 
        label={t('profile.customUrl')}
        value={state.user && state.user.customUrl}
      />

      <InputBoxTextArea
        uid="settings_bio" 
        label={t('profile.bio')}
        value={state.user && state.user.bio}
      />

      <InputBoxStandart
        uid="settings_twitter"
        label={t('profile.twitter')}
        subTitle={t('profile.twitterSubText')}
        value={state.user && state.user.twitter}
      />

      <InputBoxStandart
        uid="settings_portfolio"
        label={t('profile.personalSite')}
        subTitle={t('profile.personalSiteSubText')}
        value={state.user && state.user.site}
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
