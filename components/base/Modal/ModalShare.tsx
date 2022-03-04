import React from 'react'
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
  WhatsappIcon,
} from 'react-share'
import styled from 'styled-components'

import Clipboard from 'components/base/Clipboard'
import Modal from 'components/ui/Modal'

export interface ModalWalletProps {
  setExpanded: (b: boolean) => void
  subtitle?: string
  subject: string
  text: string
  title?: string
  url: string
}

const ModalShare: React.FC<ModalWalletProps> = ({ setExpanded, subtitle, title, subject, text, url }) => (
  <Modal setExpanded={setExpanded} subtitle={subtitle} title={title}>
    <>
      <SSocialsContainer>
        <FacebookShareButton url={url} quote={text}>
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>
        <LinkedinShareButton url={url} title={subject} summary={text}>
          <LinkedinIcon size={40} round={true} />
        </LinkedinShareButton>
        <RedditShareButton url={url} title={text}>
          <RedditIcon size={40} round={true} />
        </RedditShareButton>
        <TelegramShareButton url={url} title={text}>
          <TelegramIcon size={40} round={true} />
        </TelegramShareButton>
        <TwitterShareButton url={url} title={text}>
          <TwitterIcon size={40} round={true} />
        </TwitterShareButton>
        <WhatsappShareButton url={url} title={text} separator={'\n'}>
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>
      </SSocialsContainer>
      <SClipboard address={url} />
    </>
  </Modal>
)

const SSocialsContainer = styled.div`
  display: flex;

  > * {
    &:not(:first-child) {
      margin-left: 0.8rem;
    }
  }
`

const SClipboard = styled(Clipboard)`
  border: solid 1px rgb(0, 0, 0, 0);
  border-radius: 0.8rem;
  color: ${({ theme }) => theme.colors.invertedContrast};
  margin-top: 1.6rem;
  padding: 0.8rem 1.6rem;

  ${({ theme }) => theme.mediaQueries.lg} {
    &:hover {
      color: ${({ theme }) => theme.colors.invertedContrast};
      border-color: ${({ theme }) => theme.colors.invertedContrast};
    }
  }
`

export default ModalShare
