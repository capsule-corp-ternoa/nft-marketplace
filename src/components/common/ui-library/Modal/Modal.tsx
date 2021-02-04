import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;

const OverlayContent = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) !important;
  color:white;
`;

const MyComponent: React.FC = (props) => (
  <>
    <Overlay>
      <OverlayContent>
        {props.children}
      </OverlayContent>
    </Overlay>
  </>
);

export default MyComponent;