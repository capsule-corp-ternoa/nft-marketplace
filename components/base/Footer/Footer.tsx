import React from 'react';
import  styled from 'styled-components';

import Icon from 'components/ui/Icon';

import style from './Footer.module.scss';

const Footer = () => {
  const telegramLink = process.env.NEXT_PUBLIC_TELEGRAM_LINK ? process.env.NEXT_PUBLIC_TELEGRAM_LINK : "https://t.me/ternoa"
  const twitterLink = process.env.NEXT_PUBLIC_TWITTER_LINK ? process.env.NEXT_PUBLIC_TWITTER_LINK : "https://twitter.com/SecretNFT_"
  const linkedinLink = process.env.NEXT_PUBLIC_LINKEDIN_LINK ? process.env.NEXT_PUBLIC_LINKEDIN_LINK : "https://www.linkedin.com/company/50607388/"
  const instagramLink = process.env.NEXT_PUBLIC_INSTAGRAM_LINK ? process.env.NEXT_PUBLIC_INSTAGRAM_LINK : "https://www.instagram.com/ternoa_/"
  const githubLink = process.env.NEXT_PUBLIC_GITHUB_LINK ? process.env.NEXT_PUBLIC_GITHUB_LINK : "https://github.com/capsule-corp-ternoa"
  const youtubeLink = process.env.NEXT_PUBLIC_YOUTUBE_LINK ? process.env.NEXT_PUBLIC_YOUTUBE_LINK : "https://www.youtube.com/channel/UCUYvbtRE5HoWPz7z88V7Khw"
  return (
    <div className={style.Footer}>
      <SIcon name="waterMark" />
      <div className={style.Container}>
        <div className={style.SocialMedias}>
          {telegramLink!=="false" && <a href={telegramLink} target="_blank">
            <SMediaIcon name="socialTelegram" />
          </a>}
          {twitterLink!=="false" && <a href={twitterLink} target="_blank">
            <SMediaIcon name="socialTwitter" />
          </a>}
          {linkedinLink!=="false" && <a href={linkedinLink} target="_blank">
            <SMediaIcon name="socialLinkedIn" />
          </a>}
          {instagramLink!=="false" && <a href={instagramLink} target="_blank">
            <SMediaIcon name="socialInstagram" />
          </a>}
          {githubLink!=="false" && <a href={githubLink} target="_blank">
            <SMediaIcon name="socialGithub" />
          </a>}
          {youtubeLink!=="false" && <a href={youtubeLink} target="_blank">
            <SMediaIcon name="socialYoutube" />
          </a>}
        </div>
      </div>
      <div className={style.FooterBar}>
        <div className={style.Legals}>
          <div className={style.Link}>{process.env.NEXT_PUBLIC_APP_NAME || "SecretNFT"}</div>
          <div className={style.Link}>All rights reserved</div>
          <a
            href="https://ternoahelp.zendesk.com/hc/fr/articles/4409410791185-Terms-of-use"
            className={style.Link}
            target="_blank"
						rel="noreferrer noopener"
          >
            Terms
          </a>
          <a
            href="https://ternoahelp.zendesk.com/hc/fr/articles/4409410776337-Privacy-Policy"
            className={style.Link}
            target="_blank"
						rel="noreferrer noopener"
          >
            Privacy
          </a>
        </div>
        {/* <div className={style.Languages}></div> */}
      </div>
    </div>
  );
};

const SIcon = styled(Icon)`
  width: 16rem;
  position: absolute;
  left: 25%;
  top: 2rem;
  z-index: 1;

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 11.2rem;
  }
`;

const SMediaIcon = styled(Icon)`
  width: 1.6rem;
  cursor: pointer;
  fill: white;
  z-index: 10;

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 2.4rem;
  }
`;

export default Footer;
