import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import style from './Create.module.scss';
import Footer from 'components/base/Footer';
import FloatingHeader from 'components/base/FloatingHeader';
import ArrowBottom from 'components/assets/arrowBottom';
import Upload from 'components/assets/upload';
import WhiteWaterMark from 'components/assets/WhiteWaterMark';
import Eye from 'components/assets/eye';

import { UserType } from 'interfaces/index';

import { NFTProps } from 'pages/create';

export interface CreateProps {
  user: UserType;
  setModalExpand: (b: boolean) => void;
  setNotAvailable: (b: boolean) => void;
  setModalCreate: (b: boolean) => void;
  NFTData: NFTProps;
  setNFTData: (o: NFTProps) => void;
  NFT: File | null;
  setNFT: (f: File) => void;
  secretNFT: File | null;
  setSecretNFT: (f: File) => void;
  select: string;
  setSelect: (s: string) => void;
  processFile: () => Promise<void>;
  setError: (s: string) => void;
  setProcessed: (b: boolean) => void;
}

const Create: React.FC<CreateProps> = ({
  setModalExpand,
  setNotAvailable,
  setModalCreate,
  NFT,
  setNFT,
  secretNFT,
  setSecretNFT,
  NFTData: initalValue,
  setNFTData: setNftDataToParent,
  user,
  select,
  setSelect,
  processFile,
  setError,
  setProcessed,
}) => {
  const [exp, setExp] = useState(false);
  const [isRN, setIsRN] = useState(false);
  const [nftData, setNFTData] = useState({} as NFTProps)
  const { name, description, quantity } = nftData;

  useEffect(() => {
    setIsRN(window.isRNApp);
    setNFTData(initalValue)
  });

  const validateQuantity = (value: number, limit: number) => {
    return (value && value > 0 && value <= limit)
  }

  const isDataValid = name && description && validateQuantity(quantity, 10) && select !== 'Select NFT Option'

  function onChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    const nextNftData = { ...nftData, [e.target.name]: e.target.value }
    setNFTData(nextNftData);
    setNftDataToParent(nextNftData);
  }

  function returnType(NFTarg: File) {
    if (NFTarg!.type.substr(0, 5) === 'image')
      return (
        <img
          className={style.IMGBackground}
          src={URL.createObjectURL(NFTarg)}
          alt="img"
          id="output"
        />
      );
    else if (NFTarg!.type.substr(0, 5) === 'video')
      return (
        <video autoPlay muted playsInline loop className={style.IMGBackground}>
          <source
            id="outputVideo"
            src={URL.createObjectURL(NFTarg)}
            type="video/mp4"
          />
        </video>
      );
  }

  function uploadFiles() {
    if (
      !name ||
      !description ||
      !quantity ||
      quantity > 10 ||
      select === 'Select NFT Option'
    ) {
      setError('Please fill the form entirely.');
      setModalCreate(true);
      return false;
    }
    if (
      secretNFT!.type.substr(0, 5) === 'image' &&
      select !== 'None' &&
      select !== 'Secret'
    ) {
      processFile();
    } else {
      setProcessed(true);
    }
    setModalCreate(true);
  }

  function checkType() {
    if (
      secretNFT!.type.substr(0, 5) === 'video' ||
      secretNFT!.type === 'image/gif'
    )
      return false;
    else return true;
  }

  return (
    <div className={style.Container}>
      <div className={style.Wrapper}>
        <div className={style.Label}>Coming Soon</div>
        <h2 className={style.Title}>Create NFT</h2>
        <div className={style.InnerContainer}>
          <div className={style.Top}>
            <span className={style.TopInf}>
              <Eye className={style.EyeSVG} />
              NFT Preview
            </span>
          </div>
          <div className={style.Data}>
            <div className={style.Left}>
              <label
                htmlFor="uploadNFT"
                className={
                  secretNFT
                    ? style.NFTPreview
                    : `${style.NFTPreview} ${style.NFTPreviewBorder}`
                }
              >
                <div className={secretNFT ? style.Hidden : style.NFTNull}>
                  <Upload className={style.UploadSVG} />
                  <div className={style.InsightMedium}>
                    Click here to upload your file.
                  </div>
                  <div className={style.InsightLight}>
                    JPEG, JPG, PNG, GIF, or MP4. Max 30mb.
                  </div>
                </div>

                {secretNFT && returnType(secretNFT)}

                <div className={style.HiddenShell}>
                  <input
                    type="file"
                    id="uploadNFT"
                    onChange={(event) => {
                      const { target } = event;
                      if (target && target.files) setSecretNFT(target.files[0]);
                    }}
                    className={style.HiddenInput}
                    accept=".jpg, .jpeg, .png, .gif, .mp4"
                  />
                </div>

                {select === 'Blur' && secretNFT && (
                  <div className={style.Blur} />
                )}
                {select === 'Protect' && secretNFT && (
                  <div className={style.OPTN}>
                    <div className={style.OPTNCTNR}>
                      <WhiteWaterMark className={style.WaterMarkSVG} />
                    </div>
                  </div>
                )}
                {select === 'Secret' && (
                  <label
                    htmlFor="uploadSecretNFT"
                    className={
                      NFT
                        ? style.NFTSPreview
                        : `${style.NFTSPreview} ${style.NFTPreviewBorder}`
                    }
                  >
                    <div className={NFT ? style.Hidden : style.NFTSNull}>
                      <div className={style.Label}>Coming soon</div>
                      <Upload className={style.UploadSVG2} />
                      <div className={style.NFTSTips}>
                        Click to select your file that will hide your NFT for
                        the surprise.
                      </div>
                      <div className={style.NFTSTips2}>
                        Once purchased, the owner will be able to see your NFT
                      </div>
                    </div>
                    {NFT && returnType(NFT)}
                    <div className={style.HiddenShell}>
                      <input
                        type="file"
                        id="uploadSecretNFT"
                        onChange={(event) => {
                          const { target } = event;
                          if (target && target.files) setNFT(target.files[0]);
                        }}
                        className={style.HiddenInput}
                        accept=".jpg, .jpeg, .png, .gif, .mp4"
                      />
                    </div>
                  </label>
                )}
              </label>
            </div>
            <div className={style.Right}>
              <div className={style.InputShell}>
                <h4 className={style.Subtitle}>Name</h4>
                <input
                  type="text"
                  placeholder="Ternoa collection"
                  onChange={onChange}
                  name="name"
                  value={name}
                  className={style.Input}
                />
              </div>

              <div className={style.InputShell}>
                <h4 className={style.Subtitle}>Description</h4>
                <textarea
                  placeholder="A cool description"
                  name="description"
                  value={description}
                  onChange={onChange}
                  className={style.Textarea}
                />
              </div>

              <div className={style.InputShell}>
                <h4 className={style.Subtitle}>
                  Quantity <span className={style.Insight}>(max: 10)</span>
                </h4>
                <input
                  type="text"
                  name="quantity"
                  value={quantity}
                  onChange={onChange}
                  placeholder="1"
                  className={`${style.Input} ${quantity && !validateQuantity(quantity, 10) ? style.InputError : ""}`}
                />
              </div>

              <div className={style.SelectShell}>
                <div className={style.SelectContainer}>
                  <div
                    className={secretNFT ? style.Select : style.SelectDisabled}
                    onClick={() => {
                      secretNFT ? setExp(!exp) : false;
                    }}
                  >
                    {select}
                    <ArrowBottom
                      className={exp ? style.arrowbtmselect : style.arrowbtm}
                    />
                  </div>
                  {exp && (
                    <div className={style.SelectOptn}>
                      {checkType() && (
                        <div
                          className={style.SelectItem}
                          onClick={() => {
                            setSelect('Protect');
                            setExp(false);
                          }}
                        >
                          Protect
                        </div>
                      )}
                      <div
                        className={style.SelectItem}
                        onClick={() => {
                          setSelect('Secret');
                          setExp(false);
                        }}
                      >
                        Secret
                      </div>

                      {checkType() && (
                        <div
                          className={style.SelectItem}
                          onClick={() => {
                            setSelect('Blur');
                            setExp(false);
                          }}
                        >
                          Blur
                        </div>
                      )}
                      <div
                        className={style.SelectItem}
                        onClick={() => {
                          setSelect('None');
                          setExp(false);
                        }}
                      >
                        None
                      </div>
                    </div>
                  )}
                </div>
                <Link href="/faq">
                  <a className={style.Link}>How it works</a>
                </Link>
              </div>
            </div>
          </div>
          {!isRN && (
            <div 
              className={`${style.Create} ${!isDataValid ? style.CreateDisabled : ""}`}
              onClick={() => isDataValid && uploadFiles()}
            >
              Create NFT
            </div>
          )}
        </div>
      </div>
      <Footer setNotAvailable={setNotAvailable} />
      <FloatingHeader user={user} setModalExpand={setModalExpand} />
    </div>
  );
};

export default Create;