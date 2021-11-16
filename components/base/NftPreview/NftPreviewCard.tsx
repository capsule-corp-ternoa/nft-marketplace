import React from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import { HiddenInput, HiddenShell } from 'components/layout';
import { useCreateNftContext } from 'components/pages/Create/CreateNftContext';
import { NftEffectType, NFT_EFFECT_BLUR, NFT_EFFECT_PROTECT } from 'interfaces';
import Radio from 'components/ui/Radio';
import { breakpointMap } from 'style/theme/base';
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
      <SMobileWrapper>
        <NftCardWithEffects effect={effect} />
      </SMobileWrapper>
    );
  }

  return (
    <>
      <SLabel htmlFor={`NftType_${effect}`} isSelected={isSelected}>
        <SWrapper isSelected={isSelected}>
          <NftCardWithEffects effect={effect} />
        </SWrapper>

        <SRadio
          checked={isSelected}
          label={effect}
          onChange={handleCardSelect}
        />
      </SLabel>

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

const SMobileWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  filter: drop-shadow(0px 0px 10.4276px rgba(0, 0, 0, 0.25));
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

const SWrapper = styled.div<{ isSelected: boolean }>`
  width: 100%;
  height: auto;
  opacity: ${({ isSelected }) => (isSelected ? 1 : 0.4)};
`;

const SRadio = styled(Radio)`
  margin-top: 3.2rem;
`;

export default NftPreviewCard;
