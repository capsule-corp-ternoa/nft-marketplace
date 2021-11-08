import React, { useEffect, useState } from 'react';
import Upload from 'components/assets/upload';
import WhiteWaterMark from 'components/assets/WhiteWaterMark';
import { NftEffectType, NFT_EFFECT_DEFAULT } from 'interfaces';
import Chip from 'ui/components/Chip';

import style from './NftUpload.module.scss';

interface Props {
  className?: string;
  description?: string | React.ReactElement<any, any>;
  isRN?: boolean;
  isSecretOption?: boolean;
  note?: string;
  setError: (s: string) => void;
  setModalCreate: (b: boolean) => void;
  setNFT: (f: File | null) => void;
  setEffect: (s: NftEffectType) => void;
}

const NftUpload = ({
  className,
  description,
  isRN = false,
  isSecretOption = false,
  note,
  setError,
  setModalCreate,
  setNFT,
  setEffect,
}: Props) => {
  const [acceptedFileTypes, setAcceptedFileTypes] = useState([
    '.jpg',
    '.jpeg',
    '.png',
    '.gif',
    '.mp4',
    '.mov',
  ]);

  useEffect(() => {
    if (isRN) {
      setAcceptedFileTypes(['.jpg', '.jpeg', '.png', '.gif']);
    }
  }, [isRN]);

  const updateFile = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFunction: (f: File | null) => void
  ) => {
    const { target } = event;
    let file = null;
    let isError = false;
    if (!(target && target.files && target.files[0])) {
      setFunction(file);
      setEffect(NFT_EFFECT_DEFAULT);
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
    // if (
    //   (target.files[0]!.type.substr(0, 5) === 'video' ||
    //     target.files[0]!.type === 'image/gif') &&
    //   (effect === 'Blur' || effect === 'Protect')
    // ) {
    //   setEffect('Select NFT Option');
    // }
    if (!isError) {
      file = target.files[0];
    } else {
      setModalCreate(true);
      // setEffect(NFT_EFFECT_DEFAULT);
    }
    setFunction(file);
  };

  const DefaultContent = (
    <div className={style.NFTNull}>
      <Upload className={style.UploadSVG} />
      {description && <div className={style.InsightMedium}>{description}</div>}
      {note && <div className={style.InsightLight}>{note}</div>}
    </div>
  );

  const SmallUploadContent = (
    <div className={`${style.NFTNull} ${style.NFTNull__small}`}>
      <Chip color="primaryInverted" text="Secret option" />
      {description && (
        <div className={`${style.InsightMedium} ${style.InsightMedium__small}`}>
          {description}
        </div>
      )}
      <Upload className={style.UploadSVG__small} />
      {note && (
        <div className={`${style.InsightLight} ${style.InsightLight__small}`}>
          {note}
        </div>
      )}
    </div>
  );

  return (
    <div className={style.NftUploadWrapper}>
      <label
        htmlFor="uploadNFT"
        className={`${className ?? ''} ${style.NftUpload} ${
          style.NftUploadBorder
        }`}
      >
        {isSecretOption ? SmallUploadContent : DefaultContent}

        <div className={style.HiddenShell}>
          <input
            type="file"
            id="uploadNFT"
            onChange={(event) => updateFile(event, setNFT)}
            className={style.HiddenInput}
            accept={acceptedFileTypes.join(',')}
          />
        </div>
      </label>
      {isSecretOption && (
        <Chip
          className={style.SecretChip}
          color="transparent"
          icon={<WhiteWaterMark className={style.SecretChipIcon} />}
          text="Secret"
        />
      )}
    </div>
  );
};

export default NftUpload;
