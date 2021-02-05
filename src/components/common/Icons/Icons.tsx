/* eslint-disable max-len */
import React from 'react';
import { FaShareAlt, FaRegHeart, FaEye, FaWallet } from 'react-icons/fa';

type IconType= {
  size?: number;
};

export const EyeIcon: React.FC<IconType> = (props) => <FaEye {...props} />;

export const ShareIcon: React.FC<IconType> = (props) => <FaShareAlt />;

export const HeartIcon: React.FC<IconType> = (props) => <FaRegHeart />;

export const WalletIcon: React.FC<IconType> = (props) => <FaWallet {...props} />;
