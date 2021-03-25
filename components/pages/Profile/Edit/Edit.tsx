import React from 'react';
//import { useTranslation } from 'react-i18next';
import style from './Edit.module.scss';
import Badge from 'components/assets/badge';

const Edit: React.FC<any> = ({ item, setNotAvailable }) => {
  //const { t } = useTranslation();

  return (
    <div className={style.EditContainer}>
      <div className={style.Title}>Edit my profile</div>
      <div className={style.InnerContainer}>
        <div className={style.Form}>
          <h4 className={style.Subtitle}>Display Name</h4>
          <input
            placeholder="Enter your display name"
            type="text"
            className={style.Input}
          />
          <h4 className={style.Subtitle}>Custom URL</h4>
          <input
            placeholder="ternoarare.com/enter-your-custom-URL"
            type="text"
            className={style.Input}
          />

          <h4 className={style.Subtitle}>Bio</h4>
          <textarea
            placeholder="Tell about yourself in a few words..."
            className={style.Textarea}
          />

          <div className={style.TopInput}>
            <h4 className={style.Subtitle}>Twitter username</h4>
            <div className={style.ClaimTwitter}>
              Verify your twitter account
            </div>
          </div>
          <input placeholder="@username" type="text" className={style.Input} />
          <div className={style.TwitterInsight}>
            Verify your Twitter account in order to get the verification badge
          </div>

          <h4 className={style.Subtitle}>Personal website or portfolio</h4>
          <input placeholder="https://" type="text" className={style.Input} />

          <div className={style.Warning}>
            To update your settings you should sign message through your wallet.
            Click 'Update profile' then sign the message
          </div>
          <div className={style.Button} onClick={() => setNotAvailable(true)}>
            Update your profile
          </div>
        </div>
        <div className={style.IMG}>
          <div className={style.Avatar}>
            <img className={style.AvatarIMG} src={item.img} />
          </div>
          <div className={style.IMGSize}>500x500px recommanded</div>
          <div
            className={style.UploadButton}
            onClick={() => setNotAvailable(true)}
          >
            Upload
          </div>

          <div className={style.Certification}>
            <Badge className={style.Badge} />
            Want to be certified ? Make a request
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
