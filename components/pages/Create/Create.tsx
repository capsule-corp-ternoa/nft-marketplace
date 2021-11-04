import React, { useState } from 'react';
import Eye from 'components/assets/eye';
import Footer from 'components/base/Footer';
import FloatingHeader from 'components/base/FloatingHeader';
import NftPreview from 'components/base/NftPreview';
import { NftEffectType, NFT_EFFECT_SECRET } from 'interfaces';

import { UserType } from 'interfaces/index';

import { NFTProps } from 'pages/create';

import style from './Create.module.scss';

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
  effect: NftEffectType;
  setEffect: (s: NftEffectType) => void;
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
  effect,
  setEffect,
  processFile,
  setError,
  setProcessed,
}) => {
  const [nftData, setNFTData] = useState(initalValue);
  const { name, description, quantity } = nftData;

  const validateQuantity = (value: number, limit: number) => {
    return value && value > 0 && value <= limit;
  };

  const isDataValid =
    name &&
    description &&
    validateQuantity(quantity, 10) &&
    secretNFT &&
    (effect !== NFT_EFFECT_SECRET || NFT);

  function onChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    const nextNftData = { ...nftData, [e.target.name]: e.target.value };
    setNFTData(nextNftData);
    setNftDataToParent(nextNftData);
  }

  function uploadFiles() {
    if (
      !name ||
      !description ||
      !quantity ||
      quantity > 10 ||
      secretNFT === null ||
      (effect === NFT_EFFECT_SECRET && NFT === null)
    ) {
      setError('Please fill the form entirely.');
      setModalCreate(true);
      return false;
    }
    if (
      secretNFT!.type.substr(0, 5) === 'image' &&
      effect !== NFT_EFFECT_SECRET
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
        <NftPreview
          className={style.NftPreviewWrapper}
          NFT={NFT}
          effect={effect}
          setError={setError}
          setModalCreate={setModalCreate}
          setNFT={setNFT}
          secretNFT={secretNFT}
          setSecretNFT={setSecretNFT}
          setEffect={setEffect}
        />
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
