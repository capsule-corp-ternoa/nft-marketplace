import React, { useState, useEffect } from 'react'
import { NextPageContext } from 'next'
import Head from 'next/head'
import cookies from 'next-cookies'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'

import { getNFT } from 'actions/nft'
import { getCapsValue } from 'actions/caps'
import { getUser } from 'actions/user'
import BetaBanner from 'components/base/BetaBanner'
import FloatingHeader from 'components/base/FloatingHeader'
import Footer from 'components/base/Footer'
import MainHeader from 'components/base/MainHeader'
import NFTPage from 'components/pages/NFT'
import { NftType } from 'interfaces'
import { appSetUser } from 'redux/app'
import { useMarketplaceData } from 'redux/hooks'
import { encryptCookie, decryptCookie } from 'utils/cookie'
import { getUserIp } from 'utils/functions'
import { MARKETPLACE_ID } from 'utils/constant'

export interface NFTPageProps {
  NFT: NftType
  capsValue: number
}

const NftPage = ({ NFT, capsValue }: NFTPageProps) => {
  const [type, setType] = useState<string | null>(null)
  const [isUserFromDappQR, setIsUserFromDappQR] = useState(false)

  const dispatch = useDispatch()
  const { name } = useMarketplaceData()
  const ipfsMediaSrc = NFT.properties?.preview.ipfs

  useEffect(() => {
    let shouldUpdate = true
    const params = new URLSearchParams(window.location.search)
    if (
      Boolean(window.isRNApp) &&
      window.walletId &&
      (!Cookies.get('token') || decryptCookie(Cookies.get('token') as string) !== window.walletId)
    ) {
      if (params.get('walletId') && params.get('walletId') !== window.walletId) {
        dispatch(appSetUser(null))
      }
      Cookies.remove('token')
      getUser(window.walletId, true)
        .then((user) => {
          if (shouldUpdate) {
            dispatch(appSetUser(user))
            Cookies.set('token', encryptCookie(window.walletId), { expires: 1 })
          }
        })
        .catch((error) => console.log({ error }))
    }
    if (!Boolean(window.isRNApp) && params.get('walletId')) {
      dispatch(appSetUser(null))
    }
    if (window.isRNApp && window.history.length === 1) {
      setIsUserFromDappQR(true)
    }

    return () => {
      shouldUpdate = false
    }
  }, [dispatch])

  useEffect(() => {
    let shouldUpdate = true
    async function callBack() {
      if (ipfsMediaSrc !== undefined) {
        try {
          const res = await fetch(ipfsMediaSrc, { method: 'HEAD' })
          if (shouldUpdate) setType(res.headers.get('Content-Type'))
          return res
        } catch (err) {
          console.log('Error :', err)
        }
      }
    }

    callBack()
    return () => {
      shouldUpdate = false
    }
  }, [ipfsMediaSrc])

  return (
    <>
      <Head>
        <title>
          {NFT.title} - {name}
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={NFT.description} />
        <meta name="og:image" content={NFT.properties?.preview.ipfs} />
        <meta property="og:image" content={NFT.properties?.preview.ipfs} />
      </Head>

      <BetaBanner />
      <MainHeader />
      <NFTPage NFT={NFT} type={type} capsValue={capsValue} isUserFromDappQR={isUserFromDappQR} />
      <Footer />
      <FloatingHeader />
    </>
  )
}

export async function getServerSideProps(ctx: NextPageContext) {
  const token = cookies(ctx).token && decryptCookie(cookies(ctx).token as string)
  let NFT: NftType | null = null,
    capsValue = 0
  const promises = []
  const ip = getUserIp(ctx.req)

  promises.push(
    new Promise<void>((success) => {
      getNFT(ctx.query.name as string, true, token ? token : null, ip, MARKETPLACE_ID, true)
        .then((_nft) => {
          NFT = _nft
          success()
        })
        .catch(success)
    })
  )
  promises.push(
    new Promise<void>((success) => {
      getCapsValue()
        .then((_value) => {
          capsValue = _value
          success()
        })
        .catch(success)
    })
  )
  await Promise.all(promises)
  if (!NFT) {
    return {
      notFound: true,
    }
  }
  return {
    props: { NFT, capsValue },
  }
}

export default NftPage
