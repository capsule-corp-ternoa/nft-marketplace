import React, { useState } from 'react';
import style from './Edit.module.scss';
import Badge from 'components/assets/badge';
import gradient from 'random-gradient';
import { UserType } from 'interfaces';
import { validateTwitter, validateUrl } from 'utils/strings';
import ModalEdit from '../ModalEdit/ModalEdit';
import { reviewRequested } from 'actions/user';
import { uploadIPFS } from 'utils/nftEncryption';
import { MARKETPLACE_ID, NODE_API_URL } from 'utils/constant';

export interface EditProps {
  user: UserType;
  setBanner: (s: string) => void;
  setSuccessPopup: (b: boolean) => void;
}

const Edit: React.FC<EditProps> = ({ user, setBanner, setSuccessPopup }) => {
  const bgGradient = user ? { background: gradient(user.name) } : {};
  const [data, setData] = useState({
    walletId: user.walletId,
    name: user.name,
    customUrl: user.customUrl,
    bio: user.bio,
    personalUrl: user.personalUrl,
    twitterName: user.twitterName,
    twitterVerified: user.twitterVerified,
    picture: user.picture,
    banner: user.banner,
    reviewRequested: user.reviewRequested,
    verified: user.verified
  });
  const [modalEditOpen, setModalEditOpen] = useState(false)
  const isDataValid = (
    data && 
    data.name &&
    data.name.length>0 &&
    (!data.customUrl || data.customUrl==="" || validateUrl(data.customUrl)) &&
    (!data.personalUrl || data.personalUrl==="" || validateUrl(data.personalUrl)) &&
    (!data.twitterName || data.twitterName==="" || validateTwitter(data.twitterName))
  )
  const handleChange = (value: any, field: string) => {
    setData({...data, [field]: value})
  }
  const manageSetBanner = (x: string) => {
    setBanner(x);
    handleChange(x, "banner")
  }
  const fileToUrl = async (x: string, name: string) => {
    let blob = await (await fetch(x)).blob();
    let file = new File([blob], name)
    let resUpload = await uploadIPFS(file)
    let { url } = resUpload;
    if (url) {
      return url
    }else{
      throw new Error("Error while saving media")
    }
  }
  const handleUpdate = async () => {
    try{
      if (isDataValid){
        //save picture and banner to pinata before sending api if exist and different
        let updateData = {...data}
        if (data.banner?.substr(0, 4)==="blob") updateData.banner = await fileToUrl(data.banner, 'banner')
        if (data.picture?.substr(0, 4)==="blob") updateData.picture = await fileToUrl(data.picture, 'picture')
        setData(updateData)
        //show update modal
        setModalEditOpen(true)
      }
    }catch(err){
      console.log(err)
    }
  }

  async function reviewRequest() {
    try {
      let res = await reviewRequested(user.walletId);
      if (res) {
        setSuccessPopup(true)
        setData({...data, reviewRequested: res.reviewRequested})
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
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
              className={`${style.Input} ${data.name==="" ? style.InputError : ""}`}
              value={data.name || ''}
              onChange={(e) => handleChange(e.target.value, "name")}
            />
            <h4 className={style.Subtitle}>Custom URL</h4>
            <input
              placeholder="ternoarare.com/enter-your-custom-URL"
              type="text"
              className={`${style.Input} ${data.customUrl && !validateUrl(data.customUrl) ? style.InputError : ""}`}
              value={data.customUrl || ''}
              onChange={(e) => handleChange(e.target.value, "customUrl")}
            />

            <h4 className={style.Subtitle}>Bio</h4>
            <textarea
              placeholder="Tell about yourself in a few words..."
              className={style.Textarea}
              value={data.bio || ''}
              onChange={(e) => handleChange(e.target.value, "bio")}
            />

            <div className={style.TopInput}>
              <h4 className={style.Subtitle}>Twitter username</h4>
              <div className={style.ClaimTwitter}>
                {data.twitterVerified ?
                  <div className={style.TwitterVerified}>
                    <span>{"Verified"}</span>
                    <Badge className={style.BadgeTwitter} />
                  </div>
                :
                  user.twitterName && user.twitterName.length>2 && !user.twitterVerified && MARKETPLACE_ID==="0" && 
                    <a href={`${NODE_API_URL}/api/users/verifyTwitter/${data.walletId}`}>
                      Verify your account ({user.twitterName})
                    </a>
                }
              </div>
            </div>
            <input
              placeholder="@username"
              type="text"
              className={`${style.Input} ${data.twitterName && !validateTwitter(data.twitterName) ? style.InputError : ""}`}
              value={data.twitterName || ''}
              onChange={(e) => handleChange(e.target.value, "twitterName")}
            />
            {!data.twitterVerified && 
              <div className={style.TwitterInsight}>
                Verify your Twitter account in order to get the verification badge
              </div>
            }
            <h4 className={style.Subtitle}>Personal website or portfolio</h4>
            <input 
              placeholder="https://" 
              type="text" 
              className={`${style.Input} ${data.personalUrl && !validateUrl(data.personalUrl) ? style.InputError : ""}`}
              value={data.personalUrl || ''}
              onChange={(e) => handleChange(e.target.value, "personalUrl")}
            />
            <div className={style.Warning}>
              To update your settings you should sign message through your wallet.
              Click 'Update profile' then sign the message
            </div>
            <div className={`${style.Button} ${!isDataValid ? style.ButtonDisabled : ""}`} onClick={() => handleUpdate()}>
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
                    if (target && target.files) handleChange(URL.createObjectURL(target.files[0]), "picture")
                  }}
                  className={style.HiddenInput}
                />
              </div>
            </label>

            {data.verified ?
              <div className={style.Certification}>
                <Badge className={style.Badge} />
                Certified
              </div>
            : 
              data.reviewRequested ?
                <div className={style.Certification}>
                  <Badge className={style.Badge} />
                  Certification review pending 
                </div>
              :
                <div className={style.Certification} onClick={() => reviewRequest()}>
                  <Badge className={style.Badge} />
                  Want to be certified ? Make a request
                </div>
            }
          </div>
        </div>
      </div>
      {modalEditOpen && 
        <ModalEdit 
          setModalExpand={setModalEditOpen} 
          data={data}
        />
      }
    </>
  );
};

export default Edit;
