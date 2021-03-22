import React, { useState } from 'react';
import AlphaBanner from 'components/base/AlphaBanner';
import MainHeader from 'components/base/MainHeader';
import Landing from 'components/pages/Landing';
import TernoaWallet from 'components/base/TernoaWallet';

const LandingPage = () => {
  const [modalExpand, setModalExpand] = useState(false);
  return (
    <>
      {modalExpand && <TernoaWallet setModalExpand={setModalExpand} />}
      <AlphaBanner />
      <MainHeader setModalExpand={setModalExpand} />
      <Landing setModalExpand={setModalExpand} />
    </>
  );
};

export default LandingPage;
