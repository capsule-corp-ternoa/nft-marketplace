import React, { useState } from 'react';
import style from './Edit.module.scss';
import Badge from 'components/assets/badge';
import gradient from 'random-gradient';
import { UserType } from 'interfaces';

export interface EditProps {
  user: UserType;
  setNotAvailable: (b: boolean) => void;
  setBanner: (s: string) => void;
}

const Edit: React.FC<EditProps> = ({ user, setNotAvailable, setBanner }) => {
  const bgGradient = user ? { background: gradient(user.name) } : {};
  const [data, setData] = useState(user);

  function manageSetBanner(x: string) {
    setBanner(x);
    setData({ ...data, banner: x });
  }

  return (
    <div className={style.EditContainer}>
      <label htmlFor="uploadBanner" className={style.EditButton}>
        Edit banner
        <div className={style.HiddenShell}>
          <input
            type="file"
            id="uploadBanner"
            onChange={(event) => {
              const { target } = event;
              if (target && target.files)
                manageSetBanner(URL.createObjectURL(target.files[0]));
            }}
            className={style.HiddenInput}
          />
        </div>
      </label>
      <div className={style.Title}>Edit my profile</div>
      <div className={style.InnerContainer}>
        <div className={style.Form}>
          <h4 className={style.Subtitle}>Display Name</h4>
          <input
            placeholder="Enter your display name"
            type="text"
            className={style.Input}
            value={data.name}
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
            value={data.description}
          />

          <div className={style.TopInput}>
            <h4 className={style.Subtitle}>Twitter username</h4>
            <div className={style.ClaimTwitter}>
              Verify your twitter account
            </div>
          </div>
          <input
            placeholder="@username"
            type="text"
            value={data.twitter}
            className={style.Input}
          />
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
          <div style={bgGradient} className={style.Avatar}>
            {data.picture ? (
              <img
                draggable="false"
                className={style.AvatarIMG}
                src={data.picture}
              />
            ) : (
              <div className={style.CreatorLetter}>{user.name.charAt(0)}</div>
            )}
          </div>
          <div className={style.IMGSize}>500x500px recommanded</div>
          <label htmlFor="uploadProfile" className={style.UploadButton}>
            Upload
            <div className={style.HiddenShell}>
              <input
                type="file"
                id="uploadProfile"
                onChange={(event) => {
                  const { target } = event;
                  if (target && target.files)
                    setData({
                      ...data,
                      picture: URL.createObjectURL(target.files[0]),
                    });
                }}
                className={style.HiddenInput}
              />
            </div>
          </label>

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
