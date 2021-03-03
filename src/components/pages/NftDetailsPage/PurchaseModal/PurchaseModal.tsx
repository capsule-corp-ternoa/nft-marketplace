import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FaRegTimesCircle } from 'react-icons/fa';
import Modal from '../../../common/ui-library/Modal/Modal';
import Row from '../../../common/ui-library/Row/Row';
import Col from '../../../common/ui-library/Col/Col';
import Button from '../../../common/ui-library/Button/Button';
import { H2, P, GradientText } from '../../../common/Title/Title';
import colors from '../../../common/ui-library/styles/colors';
import { ReactComponent as WalletLogo } from '../../../common/assets/wallet.svg';

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
  cursor:pointer;
`;

const PaymentButtonStyled = styled(Button)`
  background: ${colors.rose_gradient};
  box-shadow: 0px 3px 4px rgba(30, 52, 169, 0.29);
  border-radius: 1000px;
  border: 0px;
  color: ${colors.white};
`;

const ButtonsArea = styled.div`
margin-top:30px;
& button {
  margin:10px 0;
}
`;

const CheckoutTitle = styled(H2)`

font-weight: bold;
font-size: 40px;
margin: 30px 10px 20px 10px;
`;

type PurchaseModalType= {
  closeModal: () => void;
  nft: NftObjectType;
};
const PurchaseModal: React.FC<PurchaseModalType> = (props) => {

  const { t } = useTranslation();

  return (
    <>
      <Modal>
        <MainBox>
          <CloseButton>
            <FaRegTimesCircle onClick={props.closeModal} />
          </CloseButton>
          <div style={{ margin: '10px 40px' }}>
            <Row>
              
              {/* Left part of the modal */}
              <Col style={{ textAlign: 'left' }}>
                
                <WalletLogo />
                
                <CheckoutTitle style={{ color: 'white' }}>
                  {t('details.checkoutModal.checkout')}
                </CheckoutTitle>
                
                <P style={{ color: 'white' }}>{t('details.checkoutModal.aboutPurchase')}<br />
                  <GradientText>
                    {props.nft.name} {t('details.checkoutModal.from')} {props.nft.creator}
                  </GradientText>
                </P>
              
              </Col>
              
              {/* Right side of the Modal */}
              <Col>
                <Row>
                  <Col size="50">
                    {t('details.checkoutModal.yourBalance')}<br />
                    {t('details.checkoutModal.serviceFees')}<br />
                    {t('details.checkoutModal.youWillPay')}
                  </Col>
                  <Col size="50">
                    0 ETH<br />
                    0.025 ETH<br />
                    <GradientText>1.025 ETH</GradientText>
                  </Col>
                </Row>

                {/* Confirm and cancel buttons */}
                <ButtonsArea>
                  <PaymentButtonStyled full>
                    {t('details.checkoutModal.processPayment')}
                  </PaymentButtonStyled>
                  <Button full primary>
                    {t('details.checkoutModal.cancel')}
                  </Button>
                </ButtonsArea>
              </Col>
            </Row>
          </div>
        </MainBox>
      </Modal>
    </>
  );
};

export default PurchaseModal;