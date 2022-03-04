import React from 'react'
import styled from 'styled-components'

import Media from 'components/base/Media'
import Modal, { MODAL_SHOWCASE_VARIANT } from 'components/ui/Modal'

export interface ModalShowcaseProps {
  media: string
  type: string | null
  setExpanded: (b: boolean) => void
}

const ModalShowcase: React.FC<ModalShowcaseProps> = ({ media, setExpanded, type }) => (
  <Modal setExpanded={setExpanded} variant={MODAL_SHOWCASE_VARIANT}>
    <SMediaContainer>
      <Media src={media} type={type} />
    </SMediaContainer>
  </Modal>
)

const SMediaContainer = styled.div`
  display: flex;
  position: relative;
  width: ${({ theme }) => theme.sizes.cardWidth.md};
  height: ${({ theme }) => theme.sizes.cardHeight.md};
  overflow: hidden;
  background: linear-gradient(180deg, #f29fff 0%, #878cff 100%);
  box-shadow: ${({ theme }) => theme.shadows.popupShadow};
  border-radius: 1.2rem;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: ${({ theme }) => theme.sizes.cardWidth.lg};
    height: ${({ theme }) => theme.sizes.cardHeight.lg};
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    width: ${({ theme }) => theme.sizes.cardWidth.xl};
    height: ${({ theme }) => theme.sizes.cardHeight.xl};
  }
`

export default ModalShowcase
