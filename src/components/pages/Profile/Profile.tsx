import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
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

  // Retrieve NFT info when component loaded
  useEffect(() => {
    fetchOneUser(dispatch);
  }, [dispatch]);
  
  return (
    <>

      <H1>Settings</H1>
      <InputBoxStandart 
        uid="settings_name" 
        label="Display name"
        value={state.user && state.user.displayName}
      />

      <InputBoxStandart 
        uid="settings_url" 
        label="Custom Url"
        value={state.user && state.user.customUrl}
      />

      <InputBoxTextArea
        uid="settings_bio" 
        label="Bio"
        value={state.user && state.user.bio}
      />

      <InputBoxStandart
        uid="settings_twitter"
        label="Twitter username"
        subTitle="Verify your Twitter account in order to get the verification badge"
        value={state.user && state.user.twitter}
      />

      <InputBoxStandart
        uid="settings_portfolio"
        label="Personal site or portfolio"
        subTitle="Register your personal URL"
        value={state.user && state.user.site}
      />

      <WarningMessageStyled>
        To update your settings you should sign message through your wallet. 
        <br />
        Click 'Update profile' then sign the message.
      </WarningMessageStyled>

      <Button primary>Update profile</Button>

    </>
  );
};

export default Profile;
