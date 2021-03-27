import React, { useState } from 'react';
import Head from 'next/head';
import AlphaBanner from 'components/base/AlphaBanner';
import MainHeader from 'components/base/MainHeader';
import TernoaWallet from 'components/base/TernoaWallet';
import NFTSET4 from 'utils/mocks/NFTSET4';
import Creators from 'utils/mocks/mockCreators';
import NotAvailableModal from 'components/base/NotAvailable';
import FAQ from 'components/pages/FAQ';

const FAQPage: React.FC<any> = ({ data }) => {
  const [modalExpand, setModalExpand] = useState(false);
  const [notAvailable, setNotAvailable] = useState(false);

  console.log(data);

  const item: any = {
    name: 'Takeshi Kovacs',
    caps: 78029,
    img:
      'https://images.unsplash.com/photo-1497551060073-4c5ab6435f12?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1267&q=80',
    verified: true,
    id: 9,
    twitter: 'elonmusk',
    description: 'Famous artist living in LA.',
    address: '0x31R15fd5...4e3E75bf',
    views: 1234,
    followers: 40,
    following: 21,
    walletId: 1325,
  };

  return (
    <>
      <Head>
        <title>SecretNFT - FAQ</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="FAQ page of SecretNFT, by Ternoa." />
      </Head>
      {modalExpand && <TernoaWallet setModalExpand={setModalExpand} />}
      {notAvailable && <NotAvailableModal setNotAvailable={setNotAvailable} />}
      <AlphaBanner />
      <MainHeader item={item} setModalExpand={setModalExpand} />
      <FAQ
        item={item}
        NFTS={NFTSET4}
        creators={Creators}
        setModalExpand={setModalExpand}
        setNotAvailable={setNotAvailable}
      />
    </>
  );
};

export default FAQPage;

export async function getServerSideProps() {
  const res = await fetch(
    'https://ternoa-marketplace-nft.herokuapp.com/api/NFTs?page=1&limit=10'
  );

  const data = await res.json();

  return {
    props: { data }, // will be passed to the page component as props
  };
}
