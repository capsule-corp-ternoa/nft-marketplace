import React from 'react';
import style from './Wallet.module.scss';
import Footer from 'components/base/Footer';
import FloatingHeader from 'components/base/FloatingHeader';
import gradient from 'random-gradient';
import WalletSVG from 'components/assets/wallet';
import Badge from 'components/assets/badge';
import Clipboard from 'components/base/Clipboard';

import { computeCaps, computeTiime } from 'utils/strings';
import { UserType } from 'interfaces';
import styled from 'styled-components';

export interface WalletProps {
  setModalExpand: (b: boolean) => void;
  user: UserType;
}

const Wallet = ({
  user,
  setModalExpand,
}: WalletProps) => {
  const bgGradient = {
    background:  gradient(user?.name || 'ternoa'),
  };
  return (
    <div className={style.Container}>
      <div className={style.Head}>
        <WalletSVG className={style.WalletSVG} />
        <h2 className={style.Title}>My wallet</h2>
      </div>
      <div className={style.Wallet}>
        <div className={style.AvatarShell}>
          <div className={style.Avatar}>
            {user.picture ? (
              <img
                className={style.AvatarIMG}
                draggable="false"
                src={user.picture}
              />
            ) : (
              <div style={bgGradient} className={style.AvatarIMG}>
                <div className={style.AvatarLetter}>
                  {user.name.charAt(0)}
                </div>
              </div>
            )}
            {user.verified && <Badge className={style.Badge} />}
          </div>
        </div>

        <h1 className={style.Name}>{user.name}</h1>
        <SClipboard address={user.walletId} isEllipsis />

        <div className={style.Separator} />
        <div className={style.Caps}>
          {user.capsAmount ? computeCaps(Number(user.capsAmount)) : 0} CAPS
        </div>
        <div className={style.Tiime} style={{display: "none"}}>
          {user.tiimeAmount ? computeTiime(Number(user.tiimeAmount)) : 0} TIIME
        </div>
        <a className={style.Button} href="https://www.ternoa.com/" target="_blank">
          Buy CAPS
        </a>
      </div>
      <Footer />
      <FloatingHeader user={user} setModalExpand={setModalExpand} />
    </div>
  );
};

const SClipboard = styled(Clipboard)`
  color: ${({ theme }) => theme.colors.neutral400};
  flex-wrap: wrap;
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 1.6rem;
`;

export default Wallet;
