import React, { useState } from "react";
import AlphaBanner from "components/base/AlphaBanner";
import MainHeader from "components/base/MainHeader";
import Landing from "components/pages/Landing";
import ModalWallets from "components/base/ModalWallets";

const LandingPage = () => {
  const [modalExpand, setModalExpand] = useState(false);
  return (
    <>
      {modalExpand && <ModalWallets setModalExpand={setModalExpand} />}
      <AlphaBanner />
      <MainHeader setModalExpand={setModalExpand} />
      <Landing />
    </>
  );
};

export default LandingPage;
