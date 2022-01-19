import React, { useState } from 'react';
import styled from 'styled-components';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { breakpointMap } from 'style/theme/base';

import { NftCardWithHover, CAROUSEL_MODE } from 'components/base/NftCard';
import Button from 'components/ui/Button';

import { NftType, UserType } from 'interfaces/index';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: breakpointMap.xl },
    items: 4.6,
  },
  tablet: {
    breakpoint: { max: breakpointMap.xl - 1, min: breakpointMap.lg },
    items: 4.2,
  },
};

export interface ShowcaseProps {
  NFTs: NftType[];
  category: string;
  user?: UserType;
}

const Showcase: React.FC<ShowcaseProps> = ({ NFTs, category, user }) => {
  const [isDragging, setIsDragging] = useState(false);

  let carousel: Carousel | null = new Carousel({
    responsive: {},
    children: <></>,
  });

  return (
    <SShowcaseContainer>
      <STopContainer>
        <STitle>{category}</STitle>
        <SNavContainer>
          <Button
            color="neutral500"
            icon="arrowLeft"
            onClick={() => {
              carousel?.previous(1);
            }}
            size="small"
            variant="contained"
          />
          <Button
            color="neutral500"
            icon="arrowRight"
            onClick={() => {
              carousel?.next(1);
            }}
            size="small"
            variant="contained"
          />
        </SNavContainer>
      </STopContainer>
      <SNftsContainer
        onMouseDown={() => setIsDragging(false)}
        onMouseMove={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(false)}
        onTouchMove={() => setIsDragging(true)}
      >
        <SNftsMobileContainer>
          {NFTs.map((item) => (
            <NftCardWithHover key={item.id} isDragging={isDragging} item={item} mode={CAROUSEL_MODE} user={user} />
          ))}
        </SNftsMobileContainer>
        <SNftsCarouselContainer
          ref={(el) => {
            carousel = el;
          }}
          responsive={responsive}
          infinite
          ssr={false}
          arrows={false}
          swipeable={true}
        >
          {NFTs.map((item) => (
            <NftCardWithHover key={item.id} isDragging={isDragging} item={item} mode={CAROUSEL_MODE} user={user} />
          ))}
        </SNftsCarouselContainer>
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

const SNavContainer = styled.div`
  display: none;

  > * {
    &:not(:first-child) {
      margin-left: 0.8rem;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    display: flex;
  }
`;

const SNftsContainer = styled.div`
  width: 100%;
  display: flex;
  overflow-x: auto;
  justify-content: flex-start;
  margin-top: 2.4rem;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: inline;
  }
`;

const SNftsMobileContainer = styled.div`
  display: flex;
  gap: 3.2rem;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: none;
  }
`;

const SNftsCarouselContainer = styled(Carousel)`
  ${({ theme }) => theme.mediaQueries.lg} {
    display: flex;
    overflow-y: visible;
  }
`;

export default Showcase;
