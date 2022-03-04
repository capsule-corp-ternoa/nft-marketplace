import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import emojiRegex from 'emoji-regex'
import { checkMark, errorMark, loadingSpinner500 } from 'components/assets'
import { Advice, Container, InputLabel, InputShell, Insight, Title, Wrapper } from 'components/layout'
import NftPreview from 'components/base/NftPreview'
import {
  NFT_EFFECT_BLUR,
  NFT_EFFECT_DEFAULT,
  NFT_EFFECT_PROTECT,
  NFT_EFFECT_SECRET,
  CategoryType,
  NftEffectType,
} from 'interfaces'
import Autocomplete from 'components/ui/Autocomplete'
import Button from 'components/ui/Button'
import { Input, TextArea } from 'components/ui/Input'
import Tooltip from 'components/ui/Tooltip'

import { NFTProps } from 'pages/create'
import { canAddToSeries } from 'actions/nft'
import { processFile } from 'utils/imageProcessing/image'
import mime from 'mime-types'
import ThumbnailSelector from 'components/base/ThumbnailSelector'
import { useApp } from 'redux/hooks'

const DEFAULT_BLUR_VALUE = 5

type QRDataType = {
  walletId: string
  quantity: number
}

export interface CreateProps {
  categoriesOptions: CategoryType[]
  NFTData: NFTProps
  originalNFT: File | null
  QRData: QRDataType
  setError: (err: string) => void
  setIsModalMintExpanded: (b: boolean) => void
  setNFTData: (o: NFTProps) => void
  setOriginalNFT: (f: File | null) => void
  setOutput: (s: string[]) => void
  setPreviewNFT: (f: File | null) => void
  setQRData: (data: QRDataType) => void
  thumbnailTimecode: number
  setThumbnailTimecode: (x: number) => void
}

