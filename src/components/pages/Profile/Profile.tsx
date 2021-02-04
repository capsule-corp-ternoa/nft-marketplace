import React from 'react';
import styled from 'styled-components';
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

const Profile: React.FC = () => (
  <>

    <H1>Settings</H1>

    <InputBox inputType={InputType.Standard} key="fd" label="Display name" />

    <InputBox inputType={InputType.Standard} key="fd" label="Custom Url" />

    <InputBox inputType={InputType.TextBox} key="fd" label="Bio" />

    <InputBox
      inputType={InputType.Standard}
      key="fd"
      label="Twitter username"
      subTitle="Verify your Twitter account in order to get the verification badge"
    />

    <InputBox
      inputType={InputType.Standard}
      key="fd"
      label="Personal site or portfolio"
      subTitle="Register your personal URL"
    />

    <WarningMessageStyled>
      To update your settings you should sign message through your wallet. 
      <br />
      Click 'Update profile' then sign the message.
    </WarningMessageStyled>

    <Button primary>Update profile</Button>

  </>
);

export default Profile;
