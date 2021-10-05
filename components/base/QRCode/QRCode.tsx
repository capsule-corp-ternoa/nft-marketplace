/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import style from './QRCode.module.scss';
import QRCode from 'qrcode.react';

interface CodeProps {
  data: {
    session: string;
    socketUrl: string;
    links?: string[];
    nft_id?: string;
    fileHash?: string;
    price?: number;
    walletId?: string;
    quantity?: number;
  };
  action: string;
}

const Code: React.FC<CodeProps> = ({ data, action }) => {
  return (
    <QRCode
      value={JSON.stringify({ action, data })}
      includeMargin={false}
      renderAs={'svg'}
      size={(data && data.links && data.links.length > 5) || action==="UPDATE_PROFILE" ? 400 : 200}
      className={style.QRCode}
    />
  );
};

export default Code;
