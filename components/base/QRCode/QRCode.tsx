/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import style from './QRCode.module.scss';
import QRCode from 'qrcode.react';

const Code: React.FC<any> = ({ data, action }) => {
  return (
    <QRCode
      value={JSON.stringify({ action, data })}
      includeMargin={false}
      renderAs={'svg'}
      size={200}
      className={style.QRCode}
    />
  );
};

export default Code;
