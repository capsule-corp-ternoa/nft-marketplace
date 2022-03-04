import React from 'react'
import styled from 'styled-components'
import dynamic from 'next/dynamic'

export type IconNameType =
  | 'arrowBottom'
  | 'arrowLeft'
  | 'arrowRight'
  | 'badge'
  | 'bell'
  | 'blaze'
  | 'check'
  | 'checkMark'
  | 'close'
  | 'copyPaste'
  | 'edit'
  | 'error404'
  | 'error500'
  | 'eye'
  | 'faqArrow'
  | 'filters'
  | 'fingerMark'
  | 'fortmatic'
  | 'heart'
  | 'information'
  | 'key'
  | 'languageFrance'
  | 'languageJapan'
  | 'languageUK'
  | 'logoTernoaBlack'
  | 'logoTernoaWhite'
  | 'metamask'
  | 'noNFTImage'
  | 'powerOff'
  | 'scale'
  | 'search'
  | 'secretCards'
  | 'share'
  | 'socialDiscord'
  | 'socialInstagram'
  | 'socialTwitter'
  | 'soundOff'
  | 'soundOn'
  | 'successImage'
  | 'ternoaArt'
  | 'upload'
  | 'wallet'
  | 'walletConnect'
  | 'walletLink'
  | 'waterMark'
  | 'whiteWaterMark'

interface Props {
  className?: string
  name: IconNameType
}

