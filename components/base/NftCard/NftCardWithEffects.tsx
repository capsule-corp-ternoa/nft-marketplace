import React from 'react';
import styled, { css } from 'styled-components';
import WhiteWaterMark from 'components/assets/WhiteWaterMark';
import NftUpload from 'components/base/NftUpload';
import {
  NftEffectType,
  NFT_EFFECT_BLUR,
  NFT_EFFECT_PROTECT,
  NFT_EFFECT_SECRET,
} from 'interfaces';
import Chip from 'ui/components/Chip';

interface Props {
  className?: string;
  effect: NftEffectType;
  NFT: File;
  secretNFT: File | null;
  setError: (s: string) => void;
  setSecretNFT: (f: File | null) => void;
  setEffect: (s: NftEffectType) => void;
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
const IMGDefaultEffect = styled.img`
  ${DefaultEffect}
`;
const VideoDefaultEffect = styled.video`
  ${DefaultEffect}
`;

function returnType(NFTarg: File) {
  if (NFTarg!.type.substr(0, 5) === 'image') {
    return (
      <IMGDefaultEffect
        alt="img"
        id="output"
        src={URL.createObjectURL(NFTarg)}
      />
    );
  } else if (NFTarg!.type.substr(0, 5) === 'video') {
    return (
      <VideoDefaultEffect
        autoPlay
        muted
        playsInline
        loop
        key={NFTarg.name + NFTarg.lastModified}
      >
        <source id="outputVideo" src={URL.createObjectURL(NFTarg)} />
      </VideoDefaultEffect>
    );
  }
}

const NftCardWithEffects = ({
  className,
  effect,
  NFT,
  secretNFT,
  setError,
  setSecretNFT,
  setEffect,
}: Props) => (
  <MediaWrapper className={className}>
    {returnType(NFT)}
    {effect === NFT_EFFECT_BLUR && <Blur />}
    {effect === NFT_EFFECT_PROTECT && (
      <WaterMark>
        <WaterMarkWrapper>
          <WhiteWaterMarkIcon />
        </WaterMarkWrapper>
      </WaterMark>
    )}
    {effect === NFT_EFFECT_SECRET && (
      <SecretWrapper>
        {secretNFT === null ? (
          <SecretUpload
            content={
              <SecretUploadDescription>
                <SecretUploadTopDescription>
                  Drag your the preview of your secret.
                </SecretUploadTopDescription>
                <span>
                  Once purchased, the owner will be able to see your NFT
                </span>
              </SecretUploadDescription>
            }
            inputId="uploadSecretNft"
            //isRN={isRN}
            isSecretOption
            note={`PNG, GIF, WEBP, MP4 or MP3. Max 30mb.`}
            setError={setError}
            setNFT={setSecretNFT}
            setEffect={setEffect}
          />
        ) : (
          <SecretMediaWrapper
            content={returnType(secretNFT)}
            inputId="reUploadSecretNft"
            isMinimal
            isSecretOption
            setError={setError}
            setNFT={setSecretNFT}
            setEffect={setEffect}
          />
        )}
        <SecretChip
          color="transparent"
          icon={<SecretChipIcon />}
          text="Secret"
        />
      </SecretWrapper>
    )}
  </MediaWrapper>
);
const MediaWrapper = styled.div`
  position: relative;
  width: 250px;
  height: 430px;
`;

const SecretMediaWrapper = styled(NftUpload)`
  position: relative;
  width: 100%;
  height: 320px;

  ${({ theme }) => theme.mediaQueries.md} {
    height: 290px;
  }
`;

const Blur = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 1.2rem;
`;

const WaterMark = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 1.2rem;
`;

const WaterMarkWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 1.2rem;
`;

const WhiteWaterMarkIcon = styled(WhiteWaterMark)`
  width: 10rem;
  position: absolute;
  bottom: 1.6rem;
  left: 1.6rem;
  z-index: 10;

  ${({ theme }) => theme.mediaQueries.md} {
    width: 14rem;
  }
`;

const SecretWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem 3.2rem 0;

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 4.8rem 4rem 0;
  }
`;

const SecretUpload = styled(NftUpload)`
  width: auto;
  height: auto;
  border: none;
`;

const SecretUploadDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SecretUploadTopDescription = styled.span`
  color: #7417ea;
  font-family: 'Airbnb Cereal App Bold';
  margin-bottom: 0.8rem;
`;

const SecretChip = styled(Chip)`
  width: fit-content;
  margin: 2.4rem auto 0;
`;

const SecretChipIcon = styled(WhiteWaterMark)`
  width: 1.6rem;
  height: 1.6rem;
`;

export default React.memo(NftCardWithEffects);
