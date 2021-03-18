import React, { useState } from 'react';
import AlphaBanner from 'components/base/AlphaBanner';
import MainHeader from 'components/base/MainHeader';
import ModalWallets from 'components/base/ModalWallets';
import PublicProfile from 'components/pages/PublicProfile';
import NFTSET4 from 'utils/mocks/NFTSET4';

const PublicProfilePage = () => {
  const [modalExpand, setModalExpand] = useState(false);

  const item: any = {
    name: 'Takeshi Kovacs',
    caps: 78029,
    img:
      'https://images.unsplash.com/photo-1497551060073-4c5ab6435f12?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1267&q=80',
    verified: true,
    id: 9,
    twitter: 'rayanreynolds',
    description: 'Famous artist living in LA.',
    address: '0x31R15fd5...4e3E75bf',
    views: 1234,
    followers: 40,
    following: 21,
    walletId: 1325,
  };

  return (
    <>
      {modalExpand && <ModalWallets setModalExpand={setModalExpand} />}
      <AlphaBanner />
      <MainHeader item={item} setModalExpand={setModalExpand} />
      <PublicProfile item={item} NFTS={NFTSET4} />
    </>
  );
};

export default PublicProfilePage;
