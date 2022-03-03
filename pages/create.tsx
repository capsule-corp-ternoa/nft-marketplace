import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'

import { getCategories } from 'actions/category'
import BetaBanner from 'components/base/BetaBanner'
import FloatingHeader from 'components/base/FloatingHeader'
import Footer from 'components/base/Footer'
import MainHeader from 'components/base/MainHeader'
import { ModalMint } from 'components/base/Modal'
import Create from 'components/pages/Create'
import { CategoryType } from 'interfaces'
import { useApp, useMarketplaceData } from 'redux/hooks'

export interface CreatePageProps {
  categories: CategoryType[]
}

export interface NFTProps {
  categories: CategoryType[]
  description: string
  name: string
  quantity: number
  royalties: number
  seriesId: string
}

const CreatePage = ({ categories }: CreatePageProps) => {
  const { user } = useApp()
  const { name } = useMarketplaceData()

  const isNftCreationEnabled =
    process.env.NEXT_PUBLIC_IS_NFT_CREATION_ENABLED === undefined
      ? true
      : process.env.NEXT_PUBLIC_IS_NFT_CREATION_ENABLED === 'true'

  const [error, setError] = useState('')
  const [isModalMintExpanded, setIsModalMintExpanded] = useState(false)
  const [previewNFT, setPreviewNFT] = useState<File | null>(null) // Public NFT media
  const [output, setOutput] = useState<string[]>([])
  const [originalNFT, setOriginalNFT] = useState<File | null>(null) // Crypted NFT media
  const [uploadSize, setUploadSize] = useState(0)
  const [stateSocket, setStateSocket] = useState<any>(null)
  const [thumbnailTimecode, setThumbnailTimecode] = useState(0)
  const [NFTData, setNFTData] = useState<NFTProps>({
    categories: [],
    description: '',
    name: '',
    quantity: 1,
    royalties: 0,
    seriesId: '',
  })
  const { quantity } = NFTData
  const [QRData, setQRData] = useState({
    walletId: user ? user.walletId : '',
    quantity: quantity,
  })
  const [runNFTMintData, setRunNFTMintData] = useState<any>(null)

  useEffect(() => {
    if (!isNftCreationEnabled) {
      Router.push('/')
    }
  }, [isNftCreationEnabled])

  useEffect(() => {
    if (originalNFT && quantity && Number(quantity) > 0) {
      const previewSize = previewNFT ? previewNFT.size : originalNFT.size
      const originalSize = originalNFT.size * Number(quantity)
      setUploadSize(previewSize + originalSize)
    }
  }, [quantity, previewNFT, originalNFT])

  useEffect(() => {
    if (error !== '') {
      setIsModalMintExpanded(true)
    }
  }, [error])

  useEffect(() => {
    if (!isModalMintExpanded) {
      setError('')
      if (stateSocket) stateSocket.close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalMintExpanded])

  return (
    <>
      <Head>
        <title>{name} - Create your NFT</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="SecretNFT Marketplace, by Ternoa." />
        <meta name="og:image" content="ternoa-social-banner.jpg" />
      </Head>
      <>
        {isModalMintExpanded && (
          <ModalMint
            error={error}
            previewNFT={previewNFT}
            NFTData={NFTData}
            output={output}
            QRData={QRData}
            runNFTMintData={runNFTMintData}
            originalNFT={originalNFT}
            uploadSize={uploadSize}
            stateSocket={stateSocket}
            setStateSocket={setStateSocket}
            setError={setError}
            setExpanded={setIsModalMintExpanded}
            setRunNFTMintData={setRunNFTMintData}
            thumbnailTimecode={thumbnailTimecode}
          />
        )}
        <BetaBanner />
        <MainHeader />
        {isNftCreationEnabled && (
          <Create
            categoriesOptions={categories}
            NFTData={NFTData}
            originalNFT={originalNFT}
            QRData={QRData}
            setError={setError}
            setIsModalMintExpanded={setIsModalMintExpanded}
            setNFTData={setNFTData}
            setOutput={setOutput}
            setOriginalNFT={setOriginalNFT}
            setPreviewNFT={setPreviewNFT}
            setQRData={setQRData}
            thumbnailTimecode={thumbnailTimecode}
            setThumbnailTimecode={setThumbnailTimecode}
          />
        )}
        <Footer />
        <FloatingHeader />
      </>
    </>
  )
}

export async function getServerSideProps() {
  let categories: CategoryType[] = []

  try {
    categories = await getCategories()
  } catch (error) {
    console.log(error)
  }

  return {
    props: { categories },
  }
}

export default CreatePage
