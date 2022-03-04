import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { useMediaQuery } from 'react-responsive'

import { likeNFT, unlikeNFT } from 'actions/nft'
import Avatar from 'components/base/Avatar'
import Button from 'components/ui/Button'
import Chip from 'components/ui/Chip'
import { AllFilterIdsTypes } from 'interfaces/filters'
import { NftType } from 'interfaces/index'
import { appSetUserLikedNFTs } from 'redux/app'
import { useApp } from 'redux/hooks'
import { fadeIn, scale, ySlide } from 'style/animations'
import { breakpointMap } from 'style/theme/base'
import { ALL_FILTER_IDS, PRICE_FILTER } from 'utils/constant'
import { LIKE_ACTION, LIKE_ACTION_TYPE, UNLIKE_ACTION } from 'utils/profile/constants'
import { computeCaps } from 'utils/strings'

import Media from '../Media'

export interface NftCardProps {
  className?: string
  handleLike?: (action: LIKE_ACTION_TYPE, nft?: NftType) => void
  item: NftType
  notClickeable?: boolean
  noHover?: boolean
  noStatsChips?: boolean
  noAvailableChip?: boolean
  noPriceChip?: boolean
  noSecretChip?: boolean
  quantity?: number
}

const NftCard: React.FC<NftCardProps> = ({
  className,
  handleLike,
  item,
  notClickeable = false,
  noHover = false,
  noStatsChips = false,
  noAvailableChip = false,
  noPriceChip = false,
  noSecretChip = false,
  quantity,
}) => {
  const { user } = useApp()
  const dispatch = useDispatch()
  const router = useRouter()
  const isDesktopOrLaptop = useMediaQuery({
    query: `(min-width: ${breakpointMap.lg}px)`,
  })

  const {
    creator,
    creatorData,
    id: nftId,
    price,
    properties,
    serieId,
    smallestPrice,
    totalFiltered,
    totalListedInMarketplace,
    totalListedNft,
    totalNft,
  } = item
  const ipfsMediaSrc = properties?.preview.ipfs

  const [isHovering, setIsHovering] = useState(false)
  const [isLiked, setIsLiked] = useState(
    (serieId === '0'
      ? user?.likedNFTs?.some(({ nftId }) => nftId === item.id)
      : user?.likedNFTs?.some(({ serieId }) => serieId === item.serieId)) ?? false
  )
  const [likeLoading, setLikeLoading] = useState(false)
  const [type, setType] = useState<string | null>(null)

  const isCreator = creator !== undefined && creator !== '' && creatorData !== undefined
  const isUserLogged = user !== undefined && user !== null

  const isFilterActive =
    typeof router.query.filter === 'string' && ALL_FILTER_IDS.includes(router.query.filter as AllFilterIdsTypes)
  const isPriceFilterActive =
    router.query.filter === PRICE_FILTER && (Number(router.query.minPrice) > 0 || Number(router.query.maxPrice) > 0)
  const isPrice = Number(isPriceFilterActive ? price : smallestPrice) > 0
  const isSecret = properties?.cryptedMedia.ipfs !== properties?.preview.ipfs

  const priceWording = isPrice ? `${computeCaps(Number(isPriceFilterActive ? price : smallestPrice))} CAPS` : undefined
  const defaultQuantityAvailable =
    (isFilterActive && totalFiltered) || (totalListedInMarketplace ?? totalListedNft ?? 1)
  const quantityAvailable = quantity ?? defaultQuantityAvailable

  const toggleLikeDislike = async () => {
    try {
      if (!likeLoading && user?.walletId) {
        setLikeLoading(true)
        if (isLiked) {
          await unlikeNFT(user.walletId, nftId, serieId)
          if (user.likedNFTs && user.likedNFTs.length > 0) {
            dispatch(appSetUserLikedNFTs(user.likedNFTs.filter((item) => item.nftId !== nftId)))
          }
        } else {
          await likeNFT(user.walletId, nftId, serieId)
          dispatch(appSetUserLikedNFTs(user.likedNFTs?.concat([{ serieId, nftId, walletId: user.walletId }])))
        }
        setIsLiked((prevState) => !prevState)
        setLikeLoading(false)
        if (handleLike) handleLike(isLiked ? UNLIKE_ACTION : LIKE_ACTION, item)
      }
    } catch (error) {
      console.error(error)
      setLikeLoading(false)
    }
  }

  useEffect(() => {
    setIsLiked(
      (serieId === '0'
        ? user?.likedNFTs?.some(({ nftId: likedNftId }) => nftId === likedNftId)
        : user?.likedNFTs?.some(({ serieId: likedNftSerieId }) => serieId === likedNftSerieId)) ?? false
    )
  }, [nftId, serieId, user?.likedNFTs])

  useEffect(() => {
    let shouldUpdate = true
    async function callBack() {
      if (ipfsMediaSrc !== undefined) {
        try {
          const res = await fetch(ipfsMediaSrc, {
            method: 'HEAD',
          })
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

  if (ipfsMediaSrc === undefined) {
    return null
  }

  return (
    <SMediaContainer
      className={className}
      onFocus={() => false}
      onBlur={() => false}
      onMouseOut={() => isDesktopOrLaptop && !noHover && setIsHovering(false)}
      onMouseOver={() => isDesktopOrLaptop && !noHover && setIsHovering(true)}
    >
      <Link href={`/nft/${item.id}`} passHref>
        <SMediaLink isHovering={isHovering} notClickeable={notClickeable} title={item.title}>
          <Media src={ipfsMediaSrc} type={type} />
        </SMediaLink>
      </Link>
      {!noStatsChips && (
        <>
          {quantityAvailable > 1 && !noAvailableChip && !isHovering && (
            <SAvailableChip
              color="whiteBlur"
              size="small"
              text={`${quantityAvailable} of ${totalNft}`}
              variant="round"
            />
          )}
          {isSecret && !noSecretChip && !isHovering && (
            <SSecretChip color="whiteBlur" icon="secretCards" size="small" text="Secret" variant="round" />
          )}
          {priceWording && !noPriceChip && !isHovering && (
            <SPriceChip color="whiteBlur" size="small" text={priceWording} variant="round" />
          )}
        </>
      )}
      {!noHover && (
        <>
          <SLikeButtonContainer isHovering={isHovering}>
            <Button
              color={isLiked ? 'primary500' : 'neutral400'}
              disabled={!isUserLogged || likeLoading}
              icon="heart"
              isLoading={likeLoading}
              onClick={toggleLikeDislike}
              size="small"
              suppressHydrationWarning
              variant="contained"
            />
          </SLikeButtonContainer>
          <SInfosContainer isHovering={isHovering}>
            {isCreator && (
              <SCreatorContainer>
                <SCreatorPicture isHovering={isHovering}>
                  <Avatar
                    isPictureOnly
                    isVerified={creatorData.verified}
                    name={creatorData.name}
                    picture={creatorData.picture}
                    walletId={creatorData.walletId}
                  />
                </SCreatorPicture>
                <SCreatorName isHovering={isHovering}>
                  <Link href={`/${creatorData.walletId}`}>
                    <a>{creatorData.name || `Ternoa #${creator.slice(0, 5)}`}</a>
                  </Link>
                </SCreatorName>
              </SCreatorContainer>
            )}
            {priceWording && (
              <SPriceWrapper isHovering={isHovering}>
                <Chip color="whiteBlur" size="small" text={priceWording} variant="round" />
              </SPriceWrapper>
            )}
          </SInfosContainer>
        </>
      )}
    </SMediaContainer>
  )
}

const ySlideStyle = css<{ isHovering: boolean }>`
  animation: ${ySlide('40px', '0px')} 0.8s cubic-bezier(0.25, 1, 0.5, 1);
  animation-fill-mode: forwards;
`

const ySlideFadeStyle = css<{ isHovering: boolean }>`
  animation: ${ySlide('30px', '0px')} 0.8s cubic-bezier(0.25, 1, 0.5, 1), ${fadeIn} 0.8s cubic-bezier(0.25, 1, 0.5, 1);
  animation-fill-mode: forwards;
`

const yLongSlideFadeStyle = css<{ isHovering: boolean }>`
  animation: ${ySlide('20px', '0px')} 0.8s cubic-bezier(0.25, 1, 0.5, 1), ${fadeIn} 0.8s cubic-bezier(0.25, 1, 0.5, 1);
  animation-fill-mode: forwards;
`

const scaleInAnimation = css<{ isHovering: boolean }>`
  animation: ${scale('1', '1.08')} 0.8s cubic-bezier(0.25, 1, 0.5, 1);
  animation-fill-mode: forwards;
`

const scaleOutAnimation = css<{ isHovering: boolean }>`
  animation: ${scale('1.08', '1')} 0.8s cubic-bezier(0.25, 1, 0.5, 1);
  animation-fill-mode: forwards;
`

const shadowBackground = css<{ isHovering: boolean }>`
  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(180deg, rgba(57, 57, 57, 0) 50%, #030303 99%);
    ${({ isHovering }) => isHovering && yLongSlideFadeStyle}
  }
`

const SMediaContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  border-radius: 1.2rem;
  background: linear-gradient(180deg, #f29fff 0%, #878cff 100%);
  box-shadow: ${({ theme }) => theme.shadows.popupShadow};
  overflow: hidden;
  transform: translateZ(0);

  height: ${({ theme }) => theme.sizes.cardHeight.sm};
  width: ${({ theme }) => theme.sizes.cardWidth.sm};

  ${({ theme }) => theme.mediaQueries.xxl} {
    height: ${({ theme }) => theme.sizes.cardHeight.md};
    width: ${({ theme }) => theme.sizes.cardWidth.md};
  }
`

const SMediaLink = styled.a<{ isHovering: boolean; notClickeable: boolean }>`
  height: 100%;
  width: 100%;
  display: flex;
  position: relative;
  pointer-events: ${({ notClickeable }) => (notClickeable ? 'none' : 'auto')};

  ${({ isHovering }) => isHovering && shadowBackground}

  img, video {
    ${({ isHovering }) => (isHovering ? scaleInAnimation : scaleOutAnimation)}
  }
}
`

const SAvailableChip = styled(Chip)`
  position: absolute;
  top: 1.6rem;
  left: 1.6rem;
  box-shadow: ${({ theme }) => theme.shadows.popupShadow};
  z-index: 4;
`

const SSecretChip = styled(Chip)`
  position: absolute;
  top: 1.6rem;
  right: 1.6rem;
  box-shadow: ${({ theme }) => theme.shadows.popupShadow};
  z-index: 4;
`

const SPriceChip = styled(Chip)`
  position: absolute;
  width: fit-content;
  bottom: 2.4rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  box-shadow: ${({ theme }) => theme.shadows.popupShadow};
  z-index: 4;
`

const LikeButtonStyle = css<{ isHovering: boolean }>`
  align-self: flex-end;
  margin: 1.6rem;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 4;
  animation-fill-mode: forwards;
  animation: ${fadeIn} 0.8s cubic-bezier(0.25, 1, 0.5, 1);
`

const SLikeButtonContainer = styled.div<{ isHovering: boolean }>`
  display: ${({ isHovering }) => (isHovering ? 'block' : 'none')};
  ${({ isHovering }) => isHovering && LikeButtonStyle}
`

const SInfosContainer = styled.div<{ isHovering: boolean }>`
  display: ${({ isHovering }) => (isHovering ? 'flex' : 'none')};
  position: absolute;
  flex-direction: column;
  align-self: flex-end;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding-bottom: 2.4rem;
`

const SCreatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`

const SCreatorPicture = styled.div<{ isHovering: boolean }>`
  ${({ isHovering }) => isHovering && ySlideStyle}
`

const SCreatorName = styled.div<{ isHovering: boolean }>`
  color: ${({ theme }) => theme.colors.invertedContrast};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 1.2rem;
  margin-top: 1.2rem;

  ${({ isHovering }) => isHovering && ySlideFadeStyle}
`

const SPriceWrapper = styled.div<{ isHovering: boolean }>`
  margin-top: 0.8rem;

  ${({ isHovering }) => isHovering && yLongSlideFadeStyle}
`

export default NftCard
