/* eslint-disable max-len */
import React from 'react';
import { 
  FaShareAlt,
  FaRegHeart, 
  FaEye, 
  FaWallet, 
  FaDiscord, 
  FaTelegramPlane, 
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
  FaTwitch,
  FaYoutube,
} from 'react-icons/fa';

type IconType= {
  size?: number;
};

export const EyeIcon: React.FC<IconType> = (props) => <FaEye {...props} />;
export const ShareIcon: React.FC<IconType> = (props) => <FaShareAlt {...props} />;
export const HeartIcon: React.FC<IconType> = (props) => <FaRegHeart {...props} />;
export const WalletIcon: React.FC<IconType> = (props) => <FaWallet {...props} />;
export const DiscordIcon: React.FC<IconType> = (props) => <FaDiscord {...props} />;
export const TwitterIcon: React.FC<IconType> = (props) => <FaTwitter {...props} />;
export const LinkedinIcon: React.FC<IconType> = (props) => <FaLinkedinIn {...props} />;
export const TelegramIcon: React.FC<IconType> = (props) => <FaTelegramPlane {...props} />;
export const InstagramIcon: React.FC<IconType> = (props) => <FaInstagram {...props} />;
export const GithubIcon: React.FC<IconType> = (props) => <FaGithub {...props} />;
export const TwitchIcon: React.FC<IconType> = (props) => <FaTwitch {...props} />;
export const YoutubeIcon: React.FC<IconType> = (props) => <FaYoutube {...props} />;


