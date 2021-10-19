import React from 'react';

import style from './FAQ.module.scss';
import Footer from 'components/base/Footer';
import FloatingHeader from 'components/base/FloatingHeader';
import Section from './Section';

import { UserType } from 'interfaces/index';

export interface FAQProps {
  user: UserType;
  setModalExpand: (b: boolean) => void;
  setNotAvailable: (b: boolean) => void;
}

const FAQ: React.FC<FAQProps> = ({ user, setModalExpand, setNotAvailable }) => {
  const sec = [
    {
      question: `What is ${process.env.NEXT_PUBLIC_APP_NAME ? process.env.NEXT_PUBLIC_APP_NAME : "SecretNFT"} Marketplace ?`,
      answer:
        `“${process.env.NEXT_PUBLIC_APP_NAME ? process.env.NEXT_PUBLIC_APP_NAME : "SecretNFT"}” is a NFTs marketplace for digital creators. Discover Tokenized Digital Art. Artists issue authenticated single edition digital artworks. These are certified on the Ternoa blockchain to prevent forgery. Each artwork is authentically created by an artist in the network, and tokenized as a collectible digital item that you can own, display and trade.`,
    },
    {
      question: 'How to submit your NFT as an artist?',
      answer:
        `In alpha version, you fill our form here. Soon you will be able to upload your creations on “${process.env.NEXT_PUBLIC_APP_NAME ? process.env.NEXT_PUBLIC_APP_NAME : "SecretNFT"}”.`,
    },
    {
      question: `What do I use for payment when buying on ${process.env.NEXT_PUBLIC_APP_NAME ? process.env.NEXT_PUBLIC_APP_NAME : "SecretNFT"} ?`,
      answer:
        `“${process.env.NEXT_PUBLIC_APP_NAME ? process.env.NEXT_PUBLIC_APP_NAME : "SecretNFT"}” is on Ternoa Chain, so all the platform use CAPS for transactions.`,
    },
    {
      question: 'What is CAPS and why do i need some ?',
      answer:
        'CAPS is the Ternoa token. You can see more about the CAPS here. You need some CAPS to buy or sell creations.',
    },
    {
      question: 'What are “test CAPS”?',
      answer:
        '“Test CAPS” are CAPS usable on our testnet. Real CAPS will come on mainnet.',
    },
  ];
  function returnSections() {
    return sec.map((x, index) => {
      return <Section key={index} section={x} />;
    });
  }
  return (
    <div className={style.Container}>
      <div className={style.Wrapper}>
        <h1 className={style.Title}>How it works ?</h1>
        <span className={style.FAQ}>FAQ</span>
        <div className={style.Inner}>{returnSections()}</div>
      </div>
      <FloatingHeader user={user} setModalExpand={setModalExpand} />
      <Footer setNotAvailable={setNotAvailable} />
    </div>
  );
};

export default FAQ;
