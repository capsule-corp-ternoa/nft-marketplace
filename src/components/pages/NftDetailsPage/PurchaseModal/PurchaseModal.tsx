import React from 'react';
import styled from 'styled-components';
import { FaRegTimesCircle } from 'react-icons/fa';
import Modal from '../../../common/ui-library/Modal/Modal';
import Row from '../../../common/ui-library/Row/Row';
import Col from '../../../common/ui-library/Col/Col';
import { H2, P } from '../../../common/Title/Title';
import { WalletIcon } from '../../../common/Icons/Icons';

const MainBox = styled.div`
  width: 800px;
  height: 424px;
  margin:0 auto;
  background: linear-gradient(180deg, #1E34A9 0%, #131062 100%);
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
`;

const CloseButton = styled.p`
  text-align:right;
  padding: 20px;
  font-size:30px;
`;

type PurchaseModalType= {
  closeModal: () => void;
};
const PurchaseModal: React.FC<PurchaseModalType> = (props) => (
  <>
    <Modal>
      <MainBox>
        <CloseButton>
          <FaRegTimesCircle onClick={props.closeModal} />
          <Row>
            {/* Left part of the modal */}
            <Col style={{ textAlign: 'left' }}>
              <WalletIcon size={52} />
              <H2 style={{ color: 'white' }}>Checkout</H2>
              <P style={{ color: 'white' }}>You are about to purchase :<br />
                Ternoa Stamp #004 - from Waves89
              </P>
            </Col>
            {/* Right side of the Modal */}
            <Col>2</Col>
          </Row>
        </CloseButton>
      </MainBox>
    </Modal>
  </>
);

export default PurchaseModal;