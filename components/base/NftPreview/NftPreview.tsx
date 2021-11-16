import React from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import Eye from 'components/assets/eye';
import { NftCardWithEffects, NftUpload } from 'components/base/NftPreview';
import { HiddenInput, HiddenShell, Subtitle } from 'components/layout';
import { useCreateNftContext } from 'components/pages/Create/CreateNftContext';
import Radio from 'components/ui/Radio';
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
import { processFile } from 'utils/imageProcessing/image';

interface Props {
  className?: string;
  isRN?: boolean;
}

const NFT_EFFECTS_ORDERED: NftEffectType[] = [
  NFT_EFFECT_DEFAULT,
  NFT_EFFECT_PROTECT,
  NFT_EFFECT_SECRET,
  NFT_EFFECT_BLUR,
];

const NftPreview = ({ className, isRN }: Props) => {
  const { createNftData, setEffect, setError, setNFT } = useCreateNftContext();
  const { blurredValue, effect, secretNFT } = createNftData;

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

  const handleCardSelect = (effect: NftEffectType) => {
    setEffect(effect);
    if (
      secretNFT &&
      (effect === NFT_EFFECT_BLUR || effect === NFT_EFFECT_PROTECT)
    ) {
      processFile(secretNFT, effect, setError, blurredValue).then(setNFT);
    }
  };

  if (secretNFT === null) {
    return (
      <NftUpload
        className={className}
        content="Click here to upload your file."
        inputId="uploadNft"
        isRN={isRN}
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
          <SMobileCardWrapper>
            <NftCardWithEffects effect={effect} isRN={isRN} />
          </SMobileCardWrapper>
          <SSelect text={effect}>
            {(setSelectExpanded) => (
              <>
                {NFT_EFFECTS_ORDERED.filter(handleAllowedEffect).map(
                  (effectType, id) =>
                    effectType !== effect && (
                      <li
                        key={id}
                        onClick={() => {
                          setSelectExpanded(false);
                          setEffect(effectType);
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
          {NFT_EFFECTS_ORDERED.filter(handleAllowedEffect).map((effectType) => (
            <>
              <SLabel
                key={effectType}
                htmlFor={`NftType_${effectType}`}
                isSelected={effect === effectType}
              >
                <SCardWrapper isSelected={effect === effectType}>
                  <NftCardWithEffects effect={effectType} isRN={isRN} />
                </SCardWrapper>

                <SRadio
                  checked={effect === effectType}
                  label={effectType}
                  onChange={() => handleCardSelect(effectType)}
                />
              </SLabel>

              <HiddenShell>
                <HiddenInput
                  type="radio"
                  id={`NftType_${effectType}`}
                  name={`NftType_${effectType}`}
                  onClick={() => handleCardSelect(effectType)}
                  value={effectType}
                />
              </HiddenShell>
            </>
          ))}
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

const SMobileCardWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  filter: drop-shadow(0px 0px 10.4276px rgba(0, 0, 0, 0.25));
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

const SLabel = styled.label<{ isSelected?: boolean }>`
  background: transparent;
  border: 3px solid rgb(0, 0, 0, 0);
  border-radius: 2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  flex: 1 1 0;
  flex-direction: column;
  padding: 0.8rem 0.8rem 2.4rem;
  max-width: 280px;

  &:hover {
    border: 3px dashed #7417ea;
  }

  ${({ isSelected }) =>
    isSelected &&
    `
    border: 3px dashed #7417ea;
  `}
`;

const SCardWrapper = styled.div<{ isSelected: boolean }>`
  width: 100%;
  height: auto;
  opacity: ${({ isSelected }) => (isSelected ? 1 : 0.4)};
`;

const SRadio = styled(Radio)`
  margin-top: 3.2rem;
`;

export default React.memo(NftPreview);
