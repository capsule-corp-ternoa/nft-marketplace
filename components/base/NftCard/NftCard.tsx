import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Router from 'next/router';

import { NftType } from 'interfaces/index';

import style from './NftCard.module.scss';
import Media from '../Media';

export type ModeType = 'carousel' | 'grid';

export interface NftCardProps {
  children?: React.ReactNode;
  className?: string;
  item: NftType;
  mode?: ModeType;
  isDragging?: boolean;
  isHovering?: boolean;
  onMouseOver?: React.MouseEventHandler<HTMLDivElement> | undefined;
  onMouseOut?: React.MouseEventHandler<HTMLDivElement> | undefined;
}

const NftCard: React.FC<NftCardProps> = ({
  children,
  className,
  item,
  mode,
  isDragging,
  isHovering,
  onMouseOut,
  onMouseOver,
}) => {
  const [type, setType] = useState<string | null>(null);

  useEffect(() => {
    async function callBack() {
      try {
        let res = await fetch(item.properties?.preview.ipfs!, {
          method: 'HEAD',
        });
        setType(res.headers.get('Content-Type'));
        return res;
      } catch (err) {
        console.log('Error :', err);
      }
    }

    callBack();
  }, []);

  return (
    <SMediaWrapper
      onClick={() => !isDragging && Router.push(`/nft/${item.id}`)}
      className={className}
      mode={mode}
      onFocus={() => false}
      onBlur={() => false}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      <Media
        src={item.properties?.preview.ipfs!}
        type={type}
        alt="imgnft"
        draggable="false"
        className={`${style.NFTIMG} ${
          type?.substr(0, 5) === 'image' && isHovering ? style.ImgScaling : ''
        }`}
      />
      {children}
    </SMediaWrapper>
  );
};

const SMediaWrapper = styled.div<{ mode?: ModeType }>`
  display: flex;
  position: relative;
  box-sizing: border-box;
  border-radius: 12px;
  background: linear-gradient(180deg, #f29fff 0%, #878cff 100%);
  box-shadow: 0px 0px 14.5243px 5.0835px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  overflow: hidden;
  transform: translateZ(0);

  ${({ mode, theme }) => {
    switch (mode) {
      case 'carousel': {
        return `
          height: ${theme.sizes.cardHeight.sm};
          width: ${theme.sizes.cardWidth.sm};

          ${theme.mediaQueries.xxl} {
            height: ${theme.sizes.cardHeight.md};
            width: ${theme.sizes.cardWidth.md};
          }
        `;
      }
      case 'grid': {
        return `
          height: ${theme.sizes.cardHeight.md};
          width: ${theme.sizes.cardWidth.md};

          ${theme.mediaQueries.sm} {
            height: ${theme.sizes.cardHeight.sm};
            width: ${theme.sizes.cardWidth.sm};
          }

          ${theme.mediaQueries.xxl} {
            height: ${theme.sizes.cardHeight.md};
            width: ${theme.sizes.cardWidth.md};
          }
        `;
      }
      default: {
        return `
          height: ${theme.sizes.cardHeight.xs};
          width: ${theme.sizes.cardWidth.xs};

          ${theme.mediaQueries.md} {
            height: ${theme.sizes.cardHeight.sm};
            width: ${theme.sizes.cardWidth.sm};
          }

          ${theme.mediaQueries.xxl} {
            height: ${theme.sizes.cardHeight.md};
            width: ${theme.sizes.cardWidth.md};
          }
        `;
      }
    }
  }}
`;

export default NftCard;
