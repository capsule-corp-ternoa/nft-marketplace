import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { reviewRequested as requestReview } from 'actions/user'
// import { padlock } from 'components/assets';
import { Banner as AvatarBanner } from 'components/base/Avatar'
import { Advice, Container, Form, FormSideLeft, FormSideRight, Title, Wrapper } from 'components/layout'
import Button, { AnchorButton } from 'components/ui/Button'
import Icon from 'components/ui/Icon'
import { Input, TextArea } from 'components/ui/Input'
import Modal from 'components/ui/Modal'
import { UserType } from 'interfaces'
import { MARKETPLACE_ID, NODE_API_URL } from 'utils/constant'
import { uploadIPFS } from 'utils/nftEncryption'
import { validateTwitter, validateUrl } from 'utils/strings'

import ImageBlock from './components/ImageBlock'
import ModalEdit from './components/ModalEdit'

interface Props {
  user: UserType
}

const Edit = ({ user }: Props) => {
  const router = useRouter()
  const { banner, bio, name, personalUrl, picture, reviewRequested, twitterName, twitterVerified, verified, walletId } =
    user

  const [isCertificationModalExpanded, setIsCertificationModalExpanded] = useState(false)
  const [isEditModalExpanded, setIsEditModalExpanded] = useState(false)
  const [isTwitterErrorModalExpanded, setIsTwitterErrorModalExpanded] = useState(false)
  const [data, setData] = useState({
    walletId,
    name,
    customUrl: user.customUrl,
    bio,
    // nickname: 'kandinsky', // TODO: use real artist name when specifications are defined
    personalUrl,
    twitterName,
    twitterVerified,
    picture,
    banner:
      banner ??
      'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80',
    reviewRequested,
    verified,
  })

  const isDataValid =
    data &&
    data.name &&
    data.name.length > 0 &&
    (!data.customUrl || data.customUrl === '' || validateUrl(data.customUrl)) &&
    (!data.personalUrl || data.personalUrl === '' || validateUrl(data.personalUrl)) &&
    (!data.twitterName || data.twitterName === '' || validateTwitter(data.twitterName))

  const isVerificationAvailable = twitterName && twitterName.length > 2 && !twitterVerified && MARKETPLACE_ID === '0'
  const verificationLabel = data.verified
    ? 'Certified'
    : data.reviewRequested
    ? 'Certification review pending'
    : 'Want to be certified ? Make a request'

  const handleChange = (value: any, field: string) => {
    setData({ ...data, [field]: value })
  }

  const handleCertificationReview = async () => {
    if (!data.verified || !data.reviewRequested) {
      try {
        const res = await requestReview(walletId)
        if (res) {
          setIsCertificationModalExpanded(true)
          setData({ ...data, reviewRequested: res.reviewRequested })
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  const fileToUrl = async (x: string, name: string) => {
    const blob = await (await fetch(x)).blob()
    const file = new File([blob], name)
    const resUpload = await uploadIPFS(file, undefined, undefined, true)
    const { hashOrURL: url } = resUpload
    if (url) {
      return url
    } else {
      throw new Error('Error while saving media')
    }
  }

  const handleUpdate = async () => {
    try {
      if (isDataValid) {
        //save picture and banner to pinata before sending api if exist and different
        const updateData = { ...data }
        if (data.banner?.slice(0, 4) === 'blob') updateData.banner = await fileToUrl(data.banner, 'banner')
        if (data.picture?.slice(0, 4) === 'blob') updateData.picture = await fileToUrl(data.picture, 'picture')
        setData(updateData)
        //show update modal
        setIsEditModalExpanded(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (router.query?.twitterValidated === 'false') {
      setIsTwitterErrorModalExpanded(true)
      router.query = {}
    }
  }, [router])

  return (
    <>
      <Container>
        <SBannerContainer>
          <SBannerIMG src={data.banner} draggable="false" alt="banner" />
          <SReturnButtonContainer>
            <AnchorButton
              color="invertedContrast"
              icon="arrowLeft"
              href="/profile"
              size="small"
              text="Return"
              variant="contained"
            />
          </SReturnButtonContainer>
        </SBannerContainer>
        <SWrapper>
          <SAvatarBannerContainer>
            <AvatarBanner
              bio={bio}
              isVerified={verified}
              name={name}
              picture={picture}
              twitterName={twitterName}
              walletId={walletId}
            />
            <AnchorButton
              color="neutral600"
              icon="arrowLeft"
              href="/profile"
              text="Return"
              size="small"
              variant="outlined"
            />
          </SAvatarBannerContainer>
          <STopContainer>
            <STitle>Edit your profile</STitle>
            <SCertifiedButtonCOntainer>
              <Button
                color="neutral600"
                icon={data.verified || data.reviewRequested ? 'badge' : undefined}
                noHover={data.verified || data.reviewRequested}
                onClick={handleCertificationReview}
                size="small"
                text={verificationLabel}
                variant="outlined"
              />
            </SCertifiedButtonCOntainer>
          </STopContainer>
          <SImagesMobileContainer>
            <SPictureBlock
              chipLabel="Upload avatar"
              description="We recommend an image
of at least 120x120. Gifs work too."
              id="uploadPicture"
              name={name}
              onChange={(file: File) => handleChange(URL.createObjectURL(file), 'picture')}
              picture={data.picture}
            />

            <SBannerBlock
              banner={data.banner}
              chipLabel="Upload banner"
              description="We recommend an image
          of at least 1800x280"
              id="uploadBanner"
              onChange={(file: File) => handleChange(URL.createObjectURL(file), 'banner')}
            />
          </SImagesMobileContainer>
          <Form>
            <FormSideLeft>
              <SInput
                isError={data.name === ''}
                label="Display name"
                onChange={(e) => handleChange(e.target.value, 'name')}
                placeholder="Your name"
                value={data.name || ''}
              />
              {/* TODO: herotag features added later when specifications are defined */}
              {/* {data.nickname && (
              <>
                <SInput
                  label="@artistname"
                  onChange={(e) => handleChange(e.target.value, 'nickname')}
                  placeholder="Your artist name"
                  tag="@"
                  value={data.nickname || ''}
                />
                <SNicknameAvailable>Available nickname !</SNicknameAvailable>
                <SInput
                  disabled
                  endIcon={padlock}
                  label="Your secret-nft.com URL"
                  onChange={(e) => handleChange(e.target.value, 'nickname')}
                  placeholder={`secret-nft.com/${data.nickname}`}
                />
              </>
            )} */}
              <STextArea
                label="Bio"
                placeholder="Tell something about you in a few words..."
                onChange={(e) => handleChange(e.target.value, 'bio')}
                value={data.bio}
              />
            </FormSideLeft>
            <FormSideRight>
              <SInput
                isError={
                  data.twitterName !== undefined &&
                  data.twitterName !== '' &&
                  data.twitterName !== null &&
                  !validateTwitter(data.twitterName)
                }
                label={
                  <STwitterInputLabel>
                    <STwitterLabel>Twitter username</STwitterLabel>
                    {data.twitterVerified ? (
                      <STwitterVerified>
                        <span>Verified</span>
                        <SIcon name="badge" />
                      </STwitterVerified>
                    ) : (
                      isVerificationAvailable && (
                        <STwitterVerificationLink
                          href={`${NODE_API_URL}/api/users/verifyTwitter/${data.walletId}`}
                          target="_self"
                          rel="noreferrer noopener"
                        >
                          Verify your Twitter account ({twitterName})
                        </STwitterVerificationLink>
                      )
                    )}
                  </STwitterInputLabel>
                }
                placeholder="Twitter @username"
                onChange={(e) => handleChange(e.target.value, 'twitterName')}
                value={data.twitterName || ''}
              />
              <SClaimTwitterContainer>
                {isVerificationAvailable && (
                  <STwitterNotVerified>
                    Verify your Twitter account in order to get the verification badge
                  </STwitterNotVerified>
                )}
              </SClaimTwitterContainer>
              <SInput
                isError={
                  data.personalUrl !== undefined &&
                  data.personalUrl !== '' &&
                  data.personalUrl !== null &&
                  !validateUrl(data.personalUrl)
                }
                label="Personal site or portfolio"
                placeholder="https://"
                onChange={(e) => handleChange(e.target.value, 'personalUrl')}
                value={data.personalUrl || ''}
              />
              <SImagesContainer>
                <SPictureBlock
                  chipLabel="Upload avatar"
                  description="We recommend an image
of at least 120x120. Gifs work too."
                  id="uploadPicture"
                  name={name}
                  onChange={(file: File) => handleChange(URL.createObjectURL(file), 'picture')}
                  picture={data.picture}
                />

                <SBannerBlock
                  banner={data.banner}
                  chipLabel="Upload banner"
                  description="We recommend an image
          of at least 1800x280"
                  id="uploadBanner"
                  onChange={(file: File) => handleChange(URL.createObjectURL(file), 'banner')}
                />
              </SImagesContainer>
            </FormSideRight>
          </Form>
          <SAdvice>
            To update your settings you should sign message through your wallet. Click &apos;Update profile&apos; then
            sign the message.
          </SAdvice>
          <SButton
            color="primary500"
            disabled={!isDataValid}
            onClick={() => handleUpdate()}
            text="Update  your profile"
          />
          {isEditModalExpanded && <ModalEdit setExpanded={setIsEditModalExpanded} data={data} />}
          {isTwitterErrorModalExpanded && (
            <Modal
              setExpanded={setIsTwitterErrorModalExpanded}
              subtitle="Twitter validation failed, please check your information and try again"
              title="Twitter validation"
            >
              <SModalButton
                color="invertedContrast"
                onClick={() => setIsTwitterErrorModalExpanded(false)}
                size="medium"
                text="Back to profile edit"
                variant="contained"
              />
            </Modal>
          )}
        </SWrapper>
      </Container>
      {isCertificationModalExpanded && (
        <Modal
          setExpanded={setIsCertificationModalExpanded}
          subtitle="Your profile is under review. After review it will be certified."
          title="Review requested"
        >
          <SModalButton
            color="invertedContrast"
            onClick={() => setIsCertificationModalExpanded(false)}
            size="medium"
            text="Continue"
            variant="contained"
          />
        </Modal>
      )}
    </>
  )
}

const SAvatarBannerContainer = styled.div`
  display: none;

  ${({ theme }) => theme.mediaQueries.md} {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0;
  }
`

const STopContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    margin-top: 8rem;
    justify-content: space-between;
  }
`

const STitle = styled(Title)`
  ${({ theme }) => theme.mediaQueries.md} {
    align-self: flex-start;
    font-size: 3.2rem;
  }
`

const SCertifiedButtonCOntainer = styled.div`
  margin-top: 1.6rem;

  svg {
    width: 2.4rem;
    height: 2.4rem;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 0;
  }
`

const SWrapper = styled(Wrapper)`
  align-items: center;
`

const SBannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 22rem;
  position: relative;
  justify-content: flex-end;

  ${({ theme }) => theme.mediaQueries.xxl} {
    height: 28rem;
  }
`

const SBannerIMG = styled.img`
  position: absolute;
  object-fit: cover;
  width: 100%;
  height: 100%;
`

const SReturnButtonContainer = styled.div`
  margin: 0 auto -1.8rem;
  z-index: 10;

  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
  }
`

const SPictureBlock = styled(ImageBlock)`
  margin-top: 3.2rem;
`

const SBannerBlock = styled(ImageBlock)`
  margin: 5.6rem 0 2.4rem;
`

const SInput = styled(Input)`
  margin-top: 3.2rem;
  justify-content: space-between;

  > label {
    &:after {
      width: 1.6rem;
    }
  }
`

const STwitterInputLabel = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`

const STwitterLabel = styled.span`
  flex: 1 0 auto;
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 2rem;
`

const STextArea = styled(TextArea)`
  margin-top: 3.2rem;

  ${({ theme }) => theme.mediaQueries.md} {
    flex: 1;
  }
`

// const SNicknameAvailable = styled.span`
//   align-self: flex-start;
//   color: ${({ theme }) => theme.colors.success500};
//   font-size: 1.2rem;
//   margin: 1.2rem 0 0 1.6rem;
// `;

const SClaimTwitterContainer = styled.div`
  align-self: flex-start;
  color: ${({ theme }) => theme.colors.primary500};
  font-size: 1.2rem;
  margin: 1.2rem 0 0;
`

const STwitterNotVerified = styled.div`
  color: ${({ theme }) => theme.colors.neutral600};
`

const STwitterVerified = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary500};
  font-size: 1.2rem;
  margin: 0.4rem 0 0 1.6rem;
  text-align: left;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin: 0 0 0 1.6rem;
    text-align: right;
  }
`

const STwitterVerificationLink = styled.a`
  color: ${({ theme }) => theme.colors.primary500};
  font-size: 1.2rem;
  margin: 0.4rem 0 0;
  text-align: left;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin: 0 0 0 1.6rem;
    text-align: right;
  }
`

const SIcon = styled(Icon)`
  width: 1.6rem;
  height: 1.6rem;
  margin-left: 0.2rem;
`

const SImagesMobileContainer = styled.div`
  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
  }
`

const SImagesContainer = styled.div`
  display: none;

  ${({ theme }) => theme.mediaQueries.md} {
    display: inline-block;
  }

  ${({ theme }) => theme.mediaQueries.xxl} {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`

const SAdvice = styled(Advice)`
  margin: 4rem auto 0;
  max-width: 80%;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 8rem 0 0;
    max-width: 40%;
    align-self: flex-start;
    text-align: left;
  }
`

const SButton = styled(Button)`
  margin: 4.8rem 0;

  ${({ theme }) => theme.mediaQueries.lg} {
    align-self: flex-start;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    margin: 4.8rem 0 9.6rem;
  }
`

const SModalButton = styled(Button)`
  &:hover {
    background: ${({ theme }) => theme.colors.invertedContrast};
    color: ${({ theme }) => theme.colors.contrast};
  }
`

export default Edit
