import React, { useContext } from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import { Context } from '../../../utils/store/store';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const Overlay = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 2000;
  left: 0;
  top: 0;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.9);
  overflow-x: hidden;
`;

const OverlayContent = styled.div`
  position: relative;
  top: 45%;
  width: 100%;
  text-align: center;
  color:white;
`;

const LoadingSpinner: React.FC = () => {
  const { state } = useContext(Context);
  return (
    <>
      {state.isLoading &&
      <Overlay>
        <OverlayContent>
          <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
        </OverlayContent>
      </Overlay>}
    </>
  );
};

export default LoadingSpinner;