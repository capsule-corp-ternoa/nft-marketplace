import React, { useEffect, useState } from 'react';
import style from './Create.module.scss';
import Footer from 'components/base/Footer';
import FloatingHeader from 'components/base/FloatingHeader';
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
  setNFT: (f: File | null) => void;
  secretNFT: File | null;
  setSecretNFT: (f: File | null) => void;
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
  const [nftData, setNFTData] = useState(initalValue);
  const { name, description, quantity } = nftData;
  const [isRN, setIsRN] = useState(false);
  const [acceptedFileTypes, setAcceptedFileTypes] = useState([
    '.jpg',
    '.jpeg',
    '.png',
    '.gif',
    '.mp4',
    '.mov',
  ]);

  useEffect(() => {
    setIsRN(window.isRNApp);
  }, []);

  useEffect(() => {
    if (isRN) {
      setAcceptedFileTypes(['.jpg', '.jpeg', '.png', '.gif']);
    }
  }, [isRN]);

  const validateQuantity = (value: number, limit: number) => {
    return value && value > 0 && value <= limit;
  };

  const isDataValid =
    name &&
    description &&
    validateQuantity(quantity, 10) &&
    secretNFT &&
    (select !== 'Secret' || NFT) &&
    select !== 'Select NFT Option';

  function onChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    const nextNftData = { ...nftData, [e.target.name]: e.target.value };
    setNFTData(nextNftData);
    setNftDataToParent(nextNftData);
  }

  function returnType(NFTarg: File) {
    if (NFTarg!.type.substr(0, 5) === 'image') {
      return (
        <img
          className={style.IMGBackground}
          src={URL.createObjectURL(NFTarg)}
          alt="img"
          id="output"
        />
      );
    } else if (NFTarg!.type.substr(0, 5) === 'video') {
      return (
        <video
          autoPlay
          muted
          playsInline
          loop
          className={style.IMGBackground}
          key={NFTarg.name + NFTarg.lastModified}
        >
          <source id="outputVideo" src={URL.createObjectURL(NFTarg)} />
        </video>
      );
    }
  }

  const updateFile = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFunction: (f: File | null) => void
  ) => {
    const { target } = event;
    let file = null;
    let isError = false;
    if (!(target && target.files && target.files[0])) {
      setFunction(file);
      setSelect('Select NFT Option');
      return;
    }
    if (!isError && isRN && target.files[0]!.type.substr(0, 5) === 'video') {
      setError("You can't select video type on mobile DApp yet.");
      isError = true;
    }
    if (
      !isError &&
      !(
        target.files[0]!.type.substr(0, 5) === 'video' ||
        target.files[0]!.type.substr(0, 5) === 'image'
      )
    ) {
      setError(
        `You can't select files different from ${
          !isRN ? 'videos or ' : ''
        }images.`
      );
      isError = true;
    }
    if (!isError && target.files[0].size > 31000000) {
      setError('Max file size is 30mb.');
      isError = true;
    }
    if (
      (target.files[0]!.type.substr(0, 5) === 'video' ||
        target.files[0]!.type === 'image/gif') &&
      (select === 'Blur' || select === 'Protect')
    ) {
      setSelect('Select NFT Option');
    }
    if (!isError) {
      file = target.files[0];
    } else {
      setModalCreate(true);
      setSelect('Select NFT Option');
    }
    setFunction(file);
  };

  function uploadFiles() {
    if (
      !name ||
      !description ||
      !quantity ||
      quantity > 10 ||
      secretNFT === null ||
      (select === 'Secret' && NFT === null) ||
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

  return (
    <div className={style.Container}>
      <div className={style.Wrapper}>
        <h2 className={style.Title}>Create NFT</h2>
        <span className={style.Subtitle}>
          <Eye className={style.EyeSVG} />
          NFT Preview
        </span>
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
              JPEG, JPG, PNG, GIF{`${!isRN ? ', MP4 or MOV' : ''}`}. Max 30mb.
            </div>
          </div>

          {secretNFT && returnType(secretNFT)}

          <div className={style.HiddenShell}>
            <input
              type="file"
              id="uploadNFT"
              onChange={(event) => updateFile(event, setSecretNFT)}
              className={style.HiddenInput}
              accept={acceptedFileTypes.join(',')}
            />
          </div>

          {select === 'Blur' && secretNFT && <div className={style.Blur} />}
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
                <Upload className={style.UploadSVG2} />
                <div className={style.NFTSTips}>
                  Click to select your file that will hide your NFT for the
                  surprise.
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
                  onChange={(event) => updateFile(event, setNFT)}
                  className={style.HiddenInput}
                  accept={acceptedFileTypes.join(',')}
                />
              </div>
            </label>
          )}
        </label>
        <div className={style.Data}>
          <div className={style.Left}>
            <div className={style.InputShell}>
              <h4 className={style.InputLabel}>Name</h4>
              <input
                type="text"
                placeholder="Enter name"
                onChange={onChange}
                name="name"
                value={name}
                className={style.Input}
              />
            </div>

            <div
              className={`${style.InputShell} ${style.InputShellDescription}`}
            >
              <h4 className={style.InputLabel}>Description</h4>
              <textarea
                placeholder="Tell about the NFT in a few words..."
                name="description"
                value={description}
                onChange={onChange}
                className={`${style.Input} ${style.Textarea}`}
              />
            </div>
          </div>
          <div className={style.Right}>
            <div className={style.InputShell}>
              <h4 className={style.InputLabel}>Category</h4>
              <input
                type="text"
                placeholder="NFT Category"
                onChange={onChange}
                name="name"
                value={name}
                className={style.Input}
              />
            </div>

            <div className={style.InputShell}>
              <h4 className={style.InputLabel}>
                Royalties <span className={style.Insight}>(max: 10%)</span>
              </h4>
              <input
                type="text"
                placeholder="Enter royalties"
                onChange={onChange}
                name="name"
                value={name}
                className={style.Input}
              />
            </div>

            <div className={style.InputShell}>
              <h4 className={style.InputLabel}>
                Quantity <span className={style.Insight}>(max: 10)</span>
              </h4>
              <input
                type="text"
                name="quantity"
                value={quantity}
                onChange={onChange}
                placeholder="1"
                className={`${style.Input} ${
                  quantity && !validateQuantity(quantity, 10)
                    ? style.InputError
                    : ''
                }`}
              />
            </div>

            <div className={style.InputShell}>
              <h4 className={style.InputLabel}>Serie ID</h4>
              <input
                type="text"
                placeholder="Enter ID"
                onChange={onChange}
                name="name"
                value={name}
                className={style.Input}
              />
            </div>
          </div>
        </div>
        <span className={style.Advice}>
          Once the information is entered, it will be impossible to modify it !
        </span>
        <button
          className={`${style.Create} ${
            !(isDataValid && user) ? style.CreateDisabled : ''
          }`}
          onClick={() => isDataValid && user && uploadFiles()}
        >
          Create NFT
        </button>
      </div>
      <Footer setNotAvailable={setNotAvailable} />
      <FloatingHeader user={user} setModalExpand={setModalExpand} />
    </div>
  );
};

export default Create;
