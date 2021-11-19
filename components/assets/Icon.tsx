import React from 'react';
import dynamic from 'next/dynamic';

export type IconNameType = 'secretCards' | 'whiteWaterMark';

interface Props {
  className?: string;
  name: IconNameType;
}

const Icon = ({ className, name }: Props) => {
  switch (name) {
    case 'secretCards': {
      const SecretCards = dynamic(() => import('components/assets/SecretCards'))
      return <SecretCards className={className} />;
    }
    case 'whiteWaterMark': {
      const WhiteWaterMark = dynamic(() => import('components/assets/WhiteWaterMark'))
      return <WhiteWaterMark className={className} />;
    }
    default:
      return null;
  }
};

export default Icon;
