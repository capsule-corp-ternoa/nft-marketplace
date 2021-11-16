import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import Eye from 'components/assets/eye';
import NftUpload from 'components/base/NftUpload';
import { Subtitle } from 'components/layout';
import { useCreateNftContext } from 'components/pages/Create/CreateNftContext';
import Select from 'components/ui/Select';
import {
  NftEffectType,
  NFT_EFFECT_BLUR,
  NFT_EFFECT_DEFAULT,
  NFT_EFFECT_PROTECT,
  NFT_EFFECT_SECRET,
  NFT_FILE_TYPE_GIF,
  NFT_FILE_TYPE_VIDEO,
} from 'interfaces';
import { breakpointMap } from 'style/theme/base';

import NftPreviewCard from './NftPreviewCard';

interface Props {
  className?: string;
}

const NFT_EFFECTS_ORDERED: NftEffectType[] = [
  NFT_EFFECT_DEFAULT,
  NFT_EFFECT_PROTECT,
  NFT_EFFECT_SECRET,
  NFT_EFFECT_BLUR,
];

const NftPreview = ({ className }: Props) => {
  const { createNftData, setEffect, setRN } = useCreateNftContext() ?? {};
  const { effect, isRN, secretNFT } = createNftData ?? {};

  const isMobile = useMediaQuery({
    query: `(max-device-width: ${breakpointMap.md}px)`,
  });

  const handleAllowedEffect = (effect: NftEffectType) => {
    if (secretNFT !== null && secretNFT !== undefined) {
      switch (effect) {
        case NFT_EFFECT_BLUR:
        case NFT_EFFECT_PROTECT:
          return (
            !secretNFT.type.includes(NFT_FILE_TYPE_VIDEO) &&
            secretNFT.type !== NFT_FILE_TYPE_GIF
          );
        default:
          return true;
      }
    }
  };

  useEffect(() => {
    if (setRN !== undefined) {
      setRN(window.isRNApp);
    }
  }, []);

  if (secretNFT === null) {
    return (
      <NftUpload
        className={className}
        content="Click here to upload your file."
        inputId="uploadNft"
        note={`JPEG, JPG, PNG, GIF ${!isRN ? ', MP4 or MOV' : ''}. Max 30mb.`}
      />
    );
  }

  return (
    <div className={className}>
      {secretNFT && (
        <SHeader>
          <Subtitle>
            <SEyeIcon />
            NFT Preview
          </Subtitle>
          {secretNFT.name && (
            <SReuploadWrapper>
              <NftUpload
                content={secretNFT.name}
                inputId="reUploadNft"
                isMinimal
              />
            </SReuploadWrapper>
          )}
        </SHeader>
      )}
      {isMobile && effect !== undefined ? (
        <SWrapper>
          <NftPreviewCard effect={effect} isSelected />
          <SSelect text={effect}>
            {(setSelectExpanded) => (
              <>
                {NFT_EFFECTS_ORDERED.filter(handleAllowedEffect).map(
                  (effectType, id) =>
                    effectType !== effect && (
                      <li
                        key={id}
                        onClick={() => {
                          if (setEffect !== undefined) {
                            setSelectExpanded(false);
                            setEffect(effectType);
                          }
                        }}
                      >
                        {effectType}
                      </li>
                    )
                )}
              </>
            )}
          </SSelect>
          <SSeparator />
        </SWrapper>
      ) : (
        <SFieldset>
          {NFT_EFFECTS_ORDERED.filter(handleAllowedEffect).map(
            (effectType, id) => (
              <NftPreviewCard
                key={id}
                effect={effectType}
                isSelected={effect === effectType}
              />
            )
          )}
        </SFieldset>
      )}
    </div>
  );
};

const SHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0 2.4rem;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    margin-top: 4rem;
    justify-content: start;
  }
`;

const SEyeIcon = styled(Eye)`
  width: 2.4rem;
  margin-right: 1rem;
  fill: black;
`;

const SReuploadWrapper = styled.div`
  margin: 1.6rem 0 0;

  ${({ theme }) => theme.mediaQueries.md} {
    margin: 0 0 0 2.4rem;
    padding-top: 0.6rem;
  }
`;

const SWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SSelect = styled(Select)`
  margin-top: 2.4rem;
`;

const SSeparator = styled.div`
  width: 15rem;
  border-bottom: 2px solid #e0e0e0;
  margin-top: 3.2rem;
`;

const SFieldset = styled.fieldset`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
  border: none;
  padding: 0;
`;

export default React.memo(NftPreview);
