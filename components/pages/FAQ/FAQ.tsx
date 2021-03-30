import React from 'react';

import style from './FAQ.module.scss';
import Footer from 'components/base/Footer';
import FloatingHeader from 'components/base/FloatingHeader';
import Section from './Section';

const FAQ: React.FC<any> = ({ user, setModalExpand, setNotAvailable }) => {
  const sec = [
    {
      question: 'What is SecretNFT Marketplace ?',
      answer:
        'Description jdiezaoje jdeizaopeijd eizoapiejd iopaziejd jiezopaiejd deizpaoiejh dheapzoeihde uzoapeuhfeuzoap. Description jdiezaoje jdeizaopeijd eizoapiejd iopaziejd jiezopaiejd deizpaoiejh dheapzoeihde uzoapeuhfeuzoap. Description jdiezaoje jdeizaopeijd eizoapiejd...',
    },
    {
      question: 'How to submit your NFT as an artist?',
      answer: 'Description jdiezaoje jdeizaopeijd eizoapiejd...',
    },
    {
      question: 'What do i use for payment when buying on SecretNFT ?',
      answer:
        'Description jdiezaoje jdeizaopeijd eizoapiejd... Description jdiezaoje jdeizaopeijd eizoapiejd iopaziejd jiezopaiejd deizpaoiejh',
    },
    {
      question: 'What is CAPS and why do i need some ?',
      answer:
        'Description jdiezaoje jdeizaopeijd eizoapiejd... Description jdiezaoje jdeizaopeijd eizoapiejd... Description jdiezaoje Description jdiezaoje jdeizaopeijd eizoapiejd... Description jdiezaoje Description jdiezaoje jdeizaopeijd eizoapiejd... Description jdiezaoje',
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
      <FloatingHeader setModalExpand={setModalExpand} user={user} />
      <Footer setNotAvailable={setNotAvailable} />
    </div>
  );
};

export default FAQ;
