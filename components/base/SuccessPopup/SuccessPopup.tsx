import React from 'react';
import style from './SuccessPopup.module.scss';
import Close from 'components/assets/close';

export interface SuccessPopupProps {
  setSuccessPopup: (b: boolean) => void;
  
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({ setSuccessPopup }) => (
  <div id="ternoaWallet" className={style.Background}>
    <div className={style.Container}>
      <Close onClick={() => setSuccessPopup(false)} className={style.Close} />
      <div className={style.Title}>Review requested</div>
      <div className={style.Text}>
        Your profile is under review. After review it will be certified.
      </div>
      <div onClick={() => setSuccessPopup(false)} className={style.Button}>
        Continue
      </div>
    </div>
  </div>
);

export default SuccessPopup;
