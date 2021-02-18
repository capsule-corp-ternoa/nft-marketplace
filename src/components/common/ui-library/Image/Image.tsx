import React from 'react';
import styled from 'styled-components';

interface ImageInt extends React.ImgHTMLAttributes<HTMLImageElement>  {
  responsive?: boolean;
}

const ImageStyled = styled.img<ImageInt>`
  ${({ responsive }) =>
    responsive &&
    `
    width: 100%; 
    border-radius: 50%;
  `}
  height: auto;
`;

const Image: React.FC<ImageInt> = (props) => (
  <>
    <ImageStyled {...props} />
  </>
);

export default Image;