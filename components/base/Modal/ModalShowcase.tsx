import React from 'react';
import styled from 'styled-components';

import Media from 'components/base/Media';
import Modal, { MODAL_SHOWCASE_VARIANT } from 'components/ui/Modal';

export interface ModalShowcaseProps {
  media: string;
  type: string | null;
  setExpanded: (b: boolean) => void;
}

const ModalShowcase: React.FC<ModalShowcaseProps> = ({ media, setExpanded, type }) => (
  <Modal setExpanded={setExpanded} variant={MODAL_SHOWCASE_VARIANT}>
    <SMediaContainer>
      <Media src={media} type={type} alt="imgnft" draggable="false" />
    </SMediaContainer>
  </Modal>
);

const SMediaContainer = styled.div`
  display: flex;
  position: relative;
  width: 48rem;
  height: 72rem;
  overflow: hidden;
  background: linear-gradient(180deg, #f29fff 0%, #878cff 100%);
  box-shadow: 0px 0px 14.5243px 5.0835px rgba(0, 0, 0, 0.15);
  border-radius: 1.2rem;
`;

export default ModalShowcase;
