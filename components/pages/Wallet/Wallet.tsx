import React from 'react';
//import { useTranslation } from 'react-i18next';
import style from './Wallet.module.scss';
import Footer from 'components/base/Footer';
import FloatingHeader from 'components/base/FloatingHeader';

import CopyPaste from 'components/assets/copypaste';
import WalletSVG from 'components/assets/wallet';
import Badge from 'components/assets/badge';

import { middleEllipsis } from 'utils/strings';

const Wallet: React.FC<any> = ({ user, setModalExpand, setNotAvailable }) => {
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
            <img className={style.AvatarIMG} src={user.img} />
            {user.verified && <Badge className={style.Badge} />}
          </div>
        </div>

        <h1 className={style.Name}>{user.name}</h1>
        <div
          className={style.Address}
          onClick={() => {
            navigator.clipboard.writeText(user.walletId);
          }}
        >
          {middleEllipsis(user.walletId, 20)}
          <CopyPaste className={style.CopyPaste} />
        </div>

        <div className={style.Separator} />
        <div className={style.Caps}>{user.caps} CAPS</div>
        <div className={style.Button} onClick={() => setNotAvailable(true)}>
          Buy CAPS
        </div>
      </div>
      <Footer setNotAvailable={setNotAvailable} />
      <FloatingHeader user={user} setModalExpand={setModalExpand} />
    </div>
  );
};

export default Wallet;
