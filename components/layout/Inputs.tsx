import styled, { css } from 'styled-components'

export const HiddenShell = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: none;
`

export const HiddenInput = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  opacity: 0;
  filter: alpha(opacity=0);
  -ms-filter: 'alpha(opacity=0)';
  -khtml-opacity: 0;
  -moz-opacity: 0;
  cursor: pointer;
`

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 4rem;

  ${({ theme }) => theme.mediaQueries.md} {
    align-items: normal;
    flex-direction: row;
    margin-top: 9.6rem;
  }
`

const FormSideLayout = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;

  > * {
    margin-top: 4rem;

    ${({ theme }) => theme.mediaQueries.md} {
      margin-top: 6.4rem;
    }

    &:first-child {
      margin-top: 0;
    }
  }
`

export const FormSideLeft = styled(FormSideLayout)`
  ${({ theme }) => theme.mediaQueries.md} {
    border-right: ${({ theme }) => `1px solid ${theme.colors.neutral600}`};
    padding-right: 4.8rem;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    padding-right: 13.6rem;
  }
`

export const FormSideRight = styled(FormSideLayout)`
  margin-top: 4rem;

  ${({ theme }) => theme.mediaQueries.md} {
    padding-left: 4.8rem;
    margin-top: 0;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    padding-left: 13.6rem;
  }
`

export const InputShell = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
`

export const InputLabel = styled.h4`
  display: flex;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 2rem;
  line-height: 1.3;
  margin: 0;
`

const InputStyle = css<{
  isError?: boolean
}>`
  width: 100%;
  background: ${({ theme }) => theme.colors.neutral100};
  border: 0.2rem solid;
  border-color: ${({ isError, theme }) => (isError ? theme.colors.danger500 : theme.colors.contrast)};
  border-radius: 0.8rem;
  font-size: 1.6rem;
  margin-top: 1.6rem;
  outline: none;
  padding: 1.6rem;

  &:focus {
    border: 0.2rem solid;
    border-color: ${({ isError, theme }) => (isError ? theme.colors.danger500 : theme.colors.primary500)};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral300};
  }
`

export const Label = styled.label<{ endIcon?: string; startIcon?: string }>`
  position: relative;
  display: flex;

  ${({ startIcon }) =>
    startIcon &&
    `
      &:before {
        content: '';
        position: absolute;
        left: 1.6rem;
        top: 0;
        bottom: 0;
        width: 3.2rem;
        background: url("${startIcon}")
          center / contain no-repeat;
      }
    `};

  ${({ endIcon }) =>
    endIcon &&
    `
      &:after {
        content: '';
        position: absolute;
        right: 1.6rem;
        top: 0;
        bottom: 0;
        width: 3.2rem;
        background: url("${endIcon}")
          center / contain no-repeat;
      }
    `};
`

export const Input = styled.input<{ isError?: boolean }>`
  ${InputStyle}
`

export const Textarea = styled.textarea`
  flex: 1;
  resize: none;

  ${InputStyle}
`