const Create = ({
  categoriesOptions,
  NFTData: initalValue,
  originalNFT,
  QRData,
  setError,
  setIsModalMintExpanded,
  setNFTData: setNftDataToParent,
  setOriginalNFT,
  setOutput,
  setPreviewNFT,
  setQRData,
  thumbnailTimecode,
  setThumbnailTimecode,
}: CreateProps) => {
  const { user } = useApp()

  const [blurValue, setBlurValue] = useState<number>(DEFAULT_BLUR_VALUE)
  const [coverNFT, setCoverNFT] = useState<File | null>(null) // Cover NFT used for secret effect
  const [effect, setEffect] = useState<NftEffectType>(NFT_EFFECT_DEFAULT)
  const [nftData, setNFTData] = useState(initalValue)
  const [canAddToSeriesValue, setCanAddToSeriesValue] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const { categories, description, name, quantity, seriesId } = nftData
  const showThumbnailSelector =
    (coverNFT && mime.lookup(coverNFT.name).toString().indexOf('video') !== -1) ||
    (effect === NFT_EFFECT_DEFAULT && originalNFT && mime.lookup(originalNFT.name).toString().indexOf('video') !== -1)

  useEffect(() => {
    let shouldUpdate = true
    const checkAddToSerie = async () => {
      try {
        const regex = emojiRegex()
        if (user) {
          if (regex.test(seriesId)) throw new Error('Invalid character')
          const canAdd = await canAddToSeries(seriesId, user.walletId)
          if (shouldUpdate) setCanAddToSeriesValue(canAdd)
        } else {
          if (shouldUpdate) setCanAddToSeriesValue(true)
        }
        if (shouldUpdate) setIsLoading(false)
      } catch (err: any) {
        if (shouldUpdate) {
          setCanAddToSeriesValue(false)
          setIsLoading(false)
        }
        console.log(err.message ? err.message : err)
      }
    }

    setIsLoading(true)
    const timer = setTimeout(() => {
      if (!seriesId || seriesId === '') {
        setCanAddToSeriesValue(true)
        setIsLoading(false)
      } else {
        checkAddToSerie()
      }
    }, 1000)
    return () => {
      clearTimeout(timer)
      shouldUpdate = false
    }
  }, [seriesId, user])

  const validateQuantity = (value: number, limit: number) => {
    return value > 0 && value <= limit
  }

  const isDataValid =
    name &&
    description &&
    validateQuantity(quantity, 10) &&
    originalNFT &&
    (effect !== NFT_EFFECT_SECRET || coverNFT) &&
    canAddToSeriesValue &&
    !isLoading

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const nextNftData = { ...nftData, [e.target.name]: e.target.value }
    setNFTData(nextNftData)
    setNftDataToParent(nextNftData)
  }

  const handleCategoryChipDelete = (list: CategoryType[], id: CategoryType['_id']) => {
    const nextNftData = {
      ...nftData,
      categories: list.filter((item) => item._id !== id),
    }
    setNFTData(nextNftData)
    setNftDataToParent(nextNftData)
  }

  const handleCategoryOptionClick = (option: CategoryType) => {
    const nextNftData = {
      ...nftData,
      categories: categories.concat(option),
    }
    setNFTData(nextNftData)
    setNftDataToParent(nextNftData)
  }

  const initMintingNFT = async () => {
    try {
      if (!user) throw new Error('Please login to create an NFT.')
      setIsModalMintExpanded(true)

      if (originalNFT !== null) {
        if (effect === NFT_EFFECT_BLUR || effect === NFT_EFFECT_PROTECT) {
          const processedNFT = await processFile(originalNFT, effect, setError, blurValue)
          if (processedNFT === undefined)
            throw new Error(`Elements are undefined after file processing using ${effect} effect.`)
          setPreviewNFT(processedNFT)
        } else if (effect === NFT_EFFECT_SECRET) {
          if (coverNFT === null) throw new Error('Please add a cover NFT using a secret effect.')
          setPreviewNFT(coverNFT)
        }
      }

      setQRData({
        ...QRData,
        quantity,
      })
      setOutput([quantity.toString()])
    } catch (err) {
      console.error(err)
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError(err as string)
      }
    }
  }

  const uploadFiles = async () => {
    setOutput([])
    setError('')

    try {
      initMintingNFT()
    } catch (err) {
      console.error(err)
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError(err as string)
      }
    }
  }

  useEffect(() => {
    setCoverNFT(null)
  }, [originalNFT])

  return (
    <Container>
      <Wrapper>
        <Title>Create your NFT</Title>
        <SNftPreviewWrapper>
          <NftPreview
            blurValue={blurValue}
            coverNFT={coverNFT}
            effect={effect}
            originalNFT={originalNFT}
            setBlurValue={setBlurValue}
            setCoverNFT={setCoverNFT}
            setEffect={setEffect}
            setError={setError}
            setIsLoading={setIsLoading}
            setOriginalNFT={setOriginalNFT}
          />
        </SNftPreviewWrapper>
        <SForm>
          <SLeft>
            {showThumbnailSelector && (
              <InputShell>
                <InputLabel>
                  Thumbnail
                  <STooltip text="Your preview is a video. You have to chose a thumbnail by using the timeline." />
                </InputLabel>
                <ThumbnailSelector
                  originalNFT={originalNFT as File}
                  coverNFT={coverNFT as File}
                  showThumbnailSelector={showThumbnailSelector}
                  thumbnailTimecode={thumbnailTimecode}
                  setThumbnailTimecode={setThumbnailTimecode}
                  effect={effect}
                />
              </InputShell>
            )}
            <Input label="Name" name="name" onChange={handleChange} placeholder="Enter name" value={name} />

            <STextArea
              label="Description"
              name="description"
              onChange={handleChange}
              placeholder="Tell about the NFT in a few words..."
              value={description}
            />
          </SLeft>
          <SRight>
            <Autocomplete<CategoryType>
              label={
                <>
                  Categories<SInsight>(optional)</SInsight>
                </>
              }
              list={categories}
              onChipDelete={handleCategoryChipDelete}
              onOptionClick={handleCategoryOptionClick}
              /* Remove already set categories */
              options={categoriesOptions.filter(
                ({ name }) => !categories.find(({ name: listItemName }) => listItemName === name)
              )}
            />

            {/* TODO in the future */}
            {/* <Input
                insight="(max: 10%)"
                label="Royalties"
                name="royalties"
                onChange={handleChange}
                placeholder="Enter royalties"
                value={royalties}
              />*/}

            <Input
              insight="(max: 10)"
              isError={!validateQuantity(quantity, 10)}
              label="Quantity"
              name="quantity"
              onChange={handleChange}
              placeholder="1"
              value={quantity}
            />

            <Input
              endIcon={
                seriesId !== ''
                  ? isLoading
                    ? loadingSpinner500
                    : canAddToSeriesValue
                    ? checkMark
                    : errorMark
                  : undefined
              }
              insight="(optional)"
              isError={!canAddToSeriesValue}
              label="Series ID"
              name="seriesId"
              onChange={handleChange}
              placeholder="Enter ID"
              tooltipText="Specified your own series id. Series must be locked (never listed / transferred) and owned by you."
              value={seriesId}
            />
          </SRight>
        </SForm>
        <SAdvice>Information cannot be modified after NFT is created !</SAdvice>
        <SButton color="primary500" disabled={!(isDataValid && user)} onClick={uploadFiles} text="Create NFT" />
      </Wrapper>
    </Container>
  )
}

const SNftPreviewWrapper = styled.div`
  margin-top: 3.2rem;

  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 5.4rem;
  }
`

const SForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 4rem;

  > * {
    width: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    align-items: normal;
    flex-direction: row;
    margin-top: 12rem;
  }
`

const FormSideLayout = styled.div`
  > * {
    margin-top: 4rem;

    ${({ theme }) => theme.mediaQueries.md} {
      margin-top: 6.4rem;
    }

    &:first-child {
      margin-top: 0;
    }
  }
`

const SLeft = styled(FormSideLayout)`
  ${({ theme }) => theme.mediaQueries.md} {
    border-right: 1px solid #e0e0e0;
    padding-right: 4.8rem;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    padding-right: 13.6rem;
  }
`

const SRight = styled(FormSideLayout)`
  margin-top: 4rem;

  ${({ theme }) => theme.mediaQueries.md} {
    padding-left: 4.8rem;
    margin-top: 0;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    padding-left: 13.6rem;
  }
`

const STextArea = styled(TextArea)`
  flex: 1;
`

const STooltip = styled(Tooltip)`
  margin-left: 0.4rem;
`

const SInsight = styled(Insight)`
  margin-left: 0.8rem;
`

const SAdvice = styled(Advice)`
  margin: 4rem auto 0;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.xl} {
    margin: 7.2rem auto 0;
  }
`

const SButton = styled(Button)`
  margin-top: 4.8rem;
`

export default Create
