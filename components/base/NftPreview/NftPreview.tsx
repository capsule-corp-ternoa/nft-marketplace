import React from 'react'
import styled from 'styled-components'
import Eye from 'components/assets/eye'
import { NftCardWithEffects, NftUpload } from 'components/base/NftPreview'
import { updateFile } from 'components/base/NftPreview/components/NftUpload'
import { HiddenInput, HiddenShell, Subtitle } from 'components/layout'
import Chip from 'components/ui/Chip'
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
  selectedEffect: NftEffectType
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

const NFT_EFFECTS_DISABLED: NftEffectType[] = [NFT_EFFECT_PROTECT, NFT_EFFECT_SECRET, NFT_EFFECT_BLUR]

const NftPreview = ({
  blurValue,
  className,
  coverNFT,
  selectedEffect,
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
      {selectedEffect !== undefined && (
        <SWrapper>
          <SMobileCardWrapper>
            <NftCardWithEffects
              blurValue={blurValue}
              coverNFT={coverNFT}
              effect={selectedEffect}
              originalNFT={originalNFT}
              setBlurValue={setBlurValue}
              setCoverNFT={setCoverNFT}
              setEffect={setEffect}
              setError={setError}
            />
          </SMobileCardWrapper>
          <SSelect color="primary500" text={selectedEffect}>
            {(setSelectExpanded) => (
              <>
                {NFT_EFFECTS_ORDERED.filter((effect) => handleAllowedEffect(originalNFT, effect)).map((effect, id) => {
                  const isEffectDisabled = NFT_EFFECTS_DISABLED.includes(effect)
                  if (effect === selectedEffect) return null

                  return (
                    <SItemContainer
                      key={id}
                      disabled={isEffectDisabled}
                      onClick={() => {
                        if (isEffectDisabled) return

                        setSelectExpanded(false)
                        setEffect(effect)
                      }}
                    >
                      <SItemWrapper>
                        {effect}
                        {isEffectDisabled && (
                          <Chip color="primary200" size="small" text="Coming soon" variant="rectangle" />
                        )}
                      </SItemWrapper>
                    </SItemContainer>
                  )
                })}
              </>
            )}
          </SSelect>
          <SSeparator />
        </SWrapper>
      )}
      <SFieldset>
        {NFT_EFFECTS_ORDERED.filter((effect) => handleAllowedEffect(originalNFT, effect)).map((effect) => {
          const isEffectDisabled = NFT_EFFECTS_DISABLED.includes(effect)
          return (
            <SLabelWrapper key={effect}>
              <SLabel
                htmlFor={isEffectDisabled ? undefined : `NftType_${effect}`}
                isSelected={selectedEffect === effect}
                disabled={isEffectDisabled}
              >
                <SCardContainer>
                  <SCardWrapper isSelected={selectedEffect === effect}>
                    <NftCardWithEffects
                      blurValue={blurValue}
                      coverNFT={coverNFT}
                      disabled={isEffectDisabled}
                      effect={effect}
                      originalNFT={originalNFT}
                      setBlurValue={setBlurValue}
                      setCoverNFT={setCoverNFT}
                      setEffect={setEffect}
                      setError={setError}
                    />
                  </SCardWrapper>
                  {isEffectDisabled && (
                    <SDisclaimerWrapper>
                      <Chip color="primary200" size="small" text="Advisory" variant="round" />
                      <SDisclaimerLabel>
                        Some features are temporarily unavailable due to the mainnet changeover. They will be active
                        soon.
                      </SDisclaimerLabel>
                    </SDisclaimerWrapper>
                  )}
                </SCardContainer>

                <SRadioWrapper>
                  {isEffectDisabled ? (
                    <Chip color="primary200" size="medium" text="Coming soon" variant="rectangle" />
                  ) : (
                    <Radio checked={selectedEffect === effect} label={effect} onChange={() => setEffect(effect)} />
                  )}
                </SRadioWrapper>
              </SLabel>

              <HiddenShell>
                <HiddenInput
                  type="radio"
                  id={`NftType_${effect}`}
                  name={`NftType_${effect}`}
                  onClick={() => setEffect(effect)}
                  value={effect}
                />
              </HiddenShell>
            </SLabelWrapper>
          )
        })}
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

const SItemContainer = styled.li<{ disabled?: boolean }>`
  color: ${({ disabled, theme }) => (disabled ? 'inherit' : `${theme.colors.contrast} !important`)};
`

const SItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const SCardContainer = styled.div`
  position: relative;
  width: 100%;
  height: ${({ theme }) => theme.sizes.cardHeight.md};
  display: flex;
  justify-content: center;
  align-items: center;
`

const SCardWrapper = styled.div<{ isSelected: boolean }>`
  width: 100%;
  height: auto;
  opacity: ${({ isSelected }) => (isSelected ? 1 : 0.4)};
  position: absolute;
`

const SDisclaimerWrapper = styled.div`
  width: ${({ theme }) => theme.sizes.cardWidth.sm};
  height: auto;
  background: ${({ theme }) => theme.colors.invertedContrast};
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 1.6rem;
  padding: 2.4rem 1.6rem;
  z-index: 100;

  ${({ theme }) => theme.mediaQueries.md} {
    width: ${({ theme }) => theme.sizes.cardWidth.xs};
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    width: ${({ theme }) => theme.sizes.cardWidth.sm};
  }
`

const SDisclaimerLabel = styled.span`
  color: ${({ theme }) => theme.colors.primary500};
  font-size: 1.2rem;
  margin-top: 1.6rem;
  text-align: center;
`

const SRadioWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3.2rem;
`

const SLabel = styled.label<{ disabled?: boolean; isSelected?: boolean }>`
  width: 100%;
  height: auto;
  background: transparent;
  border: 3px solid rgb(0, 0, 0, 0);
  border-radius: 2rem;
  padding: 0.8rem 0.8rem 2.4rem;

  &:hover {
    border: 3px dashed;
    border-color: ${({ disabled, theme }) => (disabled ? theme.colors.neutral300 : theme.colors.primary500)};

    ${SCardWrapper} {
      ${({ disabled }) =>
        disabled &&
        `
          filter: blur(2px);
          backdrop-filter: blur(2px);
          -webkit-backdrop-filter: blur(2px);
      `}
    }

    ${SDisclaimerWrapper} {
      display: flex;
    }
  }

  ${({ isSelected, theme }) =>
    isSelected &&
    `
    border: 3px dashed;
    border-color: ${theme.colors.primary500};
  `}
`

export default React.memo(NftPreview)
