import React from 'react';
import ClickAwayListener from 'react-click-away-listener';
import styled from 'styled-components';

import Icon from '../Icon';

export interface ModalProps {
  children?: React.ReactNode;
  setExpanded: (b: boolean) => void;
  subtitle?: string;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ children, setExpanded, subtitle, title }) => (
  <SModalBackground>
    <ClickAwayListener
      onClickAway={() => {
        setExpanded(false);
      }}
    >
      <SModalContainer>
        <SIconContainer onClick={() => setExpanded(false)}>
          <Icon name="close" />
        </SIconContainer>
        {title && <STitle>{title}</STitle>}
        {subtitle && <SSubtitle>{subtitle}</SSubtitle>}
        {children && <SBody>{children}</SBody>}
      </SModalContainer>
    </ClickAwayListener>
  </SModalBackground>
);

const SModalBackground = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 110;
`;

const SModalContainer = styled.div`
  width: 340px;
  border-radius: 2.4rem;
  background-color: ${({ theme }) => theme.colors.contrast};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3.2rem 2.4rem;
  position: relative;

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 48rem;
    padding: 5.6rem 4rem;
  }
`;

const SIconContainer = styled.div`
  display: flex;
  position: absolute;
  z-index: 130;
  fill: ${({ theme }) => theme.colors.invertedContrast};
  top: 2.4rem;
  right: 2.4rem;
  width: 2rem;
  cursor: pointer;
`;

const STitle = styled.h3`
  color: ${({ theme }) => theme.colors.invertedContrast};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 2.4rem;
  margin: 0;
  text-align: center;
`;

const SSubtitle = styled.div`
  color: ${({ theme }) => theme.colors.invertedContrast};
  font-family: ${({ theme }) => theme.fonts.light};
  font-size: 1.6rem;
  margin-top: 0.8rem;
`;

const SBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.8rem;
`;

export default Modal;
