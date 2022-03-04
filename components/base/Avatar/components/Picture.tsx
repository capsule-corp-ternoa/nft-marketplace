import React from 'react'
import styled, { css } from 'styled-components'
import gradient from 'random-gradient'
import Image from 'next/image'

import Icon from 'components/ui/Icon'
import { shimmer, toBase64 } from 'utils/imageProcessing/image'

import { AVATAR_VARIANT_TYPE } from '../interfaces'
import { getPictureSize, getPictureFontSize } from '../utils'

interface Props {
  className?: string
  isBanner?: boolean
  isTooltip?: boolean
  isVerified?: boolean
  name?: string
  picture?: string
  variant?: AVATAR_VARIANT_TYPE
}

const Picture = ({ className, isTooltip = false, isVerified, name = 'Ternoa', picture, variant }: Props) => (
  <SPictureContainer className={className} isTooltip={isTooltip}>
    <SPictureWrapper variant={variant}>
      {isVerified && <SIcon name="badge" />}
      {picture ? (
        <SImageWrapper>
          <SImage
            draggable="false"
            src={picture}
            alt={name}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(120, 120))}`}
            layout="fill"
            quality={50}
          />
        </SImageWrapper>
      ) : (
        <SInitials name={name}>
          <SLetter variant={variant}>{name?.charAt(0) ?? 'T'}</SLetter>
        </SInitials>
      )}
    </SPictureWrapper>
    <SPopoverName>{name}</SPopoverName>
  </SPictureContainer>
)

const SPictureContainer = styled.div<{ isTooltip?: boolean }>`
  position: relative;

  > span {
    display: none;
  }

  ${({ isTooltip }) =>
    isTooltip &&
    `
    &:hover {
      > span {
        display: block;
      }
    }
  `}
`

const SPictureWrapper = styled.div<{ variant?: AVATAR_VARIANT_TYPE }>`
  width: ${({ variant }) => getPictureSize(variant)};
  height: ${({ variant }) => getPictureSize(variant)};
  position: relative;
  border-radius: 50%;
  box-shadow: ${({ theme }) => theme.shadows.popupShadow};
  z-index: 5;
`

const SIcon = styled(Icon)`
  position: absolute;
  width: 40%;
  bottom: 3%;
  right: -3%;
  z-index: 10;
`

const SImageWrapper = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 50% !important;
  overflow: hidden;
  position: relative;
`

const ImageStyle = css`
  object-fit: cover;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: absolute;
  transition: border 0.05s ease-out;

  &:hover {
    border: 3px solid !important;
    border-color: ${({ theme }) => theme.colors.primary500} !important;
  }
`

const SImage = styled(Image)`
  ${ImageStyle}
`

const SInitials = styled.div<{ name: string }>`
  ${ImageStyle}

  background: ${({ name }) => gradient(name)};
`

const SLetter = styled.div<{ variant?: AVATAR_VARIANT_TYPE }>`
  color: ${({ theme }) => theme.colors.invertedContrast};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ variant }) => getPictureFontSize(variant)};
  text-transform: uppercase;
`

const SPopoverName = styled.span`
  position: absolute;
  background: ${({ theme }) => theme.colors.contrast};
  border-radius: 0.8rem;
  box-shadow: ${({ theme }) => theme.shadows.popupShadow};
  color: ${({ theme }) => theme.colors.invertedContrast};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 1.4rem;
  max-width: 32rem;
  padding: 0.8rem 1.6rem;
  bottom: 110%;
  left: 50%;
  text-align: center;
  transform: translateX(calc(-50%));
  z-index: 10;
`

export default Picture
