import { createGlobalStyle } from 'styled-components'
import { TernoaTheme } from 'style/theme'

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends TernoaTheme {}
}

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: inherit;
    font-family: ${({ theme }) => theme.fonts.regular};
    line-height: 1.3;
  }

  html {
    box-sizing: border-box;
    font-size: 62.5%;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    height: 100vh;
    margin: 0;

    -webkit-font-smoothing :antialiased;
  }

  #__next {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    background: transparent;
    border: none;
    margin: 0;
  }

  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background: ${({ theme }) => theme.colors.primary500};

    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;
    transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
    border-radius: 6px;
    width: 100%;
    height: 5px;
  }

  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    box-shadow: ${({ theme }) => `0 0 10px ${theme.colors.primary500}, 0 0 5px ${theme.colors.primary500}`};
    opacity: 1;

    -webkit-transform: rotate(3deg) translate(0px, -4px);
    -ms-transform: rotate(3deg) translate(0px, -4px);
    transform: rotate(3deg) translate(0px, -4px);
  }
`

export default GlobalStyle
