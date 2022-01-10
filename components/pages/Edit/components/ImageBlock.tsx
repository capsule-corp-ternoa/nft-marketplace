import React from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';

import { AVATAR_VARIANT_EDIT, Picture } from 'components/base/Avatar';
import { HiddenInput, HiddenShell } from 'components/layout';
import Chip from 'components/ui/Chip';
import { breakpointMap } from 'style/theme/base';

interface Props {
  banner?: string;
  chipLabel: string;
  className?: string;
  description?: string;
  id: string;
  name?: string;
  onChange: (f: File) => void;
  picture?: string;
}

const ImageBlock = ({
  banner,
  chipLabel,
  className,
  description,
  id,
  name,
  onChange,
  picture,
}: Props) => {
  const isSmallDesktop = useMediaQuery({
    query: `(max-width: ${breakpointMap.xl - 1}px)`,
  });

  return (
    <SBlockContainer className={className}>
      <label htmlFor={id}>
        {name && (
          <SPicture
            name={name}
            picture={picture}
            variant={AVATAR_VARIANT_EDIT}
          />
        )}
        {banner && (
          <SBannerPicture src={banner} alt="user banner" draggable="false" />
        )}
      </label>
      {description && <SDescription>{description}</SDescription>}
      <SUploadLabel htmlFor={id}>
        <Chip color="primaryLight" size={isSmallDesktop ? "small" : "medium"} text={chipLabel} />
        <HiddenShell>
          <HiddenInput
            accept='.jpg, .jpeg, .png, .gif'
            type="file"
            id={id}
            onChange={(event) => {
              const { target } = event;
              const file = target?.files?.[0];
              if (file) onChange(file);
            }}
          />
        </HiddenShell>
      </SUploadLabel>
    </SBlockContainer>
  );
};

const SBlockContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SPicture = styled(Picture)`
  &:hover {
    cursor: pointer;
  }
`;

const SBannerPicture = styled.img`
  width: 28rem;
  height: 9.6rem;
  border-radius: 0.8rem;
  object-fit: cover;

  &:hover {
    cursor: pointer;
  }
`;

const SDescription = styled.span`
  width: 100%;
  max-width: 18rem;
  color: ${({ theme }) => theme.colors.neutral300};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 1.2rem;
  margin-top: 2.4rem;
  text-align: center;
`;

const SUploadLabel = styled.label`
  cursor: pointer;
  margin-top: 2.4rem;
`;

export default ImageBlock;
