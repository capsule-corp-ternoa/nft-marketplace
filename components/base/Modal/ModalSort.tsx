import React from 'react';
import ClickAwayListener from 'react-click-away-listener';
import styled from 'styled-components';

import Icon from 'components/ui/Icon';

interface ModalSortProps {
  children: React.ReactNode;
  setIsExpanded: (b: boolean) => void;
  title: string;
}

const ModalSort = ({ children, setIsExpanded, title }: ModalSortProps) => (
  <SModalBackground>
    <ClickAwayListener
      onClickAway={() => {
        setIsExpanded(false);
      }}
    >
      <SModalContainer>
        <SCloseIcon onClick={() => setIsExpanded(false)}>
          <Icon name="close" />
        </SCloseIcon>
        <STitle>{title}</STitle>

        <SSortContainer>{children}</SSortContainer>
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
  overflow-y: hidden;
`;

const SCloseIcon = styled.div`
  display: flex;
  position: absolute;
  z-index: 130;
  fill: ${({ theme }) => theme.colors.contrast};
  top: 3.2rem;
  right: 2.4rem;
  width: 2rem;
  height: 2rem;
  cursor: pointer;

  ${({ theme }) => theme.mediaQueries.lg} {
    top: 4.8rem;
    right: 4rem;
  }
`;

const SModalContainer = styled.div`
  width: 340px;
  border-radius: 2.4rem;
  background-color: ${({ theme }) => theme.colors.invertedContrast};
  display: flex;
  flex-direction: column;
  padding: 2.4rem;
  max-height: 50rem;
  position: relative;

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 56rem;
    padding: 4rem 4rem;
  }
`;

const STitle = styled.h3`
  color: ${({ theme }) => theme.colors.contrast};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 3.2rem;
  margin: 0;
`;

const SSortContainer = styled.div`
  margin-top: 3.2rem;
`

export default ModalSort;
