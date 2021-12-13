import { css, keyframes } from 'styled-components';

const scaleIn = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.08);
  }
`;

const scaleOut = keyframes`
  0% {
    transform: scale(1.08);
  }
  100% {
    transform: scale(1);
  }
`;

const hoverAnimation = css<{ isHovering?: boolean }>`
  ${({ isHovering }) =>
    isHovering
      ? `${scaleIn} 0.8s cubic-bezier(0.25, 1, 0.5, 1)`
      : `${scaleOut} 0.8s cubic-bezier(0.25, 1, 0.5, 1)`}
`;

export const MediaStyle = css<{ isHovering?: boolean }>`
  object-fit: cover;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 1.2rem;

  ${({ isHovering }) =>
    isHovering !== undefined &&
    `animation-fill-mode: forwards;
      animation: ${hoverAnimation};`}
`;
