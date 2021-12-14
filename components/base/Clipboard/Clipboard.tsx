import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Icon from 'components/ui/Icon';
import { clipboardCopy } from 'utils/functions';
import { middleEllipsis } from 'utils/strings';

interface Props {
  address: string;
  className?: string;
  isEllipsis?: boolean;
}

const Clipboard = ({
  address,
  className,
  isEllipsis = false,
}: Props) => {
  const [isCopyIndicator, setIsCopyIndicator] = useState(false);

  useEffect(() => {
    if (isCopyIndicator) {
      const timer = setTimeout(() => {
        setIsCopyIndicator(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isCopyIndicator]);

  return (
    <SAddressWrapper
      className={className}
      onClick={() => {
        clipboardCopy(address);
        setIsCopyIndicator(true);
      }}
    >
      {isEllipsis ? middleEllipsis(address, 20) : address}
      {isCopyIndicator ? (
        <>
          <SCheckIcon name="checkMark" />
          <SLabel>Copied !</SLabel>
        </>
      ) : (
        <SCopyIcon name="copyPaste" />
      )}
    </SAddressWrapper>
  );
};

const SAddressWrapper = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.neutral200};
  font-family: ${({ theme }) => theme.fonts.light};
  font-size: 1.2rem;

  ${({ theme }) => theme.mediaQueries.lg} {
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      fill: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const SCheckIcon = styled(Icon)`
  width: 1.2rem;
  fill: ${({ theme }) => theme.colors.primary};
  margin-left: 0.8rem;
`;

const SLabel = styled.span`
  margin-left: 0.4rem;
`;

const SCopyIcon = styled(Icon)`
  width: 1.2rem;
  fill: ${({ theme }) => theme.colors.neutral400};
  margin-left: 0.8rem;
`;

export default Clipboard;
