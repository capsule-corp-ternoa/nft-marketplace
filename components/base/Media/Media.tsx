import React, { useEffect, useState } from 'react';

export interface MediaProps {
  src: string;
  type: string | null;
  fallbackSrc?: string;
  retries?: number;
}

const loader = '/loader.svg'
const timer = (ms:number) => new Promise(res => setTimeout(res, ms));
const defaultFallback = ""
const totalRetries = 5

const Media: React.FC<MediaProps & Record<string,any>> = ({ 
  src, 
  type,
  fallbackSrc=defaultFallback,
  ...rest 
}) => {
  const [mediaSrc, setMediaSrc] = useState(loader)
  const [fetchStatusOk, setFetchStatusOk] = useState<boolean | null>(null)
  const mediaType = type?.substr(0, 5)
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
    checkSrcAvailable()
  }, [])
  useEffect(()=>{
    if (fetchStatusOk) 
      setMediaSrc(src)
  }, [fetchStatusOk])
  return (
    <>
      {type !== null &&
        mediaSrc!==fallbackSrc && //to remove when we have fb image
          (mediaSrc === fallbackSrc || mediaSrc === loader || mediaType === 'image') ?
            <img 
              src={mediaSrc}
              {...rest}
            />
          :
            mediaType === 'video' &&
              <video playsInline autoPlay muted loop {...rest}>
                <source id="outputVideo" src={mediaSrc} />
              </video>
        
      }
    </>
  )
};

export default Media;
