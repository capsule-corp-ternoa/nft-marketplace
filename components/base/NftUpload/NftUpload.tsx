import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Upload from 'components/assets/upload';
import WhiteWaterMark from 'components/assets/WhiteWaterMark';
import { HiddenInput, HiddenShell } from 'components/base/Layout';
import { NftEffectType, NFT_EFFECT_DEFAULT } from 'interfaces';
import Chip from 'ui/components/Chip';

interface Props {
  className?: string;
  description?: string | React.ReactElement<any, any>;
  isRN?: boolean;
  isSecretOption?: boolean;
  note?: string;
  setError: (s: string) => void;
  setModalCreate: (b: boolean) => void;
  setNFT: (f: File | null) => void;
  setEffect: (s: NftEffectType) => void;
}

const NftUpload = ({
  className,
  description,
  isRN = false,
  isSecretOption = false,
  note,
  setError,
  setModalCreate,
  setNFT,
  setEffect,
}: Props) => {
  const [acceptedFileTypes, setAcceptedFileTypes] = useState([
    '.jpg',
    '.jpeg',
    '.png',
    '.gif',
    '.mp4',
    '.mov',
  ]);

  useEffect(() => {
    if (isRN) {
      setAcceptedFileTypes(['.jpg', '.jpeg', '.png', '.gif']);
    }
  }, [isRN]);

  const updateFile = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFunction: (f: File | null) => void
  ) => {
    const { target } = event;
    let file = null;
    let isError = false;
    if (!(target && target.files && target.files[0])) {
      setFunction(file);
      setEffect(NFT_EFFECT_DEFAULT);
      return;
    }
    if (!isError && isRN && target.files[0]!.type.substr(0, 5) === 'video') {
      setError("You can't select video type on mobile DApp yet.");
      isError = true;
    }
    if (
      !isError &&
      !(
        target.files[0]!.type.substr(0, 5) === 'video' ||
        target.files[0]!.type.substr(0, 5) === 'image'
      )
    ) {
      setError(
        `You can't select files different from ${
          !isRN ? 'videos or ' : ''
        }images.`
      );
      isError = true;
    }
    if (!isError && target.files[0].size > 31000000) {
      setError('Max file size is 30mb.');
      isError = true;
    }
    // if (
    //   (target.files[0]!.type.substr(0, 5) === 'video' ||
    //     target.files[0]!.type === 'image/gif') &&
    //   (effect === 'Blur' || effect === 'Protect')
    // ) {
    //   setEffect('Select NFT Option');
    // }
    if (!isError) {
      file = target.files[0];
    } else {
      setModalCreate(true);
      // setEffect(NFT_EFFECT_DEFAULT);
    }
    setFunction(file);
  };

  const DefaultContent = (
    <Content>
      <UploadIcon />
      {description && <InsightMedium>{description}</InsightMedium>}
      {note && <InsightLight>{note}</InsightLight>}
    </Content>
  );

  const SmallUploadContent = (
    <Content isSmall>
      <Chip color="primaryInverted" text="Secret option" />
      {description && <InsightMedium isSmall>{description}</InsightMedium>}
      <UploadIcon isSmall />
      {note && <InsightLight isSmall>{note}</InsightLight>}
    </Content>
  );

  return (
    <NftUploadWrapper className={className}>
      <NftUploadArea htmlFor="uploadNFT" isSecretOption={isSecretOption}>
        {isSecretOption ? SmallUploadContent : DefaultContent}

        <HiddenShell>
          <HiddenInput
            type="file"
            id="uploadNFT"
            onChange={(event) => updateFile(event, setNFT)}
            accept={acceptedFileTypes.join(',')}
          />
        </HiddenShell>
      </NftUploadArea>
      {isSecretOption && (
        <SecretChip
          color="transparent"
          icon={<SecretChipIcon />}
          text="Secret"
        />
      )}
    </NftUploadWrapper>
  );
};

const NftUploadWrapper = styled.div<{ className?: string }>`
  box-sizing: border-box;

  ${({ className }) => className}
`;

const NftUploadArea = styled.label<{ isSecretOption?: boolean }>`
  background: white;
  display: flex;
  position: relative;
  border: 3px dashed #7417ea;
  border-radius: 1.6rem;
  cursor: pointer;

  ${({ isSecretOption }) =>
    isSecretOption &&
    `
    border: none;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    padding: 2.4rem;
  `}
`;

const Content = styled.div<{ isSmall?: boolean }>`
  display: flex;
  flex-direction: column;
  padding: ${({ isSmall }) => (isSmall ? 0 : '8rem 2.4rem')};
  width: 100%;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const UploadIcon = styled(Upload)<{ isSmall?: boolean }>`
  width: ${({ isSmall }) => (isSmall ? '4rem' : '8rem')};
`;

const Insight = styled.div<{ isSmall?: boolean }>`
  font-family: 'Airbnb Cereal App Light';
  font-size: ${({ isSmall }) => (isSmall ? '1rem' : '1.2rem')};
  line-height: 1.3;
  text-align: center;
`;

const InsightMedium = styled(Insight)<{ isSmall?: boolean }>`
  color: #686464;
  margin: 1.6rem 0;
  max-width: 16rem;
`;

const InsightLight = styled(Insight)<{ isSmall?: boolean }>`
  color: #b1b1b1;
  margin-top: ${({ isSmall }) => (isSmall ? '1.6rem' : '0')};
  max-width: 20rem;
`;

const SecretChip = styled(Chip)`
  width: fit-content;
  margin: 2.4rem auto 0;
`;

const SecretChipIcon = styled(WhiteWaterMark)`
  width: 1.6rem;
  height: 1.6rem;
`;

export default NftUpload;
