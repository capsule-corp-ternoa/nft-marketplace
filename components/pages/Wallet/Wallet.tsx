import React from 'react';
//import { useTranslation } from 'react-i18next';
import style from './Wallet.module.scss';
import Footer from 'components/base/Footer';
import FloatingHeader from 'components/base/FloatingHeader';

import CopyPaste from 'components/assets/copypaste';
import WalletSVG from 'components/assets/wallet';
import Badge from 'components/assets/badge';

const Wallet: React.FC<any> = ({ item, setModalExpand }) => {
  //const { t } = useTranslation();

  return (
    <div className={style.Container}>
      <div className={style.Head}>
        <WalletSVG className={style.WalletSVG} />
        <h2 className={style.Title}>My wallet</h2>
      </div>
      <div className={style.Wallet}>
        <div className={style.AvatarShell}>
          <div className={style.Avatar}>
            <img className={style.AvatarIMG} src={item.img} />
            {item.verified && <Badge className={style.Badge} />}
          </div>
        </div>

        <h1 className={style.Name}>{item.name}</h1>
        <div
          className={style.Address}
          onClick={() => {
            navigator.clipboard.writeText(item.address);
          }}
        >
          {item.address} <CopyPaste className={style.CopyPaste} />
        </div>

        <div className={style.Separator} />
        <div className={style.Caps}>{item.caps} Caps</div>
        <div className={style.Button}>Buy Caps</div>
      </div>
      <Footer />
      <FloatingHeader setModalExpand={setModalExpand} />
    </div>
  );
};

export default Wallet;
