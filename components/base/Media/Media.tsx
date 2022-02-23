import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import { Loader } from 'components/ui/Icon';
import { NFT_FILE_TYPE_IMAGE, NFT_FILE_TYPE_VIDEO } from 'interfaces/index';
import { timer } from 'utils/functions';
import { scale } from 'style/animations';
export interface MediaProps {
  isHovering?: boolean;
  src: string;
  type: string | null;
  fallbackSrc?: string;
  retries?: number;
}

const defaultFallback = './media-placeholder.svg';
const totalRetries = 5;

const Media: React.FC<MediaProps & Record<string, any>> = ({
  isHovering,
  src,
  type,
  fallbackSrc = defaultFallback,
  ...rest
}) => {
  const [mediaSrc, setMediaSrc] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchStatusOk, setFetchStatusOk] = useState<boolean | null>(null);
  const mediaType = type?.slice(0, 5);
  const fetchRetry = async (
    url: string,
    retries: number = totalRetries,
    delay: number = 5000
  ): Promise<Response | void> => {
    const res = await fetch(url).catch(() => {});
    if (res && res.status === 200) return res;
    // set image src to fallback on firt failed fetch
    if (retries === totalRetries) setMediaSrc(fallbackSrc);
    if (retries > 0 && url !== undefined) {
      console.log(`Fetch retry triggered for url (${url}) - retries remaining:`, retries - 1);
      await timer(delay);
      return await fetchRetry(url, retries - 1);
    } else {
      return res;
    }
  };
  const checkSrcAvailable = async () => {
    try {
      const res = await fetchRetry(src);
      if (res) setFetchStatusOk((res as Response).status === 200);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    checkSrcAvailable();
  }, [src]);
  useEffect(() => {
    if (fetchStatusOk) {
      setMediaSrc(src);
      setIsLoading(false);
      setFetchStatusOk(false);
    }
  }, [fetchStatusOk]);

  if (mediaSrc === undefined || isLoading) {
    return <SLoader />;
  }

  return (
    <>
      {type !== null && (mediaSrc === fallbackSrc || mediaType === NFT_FILE_TYPE_IMAGE) ? (
        <SImage src={mediaSrc} isHovering={Boolean(isHovering)} {...rest} />
      ) : (
        mediaType === NFT_FILE_TYPE_VIDEO && (
          <SVideo isHovering={Boolean(isHovering)} playsInline autoPlay muted loop {...rest}>
            <source id="outputVideo" src={mediaSrc} />
          </SVideo>
        )
      )}
    </>
  );
};

const SLoader = styled(Loader)`
  margin: 0 auto;
  align-self: center;
`;

const scaleInAnimation = css<{ isHovering: boolean }>`
  animation: ${scale('1', '1.08')} 0.8s cubic-bezier(0.25, 1, 0.5, 1);
  animation-fill-mode: forwards;
`;

const scaleOutAnimation = css<{ isHovering: boolean }>`
  animation: ${scale('1.08', '1')} 0.8s cubic-bezier(0.25, 1, 0.5, 1);
  animation-fill-mode: forwards;
`;

const SImage = styled.img<{ isHovering: boolean }>`
  object-fit: cover;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 1.2rem;

  ${({ isHovering }) => (isHovering ? scaleInAnimation : scaleOutAnimation)}
`;

const SVideo = styled.video<{ isHovering: boolean }>`
  object-fit: cover;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 1.2rem;

  ${({ isHovering }) => (isHovering ? scaleInAnimation : scaleOutAnimation)}
`;

export default Media;
