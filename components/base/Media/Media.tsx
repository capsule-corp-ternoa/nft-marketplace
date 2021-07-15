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
  const [imgSrc, setImgSrc] = useState(loader)
  const [fetchStatusOk, setFetchStatusOk] = useState<boolean | null>(null)
  const mediaType = type?.substr(0, 5)
  const fetchRetry = async (url:string, retries:number = totalRetries, delay:number = 5000):Promise<Response> => {
    const res = await fetch(url)
    if (res && res.status === 200) return res
    // set image src to fallback on firt failed fetch
    if (retries === totalRetries) setImgSrc(fallbackSrc)
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
      setFetchStatusOk(res.status === 200)
    }catch(err){
      console.log(err)
    }
  } 
  useEffect(()=>{
    checkSrcAvailable()
  }, [])
  useEffect(()=>{
    if (fetchStatusOk) 
      setImgSrc(src)
    // else if(fetchStatusOk !== null && fetchStatusOk===false)
    //   setImgSrc(fallbackSrc)
  }, [fetchStatusOk])
  return (
    <>
      {type !== null &&
        imgSrc!==fallbackSrc && //to remove when we have fb image
          (imgSrc === fallbackSrc || imgSrc === loader || mediaType === 'image') ?
            <img 
              src={imgSrc}
              {...rest}
            />
          :
            mediaType === 'video' &&
              <video playsInline autoPlay muted loop {...rest}>
                <source id="outputVideo" src={imgSrc} type="video/mp4" />
              </video>
        
      }
    </>
  )
};

export default Media;
