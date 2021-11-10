import React from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import { HiddenInput, HiddenShell } from 'components/base/Layout';
import { NftEffectType } from 'interfaces';
import { breakpointMap } from 'ui/theme/base';
import NftCardWithEffects from '../NftCard/NftCardWithEffects';

interface Props {
  effect: NftEffectType;
  isSelected?: boolean;
  NFT: File;
  secretNFT: File | null;
  setError: (s: string) => void;
  setSecretNFT: (f: File | null) => void;
  setEffect: (s: NftEffectType) => void;
}

const NftPreviewCard = ({
  effect,
  isSelected = false,
  NFT,
  secretNFT,
  setError,
  setSecretNFT,
  setEffect,
}: Props) => {
  const isMobile = useMediaQuery({
    query: `(max-device-width: ${breakpointMap.md}px)`,
  });

  if (isMobile) {
    return (
      <CardWrapper>
        <NftCardWithEffects
          effect={effect}
          NFT={NFT}
          secretNFT={secretNFT}
          setError={setError}
          setSecretNFT={setSecretNFT}
          setEffect={setEffect}
        />
      </CardWrapper>
    );
  }

  return (
    <>
      <NftPreviewCardWrapper
        htmlFor={`NftType_${effect}`}
        isSelected={isSelected}
      >
        <SNftCardWithEffects
          effect={effect}
          isSelected={isSelected}
          NFT={NFT}
          secretNFT={secretNFT}
          setError={setError}
          setSecretNFT={setSecretNFT}
          setEffect={setEffect}
        />
        <NftTypeRadio>
          <input type="radio" checked={isSelected} readOnly />
          <NftTypeRadioLabel>{effect}</NftTypeRadioLabel>
        </NftTypeRadio>
      </NftPreviewCardWrapper>

      <HiddenShell>
        <HiddenInput
          type="radio"
          id={`NftType_${effect}`}
          name={`NftType_${effect}`}
          onClick={() => setEffect(effect)}
          value={effect}
        />
      </HiddenShell>
    </>
  );
};

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  filter: drop-shadow(0px 0px 10.4276px rgba(0, 0, 0, 0.25));
`;

const NftPreviewCardWrapper = styled.label<{ isSelected?: boolean }>`
  background: transparent;
  border: 3px solid rgb(0, 0, 0, 0);
  border-radius: 2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  flex: 1;
  flex-direction: column;
  padding: 0.8rem 0.8rem 2.4rem;

  &:hover {
    border: 3px dashed #7417ea;
  }

  ${({ isSelected }) =>
    isSelected &&
    `
    border: 3px dashed #7417ea;
  `}
`;

const SNftCardWithEffects = styled(NftCardWithEffects)<{ isSelected: boolean }>`
  opacity: ${({ isSelected }) => (isSelected ? 1 : 0.4)};
`;

const NftTypeRadio = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2.4rem;
`;

const NftTypeRadioLabel = styled.span`
  font-family: 'Airbnb Cereal App Bold';
  font-size: 1.6rem;
  line-height: 1.2;
  margin-left: 0.8rem;
  text-transform: capitalize;
`;

export default NftPreviewCard;
