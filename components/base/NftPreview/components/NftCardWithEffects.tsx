import React from 'react';
import { useMediaQuery } from 'react-responsive';
import styled, { css } from 'styled-components';
import Icon from 'components/ui/Icon';
import { NftUpload } from 'components/base/NftPreview';
import { updateFile } from 'components/base/NftPreview/components/NftUpload';
import {
  NftEffectType,
  NFT_EFFECT_BLUR,
  NFT_EFFECT_PROTECT,
  NFT_EFFECT_SECRET,
  NFT_FILE_TYPE_IMAGE,
  NFT_FILE_TYPE_VIDEO,
} from 'interfaces';
import Chip from 'components/ui/Chip';
import Slider from 'components/ui/Slider';
import { breakpointMap } from 'style/theme/base';

interface Props {
  blurValue: number;
  coverNFT: File | null;
  className?: string;
  effect: NftEffectType;
  isRN?: boolean;
  secretNFT: File;
  setBlurValue: (v: number) => void;
  setCoverNFT: (f: File | null) => void;
  setEffect: (effect: NftEffectType) => void;
  setError: (err: string) => void;
}

const DefaultEffect = css`
  width: 100%;
  height: 100%;
  border-radius: 1.2rem;
  background: linear-gradient(180deg, #f29fff 0%, #878cff 100%);
  box-shadow: 0px 0px 14.5243px 5.0835px rgba(0, 0, 0, 0.15);
  object-fit: cover;
  overflow: hidden;
  position: absolute;
  transform: translateZ(0);
`;
const SImage = styled.img<{ blurredValue: number }>`
  ${DefaultEffect}
  filter: ${({ blurredValue }) => `blur(${blurredValue}px)`};
  backdrop-filter: ${({ blurredValue }) => `blur(${blurredValue}px)`};
  -webkit-backdrop-filter: ${({ blurredValue }) => `blur(${blurredValue}px)`};
`;
const SVideo = styled.video`
  ${DefaultEffect}
`;

function returnType(NFTarg: File, blurredValue: number = 0) {
  if (NFTarg!.type.substr(0, 5) === NFT_FILE_TYPE_IMAGE) {
    return (
      <SImage
        alt="img"
        blurredValue={blurredValue}
        id="output"
        src={URL.createObjectURL(NFTarg)}
      />
    );
  } else if (NFTarg!.type.substr(0, 5) === NFT_FILE_TYPE_VIDEO) {
    return (
      <SVideo
        autoPlay
        muted
        playsInline
        loop
        key={NFTarg.name + NFTarg.lastModified}
      >
        <source id="outputVideo" src={URL.createObjectURL(NFTarg)} />
      </SVideo>
    );
  }
}

const NftCardWithEffects = ({
  blurValue,
  className,
  coverNFT,
  effect,
  isRN,
  secretNFT,
  setBlurValue,
  setCoverNFT,
  setEffect,
  setError,
}: Props) => {

  const isTablet = useMediaQuery({
    minWidth: breakpointMap.md,
    maxWidth: breakpointMap.lg - 1,
  });

  const handleBlurredChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const newBlur = Number(target.value);
    setEffect(NFT_EFFECT_BLUR);
    setBlurValue(newBlur);
  };

  const handleSecretFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateFile(
      event,
      setError,
      (file: File) => {
        setCoverNFT(file);
        setEffect(NFT_EFFECT_SECRET);
      },
      isRN
    );
  };

  return (
    <SWrapper className={className}>
      {returnType(secretNFT, effect === NFT_EFFECT_BLUR ? blurValue : 0)}
      {effect === NFT_EFFECT_BLUR && (
        <SSlider
          id="blurredSlider"
          max={15}
          min={1}
          onChange={handleBlurredChange}
          step={1}
          value={blurValue}
        />
      )}
      {effect === NFT_EFFECT_PROTECT && <SIcon name="whiteWaterMark" />}
      {effect === NFT_EFFECT_SECRET && (
        <SSecretWrapper>
          {coverNFT === null ? (
            <NftUpload
              content={
                <SecretUploadDescription>
                  <SecretUploadTopDescription>
                    Drag your the preview of your secret.
                  </SecretUploadTopDescription>
                  {!isTablet && <span>
                    Once purchased, the owner will be able to see your NFT
                  </span>}
                </SecretUploadDescription>
              }
              inputId="uploadSecretNft"
              isRN={isRN}
              isSecretOption
              note={`PNG, GIF, WEBP, MP4 or MP3. Max 30mb.`}
              onChange={handleSecretFileUpload}
            />
          ) : (
            <SCoverWrapper>
              <NftUpload
                content={returnType(coverNFT)}
                inputId="reUploadSecretNft"
                isMinimal
                isRN={isRN}
                isSecretOption
                onChange={handleSecretFileUpload}
              />
            </SCoverWrapper>
          )}
          {!isTablet && <SChip
            color="whiteBlur"
            icon="whiteWaterMark"
            size="medium"
            text="Secret"
            variant="round"
          />}
        </SSecretWrapper>
      )}
    </SWrapper>
  );
};
const SWrapper = styled.div`
  position: relative;
  width: 100%;
  border-radius: 1.2rem;
  max-width: 250px;
  height: ${({ theme }) => theme.sizes.cardHeight.md};
  overflow: hidden;

  ${({ theme }) => theme.mediaQueries.md} {
    height: ${({ theme }) => theme.sizes.cardHeight.sm};
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    height: ${({ theme }) => theme.sizes.cardHeight.md};
  }
`;

const SCoverWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 320px;

  ${({ theme }) => theme.mediaQueries.md} {
    height: 290px;
  }
`;

const SSlider = styled(Slider)`
  width: 100%;
  position: absolute;
  bottom: 4.8rem;
  padding: 0 1.6rem;
  z-index: 10;
`;

const SIcon = styled(Icon)`
  width: 10rem;
  position: absolute;
  bottom: 1.6rem;
  left: 1.6rem;
  z-index: 10;

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 14rem;
  }
`;

const SSecretWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3.2rem 3.2rem 0;

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 2rem 2rem 0;
  }

  @media (min-width: 830px) {
    padding: 2.4rem 2.4rem 0;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    padding: 3.2rem 3.2rem 0;
  }
`;

const SecretUploadDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SecretUploadTopDescription = styled.span`
  color: #7417ea;
  font-family: ${({ theme }) => theme.fonts.bold};
  margin-bottom: 0.8rem;
`;

const SChip = styled(Chip)`
  width: fit-content;
  margin: 2.4rem auto 0;
`;

export default React.memo(NftCardWithEffects);
