import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../utils/store/store';
import { fetchOneUser } from '../../../utils/store/dataFetcher';
import InputBox, { InputType } from '../../common/InputBox/InputBox';
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
      <InputBox 
        inputType={InputType.Standard} 
        key="settings_name" 
        label="Display name"
        value={state.user && state.user.displayName}
      />

      <InputBox 
        inputType={InputType.Standard} 
        key="settings_url" 
        label="Custom Url"
        value={state.user && state.user.customUrl}
      />

      <InputBox 
        inputType={InputType.TextBox} 
        key="settings_bio" 
        label="Bio"
        value={state.user && state.user.bio}
      />

      <InputBox
        inputType={InputType.Standard}
        key="settings_twitter"
        label="Twitter username"
        subTitle="Verify your Twitter account in order to get the verification badge"
        value={state.user && state.user.twitter}
      />

      <InputBox
        inputType={InputType.Standard}
        key="settings_portfolio"
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
