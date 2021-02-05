import React from 'react';
import styled, { css } from 'styled-components';
import colors from '../ui-library/styles/colors';

const NftImageStyled = styled.img<{full?: boolean}>`
  border: solid 1px rgba(0, 0, 0, 0.2);
  border-radius:50px;
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.15);
  ${({ full }) =>
    full &&
  css`
  width: 70% !important;
  `
}
`;

export type NftImageProps = React.ImgHTMLAttributes<HTMLElement> & {
  full?: boolean;
};

const NftImage: React.FC<NftImageProps> = (props) => (
  <NftImageStyled {...props} />
);

// Set default props
NftImage.defaultProps = {
  full: false,
};

export default NftImage;