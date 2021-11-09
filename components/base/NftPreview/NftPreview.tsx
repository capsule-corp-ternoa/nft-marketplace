import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import Eye from 'components/assets/eye';
import NftUpload from 'components/base/NftUpload';
import {
  NftEffectType,
  NFT_EFFECT_BLUR,
  NFT_EFFECT_DEFAULT,
  NFT_EFFECT_PROTECT,
  NFT_EFFECT_SECRET,
} from 'interfaces';
import Select from 'ui/components/Select';
import { breakpointMap } from 'ui/theme/base';

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

  const isMobile = useMediaQuery({
    query: `(max-device-width: ${breakpointMap.md}px)`,
  });

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
    <div className={className}>
      {NFT && (
        <Title>
          <EyeIcon />
          NFT Preview
        </Title>
      )}
      {isMobile ? (
        <NftPreviewCardSelection>
          <NftPreviewCard
            isSelected
            NFT={NFT}
            secretNFT={secretNFT}
            setError={setError}
            setModalCreate={setModalCreate}
            setSecretNFT={setSecretNFT}
            setEffect={setEffect}
            type={effect}
          />
          <SSelect text={effect}>
            {(setSelectExpanded) => (
              <>
                {NFT_EFFECTS_ORDERED.map(
                  (type, id) =>
                    type !== effect && (
                      <li
                        key={id}
                        onClick={() => {
                          setSelectExpanded(false);
                          setEffect(type);
                        }}
                      >
                        {type}
                      </li>
                    )
                )}
              </>
            )}
          </SSelect>
          <Separator />
        </NftPreviewCardSelection>
      ) : (
        <NftPreviewCardList>
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
        </NftPreviewCardList>
      )}
    </div>
  );
};

const Title = styled.h3`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Airbnb Cereal App Medium';
  font-size: 2rem;
  line-height: 1.3;
  margin: 0 0 2.4rem;

  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 4rem;
    justify-content: start;
  }
`;

const EyeIcon = styled(Eye)`
  width: 2.4rem;
  margin-right: 1rem;
  fill: black;
`;

const NftPreviewCardSelection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SSelect = styled(Select)`
  margin-top: 2.4rem;
`;

const Separator = styled.div`
  width: 15rem;
  border-bottom: 2px solid #e0e0e0;
  margin-top: 3.2rem;
`;

const NftPreviewCardList = styled.fieldset`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.2rem;
  border: none;
  padding: 0;
`;

export default NftPreview;
