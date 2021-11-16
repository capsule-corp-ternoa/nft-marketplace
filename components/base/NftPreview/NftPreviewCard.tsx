import React from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import { HiddenInput, HiddenShell } from 'components/base/Layout';
import { useCreateNftContext } from 'components/pages/Create/CreateNftContext';
import { NftEffectType, NFT_EFFECT_BLUR, NFT_EFFECT_PROTECT } from 'interfaces';
import Radio from 'ui/components/Radio';
import { breakpointMap } from 'ui/theme/base';
import { processFile } from 'utils/imageProcessing/image';
import NftCardWithEffects from '../NftCard/NftCardWithEffects';

interface Props {
  effect: NftEffectType;
  isSelected?: boolean;
}

const NftPreviewCard = ({ effect, isSelected = false }: Props) => {
  const { createNftData, setEffect, setError, setNFT } = useCreateNftContext();
  const { blurredValue, secretNFT } = createNftData;

  const isMobile = useMediaQuery({
    query: `(max-device-width: ${breakpointMap.md}px)`,
  });

  const handleCardSelect = () => {
    setEffect(effect);
    if (
      secretNFT &&
      (effect === NFT_EFFECT_BLUR || effect === NFT_EFFECT_PROTECT)
    ) {
      processFile(secretNFT, effect, setError, blurredValue).then(setNFT);
    }
  };

  if (isMobile) {
    return (
      <CardWrapper>
        <NftCardWithEffects effect={effect} />
      </CardWrapper>
    );
  }

  return (
    <>
      <NftPreviewCardWrapper
        htmlFor={`NftType_${effect}`}
        isSelected={isSelected}
      >
        <SNftCardWithEffects effect={effect} isSelected={isSelected} />
        <SRadio
          checked={isSelected}
          label={effect}
          onClick={handleCardSelect}
        />
      </NftPreviewCardWrapper>

      <HiddenShell>
        <HiddenInput
          type="radio"
          id={`NftType_${effect}`}
          name={`NftType_${effect}`}
          onClick={handleCardSelect}
          value={effect}
        />
      </HiddenShell>
    </>
  );
};

const CardWrapper = styled.div`
  width: 100%;
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

const SNftCardWithEffects = styled(NftCardWithEffects)<{ isSelected: boolean }>`
  opacity: ${({ isSelected }) => (isSelected ? 1 : 0.4)};
`;

const SRadio = styled(Radio)`
  margin-top: 3.2rem;
`;

export default NftPreviewCard;
