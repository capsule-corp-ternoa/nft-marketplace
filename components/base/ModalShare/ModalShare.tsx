import React from 'react';

import style from './ModalShare.module.scss';
import Close from 'components/assets/close';
import CopyPaste from 'components/assets/copypaste';
import { 
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  LinkedinIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon
} from 'react-share';

export interface ModalWalletProps {
  setModalExpand: (b: boolean) => void;
  title: string;
  subject: string;
  text: string;
  url: string;
}


const ModalShare: React.FC<ModalWalletProps> = ({ setModalExpand, title, subject, text, url }) => (
  <div id="modalWallet" className={style.Background}>
    <div className={style.Container}>
      <Close onClick={() => setModalExpand(false)} className={style.Close} />
      <div className={style.Title}>Share</div>
      <div className={style.Subtitle}>
        {title}
      </div>
      <div className={style.SocialButtons}>
        {/*<EmailShareButton
          url={url}
          subject={subject}
          body={text}
          separator={'\n'}
        >
          <EmailIcon size={40} round={true}/>
        </EmailShareButton>*/}
        <FacebookShareButton
          url={url}
          quote={text}
        >
          <FacebookIcon size={40} round={true}/>
        </FacebookShareButton>
        <LinkedinShareButton
          url={url}
          title={subject}
          summary={text}
        >
          <LinkedinIcon size={40} round={true}/>
        </LinkedinShareButton>
        <RedditShareButton
          url={url}
          title={text}
        >
          <RedditIcon size={40} round={true}/>
        </RedditShareButton>
        <TelegramShareButton
          url={url}
          title={text}
        >
          <TelegramIcon size={40} round={true}/>
        </TelegramShareButton>
        <TwitterShareButton
          url={url}
          title={text}
        >
          <TwitterIcon size={40} round={true}/>
        </TwitterShareButton>
        <WhatsappShareButton
          className={style.socialButton}
          url={url}
          title={text}
          separator={'\n'}
        >
          <WhatsappIcon size={40} round={true}/>
        </WhatsappShareButton>
      </div>
      <div className={style.UrlCopyContainer} onClick={() => {
        navigator.clipboard.writeText(url);
      }}>
        <div className={style.Url}>{url}</div>
        <div className={style.CopyPaste}>
          <CopyPaste className={style.CopyPasteSvg}/>
        </div>
      </div>
    </div>
  </div>
);

export default ModalShare;
