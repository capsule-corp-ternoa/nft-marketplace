import React, { useState } from 'react';
import { useDrag } from '@use-gesture/react';
import styled from 'styled-components';

import NftCard from 'components/base/NftCard';

import { NftType } from 'interfaces/index';
import { timer } from 'utils/functions';

const DRAGGING_OFFSET = 40;

export interface ShowcaseProps {
  NFTs: NftType[];
  category: string;
}

const Showcase: React.FC<ShowcaseProps> = ({ NFTs, category }) => {
  const [isDragging, setIsDragging] = useState(false);

  const bind = useDrag(async ({ movement: [x] }) => {
    if (Math.abs(x) > DRAGGING_OFFSET) {
      setIsDragging(true);
      await timer(500);
      setIsDragging(false);
    }
  },
  {
    preventScroll: true,
    preventDefault: true,
    filterTaps: true
  });

  return (
    <SShowcaseContainer>
      <STopContainer>
        <STitle>{category}</STitle>
      </STopContainer>
      <SNftsContainer {...bind()}>
        {NFTs.map((item) => (
          <SNftCard key={item.id} notClickeable={isDragging} item={item} />
        ))}
      </SNftsContainer>
    </SShowcaseContainer>
  );
};

const SShowcaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const STopContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const STitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 2.4rem;
  margin: 0;

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 3.2rem;
  }
`;

const SNftsContainer = styled.div`
  width: 100%;
  display: flex;
  overflow-x: auto;
  justify-content: flex-start;
  margin-top: 2.4rem;
  gap: 3.2rem;

  ${({ theme }) => theme.mediaQueries.xxl} {
    gap: 3.4rem;
    overflow-x: visible;
  }
`;

const SNftCard = styled(NftCard)`
  flex-shrink: 0;
  height: ${({ theme }) => theme.sizes.cardHeight.sm};
  width: ${({ theme }) => theme.sizes.cardWidth.sm};
`;

export default Showcase;
