import React from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import { HiddenInput, HiddenShell } from 'components/base/Layout';
import { NftEffectType } from 'interfaces';
import { breakpointMap } from 'ui/theme/base';
import NftCardWithEffects from '../NftCard/NftCardWithEffects';

interface Props {
  isSelected?: boolean;
  NFT: File;
  secretNFT: File | null;
  setError: (s: string) => void;
  setModalCreate: (b: boolean) => void;
  setSecretNFT: (f: File | null) => void;
  setEffect: (s: NftEffectType) => void;
  type: NftEffectType;
}

const NftPreviewCard = ({
  isSelected = false,
  NFT,
  secretNFT,
  setError,
  setModalCreate,
  setSecretNFT,
  setEffect,
  type,
}: Props) => {
  const isMobile = useMediaQuery({
    query: `(max-device-width: ${breakpointMap.md}px)`,
  });

  if (isMobile) {
    return (
      <CardWrapper>
        <NftCardWithEffects
          NFT={NFT}
          secretNFT={secretNFT}
          setError={setError}
          setModalCreate={setModalCreate}
          setSecretNFT={setSecretNFT}
          setEffect={setEffect}
          type={type}
        />
      </CardWrapper>
    );
  }

  return (
    <>
      <NftPreviewCardWrapper
        htmlFor={`NftType_${type}`}
        isSelected={isSelected}
      >
        <SNftCardWithEffects
          isSelected={isSelected}
          NFT={NFT}
          secretNFT={secretNFT}
          setError={setError}
          setModalCreate={setModalCreate}
          setSecretNFT={setSecretNFT}
          setEffect={setEffect}
          type={type}
        />
        <NftTypeRadio>
          <input type="radio" checked={isSelected} readOnly />
          <NftTypeRadioLabel>{type}</NftTypeRadioLabel>
        </NftTypeRadio>
      </NftPreviewCardWrapper>

      <HiddenShell>
        <HiddenInput
          type="radio"
          id={`NftType_${type}`}
          name={`NftType_${type}`}
          onClick={() => setEffect(type)}
          value={type}
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
