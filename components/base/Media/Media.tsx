import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { MediaStyle } from 'components/layout/Media';
import Icon from 'components/ui/Icon';
import { NFT_FILE_TYPE_IMAGE, NFT_FILE_TYPE_VIDEO } from 'interfaces/index';
import { timer } from 'utils/functions';
export interface MediaProps {
  isHovering?: boolean;
  src: string;
  type: string | null;
  fallbackSrc?: string;
  retries?: number;
}

const defaultFallback = './media-placeholder.svg'
const totalRetries = 5

const Media: React.FC<MediaProps & Record<string,any>> = ({
  isHovering,
  src, 
  type,
  fallbackSrc=defaultFallback,
  ...rest 
}) => {
  const [mediaSrc, setMediaSrc] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchStatusOk, setFetchStatusOk] = useState<boolean | null>(null)
  const mediaType = type?.slice(0, 5);
  const fetchRetry = async (url:string, retries:number = totalRetries, delay:number = 5000):Promise<Response | void> => {
    const res = await fetch(url).catch(()=>{})
    if (res && res.status === 200) return res
    // set image src to fallback on firt failed fetch
    if (retries === totalRetries) setMediaSrc(fallbackSrc)
    if (retries > 0){
        console.log(`Fetch retry triggered for url (${url}) - retries remaining:`, retries - 1)
        await timer(delay)
        return await fetchRetry(url, retries - 1)
    }else{
        return res
    }
  }
  const checkSrcAvailable = async () => {
    try{
      const res = await fetchRetry(src)
      if (res) setFetchStatusOk((res as Response).status === 200)
    }catch(err){
      console.log(err)
    }
  } 
  useEffect(()=>{
    setIsLoading(true);
    checkSrcAvailable()
  }, [src])
  useEffect(()=>{
    if (fetchStatusOk){
      setMediaSrc(src)
      setIsLoading(false);
      setFetchStatusOk(false)
    }
  }, [fetchStatusOk])

  if (mediaSrc === undefined || isLoading) {
    return <Icon name='animatedLoader' />;
  }

  return (
    <>
      {type !== null &&
      (mediaSrc === fallbackSrc || mediaType === NFT_FILE_TYPE_IMAGE) ? (
        <SImage
          src={mediaSrc}
          isHovering={isHovering}
          {...rest}
        />
      ) : (
        mediaType === NFT_FILE_TYPE_VIDEO && (
          <SVideo playsInline autoPlay muted loop {...rest}>
            <source id="outputVideo" src={mediaSrc} />
          </SVideo>
        )
      )}
    </>
  );
};

const SImage = styled.img`
  ${MediaStyle}
`;

const SVideo = styled.video`
  ${MediaStyle}
`;

export default Media;
