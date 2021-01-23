import { css } from 'styled-components';
import colors from './colors';

const componentBase = css`
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  color: ${colors.darkGray};
  font-family: 'Source Sans Pro', YuGothic, 'Yu Gothic', Meiryo, 'メイリオ',
    'Hiragino Kaku Gothic ProN W3', 'ヒラギノ角ゴ ProN W3', sans-serif;
  font-size: 16px;
  font-style: normal;
  line-height: 1.15;
  text-rendering: optimizeLegibility;
  text-transform: none;
  transition: all 0.25s ease;
  &::before,
  &::after {
    transition: all 0.25s ease;
    box-sizing: border-box;
  }
`;

export default componentBase;
