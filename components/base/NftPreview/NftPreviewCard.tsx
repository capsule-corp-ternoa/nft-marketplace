import React from 'react';
import WhiteWaterMark from 'components/assets/WhiteWaterMark';
import NftUpload from 'components/base/NftUpload';
import {
  NftEffectType,
  NFT_EFFECT_BLUR,
  NFT_EFFECT_PROTECT,
  NFT_EFFECT_SECRET,
} from 'interfaces';

import style from './NftPreviewCard.module.scss';

interface Props {
  isSelected: boolean;
  NFT: File | null;
  secretNFT: File;
  setError: (s: string) => void;
  setModalCreate: (b: boolean) => void;
  setNFT: (f: File | null) => void;
  setSelect: (s: NftEffectType) => void;
  type: NftEffectType;
}

function returnType(NFTarg: File, isSelected: boolean) {
  if (NFTarg!.type.substr(0, 5) === 'image') {
    return (
      <img
        className={`${style.IMGBackground} ${
          isSelected ? style.IMGBackground__selected : ''
        }`}
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

const NftPreviewCard = ({
  isSelected = false,
  NFT,
  secretNFT,
  setError,
  setModalCreate,
  setNFT,
  setSelect,
  type,
}: Props) => {
  return (
    <>
      <label
        className={`${style.NftPreviewCard} ${
          isSelected ? style.NftPreviewCard__active : ''
        }`}
        htmlFor={`NftType_${type}`}
      >
        <div className={style.IMGWrapper}>
          {returnType(secretNFT, isSelected)}
          {type === NFT_EFFECT_BLUR && <div className={style.Blur} />}
          {type === NFT_EFFECT_PROTECT && (
            <div
              className={`${style.OPTN} ${
                isSelected ? style.OPTN__selected : ''
              }`}
            >
              <div className={style.OPTNCTNR}>
                <WhiteWaterMark className={style.WaterMarkSVG} />
              </div>
            </div>
          )}
          {type === NFT_EFFECT_SECRET && (
            <div className={style.SecretWrapper}>
              {NFT === null ? (
                <NftUpload
                  className={style.SecretUpload}
                  description={
                    <div className={style.SecretUploadDescription}>
                      <span className={style.SecretUploadTopDescription}>
                        Drag your the preview of your secret.
                      </span>
                      <span>
                        Once purchased, the owner will be able to see your NFT
                      </span>
                    </div>
                  }
                  //isRN={isRN}
                  isSecretOption
                  note={`PNG, GIF, WEBP, MP4 or MP3. Max 30mb.`}
                  setError={setError}
                  setModalCreate={setModalCreate}
                  setSecretNFT={setNFT}
                  setSelect={setSelect}
                />
              ) : (
                returnType(NFT, isSelected)
              )}
            </div>
          )}
        </div>

        <div className={style.NftTypeRadio}>
          <input
            type="radio"
            className={style.InputRadio}
            checked={isSelected}
            readOnly
          />
          <span className={style.NftTypeRadioLabel}>{type}</span>
        </div>
      </label>

      <div className={style.HiddenShell}>
        <input
          type="radio"
          id={`NftType_${type}`}
          className={style.HiddenInput}
          name={`NftType_${type}`}
          onClick={() => setSelect(type)}
          value={type}
        />
      </div>
    </>
  );
};

export default NftPreviewCard;
