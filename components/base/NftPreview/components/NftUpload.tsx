import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Upload from 'components/assets/upload';
import { HiddenInput, HiddenShell, InsightLight } from 'components/layout';
import { useCreateNftContext } from 'components/pages/Create/CreateNftContext';
import Chip from 'components/ui/Chip';
import { NFT_EFFECT_DEFAULT, NFT_EFFECT_SECRET } from 'interfaces';

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
    <SLabel htmlFor={inputId} isSecretOption={isSecretOption}>
      <SWrapper isSmall={isSecretOption}>
        {isSecretOption && (
          <Chip color="primaryInverted" text="Secret option" />
        )}
        {!isSecretOption && <SUploadIcon />}
        {content && (
          <SInsightMedium isSmall={isSecretOption}>{content}</SInsightMedium>
        )}
        {isSecretOption && <SUploadIcon isSmall />}
        {note && <InsightLight>{note}</InsightLight>}
      </SWrapper>

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
    </SLabel>
  );
};

const Label = styled.label`
  color: #7417ea;
  cursor: pointer;
  font-family: 'Airbnb Cereal App Light';
  font-size: 1.2rem;
  font-style: italic;
`;

const SLabel = styled.label<{ isSecretOption?: boolean }>`
  width: 100%;
  height: auto;
  background: white;
  display: flex;
  justify-content: center;
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

const SWrapper = styled.div<{ isSmall?: boolean }>`
  display: flex;
  flex-direction: column;
  padding: ${({ isSmall }) => (isSmall ? 0 : '8rem 2.4rem')};
  width: 100%;
  max-width: ${({ isSmall }) => (isSmall ? '16rem' : '26rem')};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-align: center;

  > * {
    margin-top: 1.6rem;

    &:first-child {
      margin-top: 0;
    }
  }
`;

const SUploadIcon = styled(Upload)<{ isSmall?: boolean }>`
  width: ${({ isSmall }) => (isSmall ? '4rem' : '8rem')};
`;


const SInsightMedium = styled(InsightLight)<{ isSmall?: boolean }>`
  color: #686464;
  font-size: ${({ isSmall }) => (isSmall ? '1.2rem' : '1.6rem')};
  margin: 1.6rem 0;
`;

export default NftUpload;
