import React from 'react'
import styled from 'styled-components'
import Eye from 'components/assets/eye'
import { NftCardWithEffects, NftUpload } from 'components/base/NftPreview'
import { updateFile } from 'components/base/NftPreview/components/NftUpload'
import { HiddenInput, HiddenShell, Subtitle } from 'components/layout'
import Icon from 'components/ui/Icon'
import Radio from 'components/ui/Radio'
import Select from 'components/ui/Select'
import {
  NftEffectType,
  NFT_EFFECT_BLUR,
  NFT_EFFECT_DEFAULT,
  NFT_EFFECT_PROTECT,
  NFT_EFFECT_SECRET,
  NFT_FILE_TYPE_GIF,
  NFT_FILE_TYPE_VIDEO,
} from 'interfaces'
import { useApp } from 'redux/hooks'

interface Props {
  blurValue: number
  className?: string
  coverNFT: File | null
  effect: NftEffectType
  originalNFT: File | null
  setBlurValue: (n: number) => void
  setCoverNFT: (f: File | null) => void
  setEffect: (effect: NftEffectType) => void
  setError: (err: string) => void
  setIsLoading: (b: boolean) => void
  setOriginalNFT: (f: File | null) => void
}

const NFT_EFFECTS_ORDERED: NftEffectType[] = [
  NFT_EFFECT_DEFAULT,
  NFT_EFFECT_PROTECT,
  NFT_EFFECT_SECRET,
  NFT_EFFECT_BLUR,
]

const NftPreview = ({
  blurValue,
  className,
  coverNFT,
  effect,
  originalNFT,
  setBlurValue,
  setCoverNFT,
  setEffect,
  setError,
  setOriginalNFT,
}: Props) => {
  const { isRN } = useApp()

  const handleAllowedEffect = (file: File, effect: NftEffectType) => {
    switch (effect) {
      case NFT_EFFECT_BLUR:
      case NFT_EFFECT_PROTECT:
        return !file.type.includes(NFT_FILE_TYPE_VIDEO) && file.type !== NFT_FILE_TYPE_GIF
      default:
        return true
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateFile(
      event,
      setError,
      (file: File) => {
        setOriginalNFT(file)
        setEffect(NFT_EFFECT_DEFAULT)
      },
      isRN
    )
  }

  if (originalNFT === null) {
    return (
      <NftUpload
        className={className}
        content="Click here to upload your file."
        inputId="uploadNft"
        note={`JPEG, JPG, PNG, GIF ${!isRN ? ', MP4 or MOV' : ''}. Max 30mb.`}
        onChange={handleFileUpload}
      />
    )
  }

  return (
    <div className={className}>
      <SHeader>
        <Subtitle>
          <SEyeIcon />
          NFT Preview
        </Subtitle>
        {originalNFT.name && (
          <SReuploadWrapper>
            <NftUpload
              content={
                <>
                  <SUploadIcon name="upload" />
                  <span>{originalNFT.name}</span>
                </>
              }
              inputId="reUploadNft"
              isMinimal
              onChange={handleFileUpload}
            />
          </SReuploadWrapper>
        )}
      </SHeader>
      {effect !== undefined && (
        <SWrapper>
          <SMobileCardWrapper>
            <NftCardWithEffects
              blurValue={blurValue}
              coverNFT={coverNFT}
              effect={effect}
              originalNFT={originalNFT}
              setBlurValue={setBlurValue}
              setCoverNFT={setCoverNFT}
              setEffect={setEffect}
              setError={setError}
            />
          </SMobileCardWrapper>
          <SSelect color="primary500" text={effect}>
            {(setSelectExpanded) => (
              <>
                {NFT_EFFECTS_ORDERED.filter((effectType) => handleAllowedEffect(originalNFT, effectType)).map(
                  (effectType, id) =>
                    effectType !== effect && (
                      <li
                        key={id}
                        onClick={() => {
                          setSelectExpanded(false)
                          setEffect(effectType)
                        }}
                      >
                        {effectType}
                      </li>
                    )
                )}
              </>
            )}
          </SSelect>
          <SSeparator />
        </SWrapper>
      )}
      <SFieldset>
        {NFT_EFFECTS_ORDERED.filter((effectType) => handleAllowedEffect(originalNFT, effectType)).map((effectType) => (
          <SLabelWrapper key={effectType}>
            <SLabel htmlFor={`NftType_${effectType}`} isSelected={effect === effectType}>
              <SCardWrapper isSelected={effect === effectType}>
                <NftCardWithEffects
                  blurValue={blurValue}
                  coverNFT={coverNFT}
                  effect={effectType}
                  originalNFT={originalNFT}
                  setBlurValue={setBlurValue}
                  setCoverNFT={setCoverNFT}
                  setEffect={setEffect}
                  setError={setError}
                />
              </SCardWrapper>

              <SRadio checked={effect === effectType} label={effectType} onChange={() => setEffect(effectType)} />
            </SLabel>

            <HiddenShell>
              <HiddenInput
                type="radio"
                id={`NftType_${effectType}`}
                name={`NftType_${effectType}`}
                onClick={() => setEffect(effectType)}
                value={effectType}
              />
            </HiddenShell>
          </SLabelWrapper>
        ))}
      </SFieldset>
    </div>
  )
}

const SUploadIcon = styled(Icon)`
  height: 2rem;
  width: 2rem;
  margin-right: 0.8rem;
  position: relative;
  top: 0.6rem;

  path {
    fill: ${({ theme }) => theme.colors.primary500};
  }
`

const SHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0 2.4rem;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    margin-top: 4rem;
    justify-content: start;
  }
`

const SEyeIcon = styled(Eye)`
  width: 2.4rem;
  margin-right: 1rem;
  fill: black;
`

const SReuploadWrapper = styled.div`
  margin: 1.6rem 0 0;

  ${({ theme }) => theme.mediaQueries.md} {
    margin: 0 0 0 2.4rem;
  }
`

const SWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
  }
`

const SMobileCardWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  filter: drop-shadow(0px 0px 10.4276px rgba(0, 0, 0, 0.25));
`

const SSelect = styled(Select)`
  margin-top: 2.4rem;
`

const SSeparator = styled.div`
  width: 15rem;
  border-bottom: ${({ theme }) => `2px solid ${theme.colors.neutral600}`};
  margin-top: 3.2rem;
`

const SFieldset = styled.fieldset`
  display: none;

  ${({ theme }) => theme.mediaQueries.md} {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.2rem;
    border: none;
    padding: 0;
  }
`

const SLabelWrapper = styled.label<{ isSelected?: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.md} {
    flex: 1 1 0;
    max-width: 280px;
  }
`

const SLabel = styled.label<{ isSelected?: boolean }>`
  width: 100%;
  height: auto;
  background: transparent;
  border: 3px solid rgb(0, 0, 0, 0);
  border-radius: 2rem;
  padding: 0.8rem 0.8rem 2.4rem;

  &:hover {
    border: 3px dashed;
    border-color: ${({ theme }) => theme.colors.primary500};
  }

  ${({ isSelected, theme }) =>
    isSelected &&
    `
    border: 3px dashed;
    border-color: ${theme.colors.primary500};
  `}
`

const SCardWrapper = styled.div<{ isSelected: boolean }>`
  width: 100%;
  height: auto;
  opacity: ${({ isSelected }) => (isSelected ? 1 : 0.4)};
`

const SRadio = styled(Radio)`
  margin-top: 3.2rem;
`

export default React.memo(NftPreview)
