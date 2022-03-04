/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useState } from 'react'
import Image from 'next/image'
import styled from 'styled-components'

import { Loader } from 'components/ui/Icon'
import { NFT_FILE_TYPE_IMAGE, NFT_FILE_TYPE_VIDEO } from 'interfaces/index'
import { timer } from 'utils/functions'
import { shimmer, toBase64 } from 'utils/imageProcessing/image'
export interface MediaProps {
  src: string
  type: string | null
  fallbackSrc?: string
  retries?: number
}

const defaultFallback = './media-placeholder.svg'
const totalRetries = 5

const Media: React.FC<MediaProps & Record<string, any>> = ({ src, type, fallbackSrc = defaultFallback }) => {
  const [mediaSrc, setMediaSrc] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [fetchStatusOk, setFetchStatusOk] = useState<boolean | null>(null)
  const mediaType = type?.slice(0, 5)
  const fetchRetry = async (url: string, retries: number = totalRetries, delay = 5000): Promise<Response | void> => {
    const res = await fetch(url).catch((error) => {
      console.log(error)
    })
    if (res && res.status === 200) return res
    // set image src to fallback on firt failed fetch
    if (retries === totalRetries) setMediaSrc(fallbackSrc)
    if (retries > 0 && url !== undefined) {
      console.log(`Fetch retry triggered for url (${url}) - retries remaining:`, retries - 1)
      await timer(delay)
      return await fetchRetry(url, retries - 1)
    } else {
      return res
    }
  }

  useEffect(() => {
    let shouldUpdate = true
    const checkSrcAvailable = async () => {
      try {
        const res = await fetchRetry(src)
        if (res && shouldUpdate) setFetchStatusOk((res as Response).status === 200)
      } catch (err) {
        console.log(err)
      }
    }

    setIsLoading(true)
    checkSrcAvailable()
    return () => {
      shouldUpdate = false
    }
  }, [src])

  useEffect(() => {
    if (fetchStatusOk) {
      setMediaSrc(src)
      setIsLoading(false)
      setFetchStatusOk(false)
    }
  }, [fetchStatusOk])

  if (mediaSrc === undefined || isLoading) {
    return <SLoader useLottie />
  }

  return (
    <>
      {type !== null && (mediaSrc === fallbackSrc || mediaType === NFT_FILE_TYPE_IMAGE) ? (
        <SImage
          src={mediaSrc}
          alt="imgnft"
          draggable="false"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(420, 672))}`}
          layout="fill"
          quality={50}
        />
      ) : (
        mediaType === NFT_FILE_TYPE_VIDEO && (
          <SVideo playsInline autoPlay muted loop draggable="false">
            <source id="outputVideo" src={mediaSrc} />
          </SVideo>
        )
      )}
    </>
  )
}

const SLoader = styled(Loader)`
  margin: 0 auto;
  align-self: center;
`

const SImage = styled(Image)`
  object-fit: cover;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 1.2rem;
`

const SVideo = styled.video`
  object-fit: cover;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 1.2rem;
`

export default memo(Media)
