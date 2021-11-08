import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import NftUpload from 'components/base/NftUpload';
import {
  NftEffectType,
  NFT_EFFECT_BLUR,
  NFT_EFFECT_DEFAULT,
  NFT_EFFECT_PROTECT,
  NFT_EFFECT_SECRET,
} from 'interfaces';

import NftPreviewCard from './NftPreviewCard';

interface Props {
  className?: string;
  NFT: File | null;
  effect: NftEffectType;
  setError: (s: string) => void;
  setModalCreate: (b: boolean) => void;
  setNFT: (f: File | null) => void;
  secretNFT: File | null;
  setSecretNFT: (f: File | null) => void;
  setEffect: (s: NftEffectType) => void;
}

const NFT_EFFECTS_ORDERED: NftEffectType[] = [
  NFT_EFFECT_DEFAULT,
  NFT_EFFECT_PROTECT,
  NFT_EFFECT_SECRET,
  NFT_EFFECT_BLUR,
];

const NftPreview = ({
  className,
  NFT,
  effect,
  setError,
  setModalCreate,
  setNFT,
  secretNFT,
  setSecretNFT,
  setEffect,
}: Props) => {
  const [isRN, setIsRN] = useState(false);

  useEffect(() => {
    setIsRN(window.isRNApp);
  }, []);

  if (NFT === null) {
    return (
      <NftUpload
        className={className}
        description="Click here to upload your file."
        isRN={isRN}
        note={`JPEG, JPG, PNG, GIF ${!isRN ? ', MP4 or MOV' : ''}. Max 30mb.`}
        setError={setError}
        setModalCreate={setModalCreate}
        setNFT={setNFT}
        setEffect={setEffect}
      />
    );
  }

  return (
    <NftPreviewWrapper className={className}>
      {NFT_EFFECTS_ORDERED.map((type, id) => (
        <NftPreviewCard
          key={id}
          isSelected={effect === type}
          NFT={NFT}
          secretNFT={secretNFT}
          setError={setError}
          setModalCreate={setModalCreate}
          setSecretNFT={setSecretNFT}
          setEffect={setEffect}
          type={type}
        />
      ))}
    </NftPreviewWrapper>
  );
};

const NftPreviewWrapper = styled.fieldset`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.2rem;
  border: none;
  padding: 0;
`

export default NftPreview;
