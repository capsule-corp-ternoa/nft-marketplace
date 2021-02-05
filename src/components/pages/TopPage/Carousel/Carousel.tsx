import React from 'react';
import MultiCarousel  from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import NftCard from '../../../common/NftCard/NftCard';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 8,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

type CarouselType = {
  nftList: NftListMockupType[];
};

const Carousel: React.FC<CarouselType> = (props) => (
  <MultiCarousel responsive={responsive}>
    {props.nftList?.map((nft, index) => (
      <NftCard key={nft.id} nft={nft} />
    ))}
  </MultiCarousel>
);

export default Carousel;