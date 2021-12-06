import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Upload from 'components/assets/upload';
import { HiddenInput, HiddenShell, InsightLight } from 'components/layout';
import Chip from 'components/ui/Chip';

interface Props {
  className?: string;
  content?: string | React.ReactNode;
  inputId: string;
  isMinimal?: boolean;
  isRN?: boolean;
  isSecretOption?: boolean;
  note?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const updateFile = (
  event: React.ChangeEvent<HTMLInputElement>,
  setError: (s: string) => void,
  setFunction: (f: File) => void,
  isRN = false
) => {
  const { target } = event;
  let file = target?.files?.[0];
  let isError = false;

  if (file !== null && file !== undefined) {
    if (!isError && isRN && file!.type.substr(0, 5) === 'video') {
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
      setError(
        `You can't select files different from ${
          isRN === false ? 'videos or ' : ''
        }images.`
      );
      isError = true;
    }
    if (!isError && file.size > 31000000) {
      setError('Max file size is 30mb.');
      isError = true;
    }
    if (!isError) {
      setFunction(file);
    }
  }
};

const NftUpload = ({
  className,
  content,
  inputId,
  isMinimal = false,
  isRN,
  isSecretOption = false,
  note,
  onChange,
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
            onChange={onChange}
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
          <Chip
            color="primaryLight"
            text="Secret option"
            size="small"
            variant="round"
          />
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
          onChange={onChange}
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
    padding: 2rem;
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