const Icon = ({ className, name }: Props) => {
  switch (name) {
    case 'arrowBottom': {
      const ArrowBottom = dynamic(() => import('components/assets/arrowBottom'))
      return <ArrowBottom className={className} />
    }
    case 'arrowLeft': {
      const ArrowLeft = dynamic(() => import('components/assets/arrowLeft'))
      return <ArrowLeft className={className} />
    }
    case 'arrowRight': {
      const ArrowRight = dynamic(() => import('components/assets/arrowRight'))
      return <ArrowRight className={className} />
    }
    case 'badge': {
      const Badge = dynamic(() => import('components/assets/badge'))
      return <Badge className={className} />
    }
    case 'bell': {
      const Bell = dynamic(() => import('components/assets/Bell'))
      return <Bell className={className} />
    }
    case 'blaze': {
      const Blaze = dynamic(() => import('components/assets/blaze'))
      return <Blaze className={className} />
    }
    case 'check': {
      const Check = dynamic(() => import('components/assets/check'))
      return <Check className={className} />
    }
    case 'checkMark': {
      const CheckMark = dynamic(() => import('components/assets/checkmark'))
      return <CheckMark className={className} />
    }
    case 'close': {
      const Close = dynamic(() => import('components/assets/close'))
      return <Close className={className} />
    }
    case 'copyPaste': {
      const CopyPaste = dynamic(() => import('components/assets/copypaste'))
      return <CopyPaste className={className} />
    }
    case 'edit': {
      const Edit = dynamic(() => import('components/assets/edit'))
      return <Edit className={className} />
    }
    case 'error404': {
      const Error404 = dynamic(() => import('components/assets/Error404'))
      return <Error404 className={className} />
    }
    case 'error500': {
      const Error500 = dynamic(() => import('components/assets/Error500'))
      return <Error500 className={className} />
    }
    case 'eye': {
      const Eye = dynamic(() => import('components/assets/eye'))
      return <Eye className={className} />
    }
    case 'faqArrow': {
      const FaqArrow = dynamic(() => import('components/assets/faqarrow'))
      return <FaqArrow className={className} />
    }
    case 'filters': {
      const Filters = dynamic(() => import('components/assets/Filters'))
      return <Filters className={className} />
    }
    case 'fingerMark': {
      const FingerMark = dynamic(() => import('components/assets/FingerMark'))
      return <FingerMark className={className} />
    }
    case 'fortmatic': {
      const Fortmatic = dynamic(() => import('components/assets/wallets/fortmatic'))
      return <Fortmatic className={className} />
    }
    case 'heart': {
      const Heart = dynamic(() => import('components/assets/heart'))
      return <Heart className={className} />
    }
    case 'information': {
      const Information = dynamic(() => import('components/assets/information'))
      return <Information className={className} />
    }
    case 'key': {
      const Key = dynamic(() => import('components/assets/key'))
      return <Key className={className} />
    }
    case 'languageFrance': {
      const France = dynamic(() => import('components/assets/Languages/France'))
      return <France className={className} />
    }
    case 'languageJapan': {
      const Japan = dynamic(() => import('components/assets/Languages/Japan'))
      return <Japan className={className} />
    }
    case 'languageUK': {
      const UK = dynamic(() => import('components/assets/Languages/UK'))
      return <UK className={className} />
    }
    case 'logoTernoaBlack': {
      const LogoTernoaBlack = dynamic(() => import('components/assets/LogoTernoaBlack'))
      return <LogoTernoaBlack className={className} />
    }
    case 'logoTernoaWhite': {
      const LogoTernoaWhite = dynamic(() => import('components/assets/LogoTernoaWhite'))
      return <LogoTernoaWhite className={className} />
    }
    case 'metamask': {
      const Metamask = dynamic(() => import('components/assets/wallets/metamask'))
      return <Metamask className={className} />
    }
    case 'noNFTImage': {
      const SPlaceholderWrapper = styled.div`
        min-height: 22rem;
      `
      const NoNFTImage = dynamic(() => import('components/assets/NoNFTImage'), {
        loading: () => <SPlaceholderWrapper />,
      })
      return <NoNFTImage className={className} />
    }
    case 'powerOff': {
      const PowerOff = dynamic(() => import('components/assets/poweroff'))
      return <PowerOff className={className} />
    }
    case 'scale': {
      const Scale = dynamic(() => import('components/assets/scale'))
      return <Scale className={className} />
    }
    case 'search': {
      const Search = dynamic(() => import('components/assets/Search'))
      return <Search className={className} />
    }
    case 'secretCards': {
      const SecretCards = dynamic(() => import('components/assets/SecretCards'))
      return <SecretCards className={className} />
    }
    case 'share': {
      const Share = dynamic(() => import('components/assets/share'))
      return <Share className={className} />
    }
    case 'socialDiscord': {
      const Discord = dynamic(() => import('components/assets/SocialMedias/Discord'))
      return <Discord className={className} />
    }
    case 'socialInstagram': {
      const Instagram = dynamic(() => import('components/assets/SocialMedias/Instagram'))
      return <Instagram className={className} />
    }
    case 'socialTwitter': {
      const Twitter = dynamic(() => import('components/assets/SocialMedias/Twitter'))
      return <Twitter className={className} />
    }
    case 'soundOff': {
      const SoundOff = dynamic(() => import('components/assets/SoundOff'))
      return <SoundOff className={className} />
    }
    case 'soundOn': {
      const SoundOn = dynamic(() => import('components/assets/SoundOn'))
      return <SoundOn className={className} />
    }
    case 'successImage': {
      const SuccessImage = dynamic(() => import('components/assets/SuccessImage'))
      return <SuccessImage className={className} />
    }
    case 'ternoaArt': {
      const TernoaArt = dynamic(() => import('components/assets/ternoart'))
      return <TernoaArt className={className} />
    }
    case 'upload': {
      const Upload = dynamic(() => import('components/assets/upload'))
      return <Upload className={className} />
    }
    case 'wallet': {
      const Wallet = dynamic(() => import('components/assets/wallet'))
      return <Wallet className={className} />
    }
    case 'walletConnect': {
      const WalletConnect = dynamic(() => import('components/assets/wallets/walletconnect'))
      return <WalletConnect className={className} />
    }
    case 'walletLink': {
      const WalletLink = dynamic(() => import('components/assets/wallets/walletlink'))
      return <WalletLink className={className} />
    }
    case 'waterMark': {
      const WaterMark = dynamic(() => import('components/assets/Watermark'))
      return <WaterMark className={className} />
    }
    case 'whiteWaterMark': {
      const WhiteWaterMark = dynamic(() => import('components/assets/WhiteWaterMark'))
      return <WhiteWaterMark className={className} />
    }
    default:
      return null
  }
}

export default React.memo(Icon)
