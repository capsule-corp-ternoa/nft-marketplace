import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Upload from 'components/assets/upload';
import { HiddenInput, HiddenShell } from 'components/layout';
import { useCreateNftContext } from 'components/pages/Create/CreateNftContext';
import { NFT_EFFECT_DEFAULT, NFT_EFFECT_SECRET } from 'interfaces';
import Chip from 'components/ui/Chip';

interface Props {
  className?: string;
  content?: string | React.ReactNode;
  inputId: string;
  isMinimal?: boolean;
  isSecretOption?: boolean;
  note?: string;
}

const NftUpload = ({
  className,
  content,
  inputId,
  isMinimal = false,
  isSecretOption = false,
  note,
}: Props) => {
  const { createNftData, setEffect, setError, setNFT, setSecretNFT } =
    useCreateNftContext() ?? {};
  const { isRN } = createNftData ?? {};

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
    let file = target?.files?.[0];
    let isError = false;

    if (file !== null && file !== undefined) {
      if (!isError && isRN && file!.type.substr(0, 5) === 'video') {
        if (setError !== undefined)
          setError("You can't select video type on mobile DApp yet.");
        isError = true;
      }
      if (
        !isError &&
        !(
          file!.type.substr(0, 5) === 'video' ||
          file!.type.substr(0, 5) === 'image'
        )
      ) {
        if (setError !== undefined)
          setError(
            `You can't select files different from ${
              isRN === false ? 'videos or ' : ''
            }images.`
          );
        isError = true;
      }
      if (!isError && file.size > 31000000) {
        if (setError !== undefined) setError('Max file size is 30mb.');
        isError = true;
      }
      if (!isError && setEffect !== undefined) {
        setFunction(file);
        setEffect(isSecretOption ? NFT_EFFECT_SECRET : NFT_EFFECT_DEFAULT);
      }
    }
  };

  if (setNFT === undefined || setSecretNFT === undefined) {
    return null;
  }

  if (isMinimal) {
    return (
      <>
        <Label className={className} htmlFor={inputId}>
          {content}
        </Label>
        <HiddenShell>
          <HiddenInput
            type="file"
            id={inputId}
            onChange={(event) =>
              updateFile(event, isSecretOption ? setNFT : setSecretNFT)
            }
            accept={acceptedFileTypes.join(',')}
          />
        </HiddenShell>
      </>
    );
  }

  return (
    <NftUploadWrapper className={className}>
      <NftUploadArea htmlFor={inputId} isSecretOption={isSecretOption}>
        <Content isSmall={isSecretOption}>
          {isSecretOption && (
            <Chip color="primaryInverted" text="Secret option" />
          )}
          {!isSecretOption && <UploadIcon />}
          {content && (
            <InsightMedium isSmall={isSecretOption}>{content}</InsightMedium>
          )}
          {isSecretOption && <UploadIcon isSmall />}
          {note && <InsightLight isSmall={isSecretOption}>{note}</InsightLight>}
        </Content>

        <HiddenShell>
          <HiddenInput
            type="file"
            id={inputId}
            onChange={(event) =>
              updateFile(event, isSecretOption ? setNFT : setSecretNFT)
            }
            accept={acceptedFileTypes.join(',')}
          />
        </HiddenShell>
      </NftUploadArea>
    </NftUploadWrapper>
  );
};

const Label = styled.label`
  color: #7417ea;
  cursor: pointer;
  font-family: 'Airbnb Cereal App Light';
  font-size: 1.2rem;
  font-style: italic;
`;

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

export default NftUpload;
