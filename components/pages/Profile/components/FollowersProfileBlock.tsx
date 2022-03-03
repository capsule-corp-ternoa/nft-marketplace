import React from 'react'
import Switch from 'react-switch'
import styled from 'styled-components'

import { FollowAvatar } from 'components/base/Avatar'
import NoNFTComponent from 'components/base/NoNFTComponent'
import Button from 'components/ui/Button'
import { Loader } from 'components/ui/Icon'
import { UserType } from 'interfaces'
import theme from 'style/theme'
import { FOLLOW_ACTION_TYPE } from 'utils/profile/constants'

interface Props {
  handleFollow?: (action: FOLLOW_ACTION_TYPE, profile?: UserType) => void
  isFilterVerified: boolean
  isLoading: boolean
  isLoadMore: boolean
  isLoadMoreLoading: boolean
  loadMore: () => void
  noContentBody?: string
  noContentTitle: string
  setIsFilterVerified: (b: boolean) => void
  updateKeywordSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
  users: UserType[]
}

const FollowersProfileBlock = ({
  handleFollow,
  isFilterVerified,
  isLoading,
  isLoadMore,
  isLoadMoreLoading,
  loadMore,
  noContentBody,
  noContentTitle,
  setIsFilterVerified,
  updateKeywordSearch,
  users,
}: Props) => {
  if (isLoading) {
    return (
      <SNoNFTContainer>
        <SLoader color="contrast" useLottie />
      </SNoNFTContainer>
    )
  }

  if (users === undefined || users.length < 1) {
    return (
      <SNoNFTContainer>
        <NoNFTComponent body={noContentBody} title={noContentTitle} />
      </SNoNFTContainer>
    )
  }

  return (
    <>
      <SSearchContainer>
        <SSearchLabel>
          <SSearchInput type="search" onChange={updateKeywordSearch} placeholder="Search" />
        </SSearchLabel>
        <SToggle>
          <SCertifiedLabel>Verified only</SCertifiedLabel>
          <label>
            <Switch
              checked={isFilterVerified}
              onChange={() => setIsFilterVerified(!isFilterVerified)}
              offColor={theme.colors.contrast}
              onColor={theme.colors.primary500}
              uncheckedIcon={false}
              checkedIcon={false}
              width={46}
              handleDiameter={23}
            />
          </label>
        </SToggle>
      </SSearchContainer>

      <>
        <SFollowersContainer>
          {users.map(({ _id, name, picture, verified, walletId }: UserType) => (
            <FollowAvatar
              key={_id}
              handleFollow={handleFollow}
              isVerified={verified}
              name={name}
              picture={picture}
              profileWalletId={walletId}
            />
          ))}
        </SFollowersContainer>
        {isLoadMore && (
          <SLoadButtonWrapper>
            <Button
              color="contrast"
              disabled={isLoadMoreLoading}
              isLoading={isLoadMoreLoading}
              onClick={loadMore}
              size="medium"
              text={isLoadMoreLoading ? 'Loading...' : 'Load more'}
              variant="outlined"
            />
          </SLoadButtonWrapper>
        )}
      </>
    </>
  )
}

const SLoader = styled(Loader)`
  margin: 8rem auto;
`

const SNoNFTContainer = styled.div`
  display: flex;
  align-items; center;
  margin-top: 8rem;
`

const SLoadButtonWrapper = styled.div`
  button {
    margin: 1.6rem auto 3.2rem;
  }
`

const SSearchContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5.6rem;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    justify-content: flex-start;
  }
`

const SSearchLabel = styled.label`
  position: relative;

  :before {
    content: '';
    position: absolute;
    left: 2.4rem;
    top: 0;
    bottom: 0;
    width: 2rem;
    background: url("data:image/svg+xml,%3Csvg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.3 10.8C8.78528 10.8 10.8 8.78528 10.8 6.3C10.8 3.81472 8.78528 1.8 6.3 1.8C3.81472 1.8 1.8 3.81472 1.8 6.3C1.8 8.78528 3.81472 10.8 6.3 10.8ZM6.3 12.6C9.77939 12.6 12.6 9.77939 12.6 6.3C12.6 2.82061 9.77939 0 6.3 0C2.82061 0 0 2.82061 0 6.3C0 9.77939 2.82061 12.6 6.3 12.6Z' fill='%23686464'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M14.3712 14.3712C14.024 14.7185 13.461 14.7185 13.1137 14.3712L9.62877 10.8863C9.28151 10.539 9.28151 9.97603 9.62877 9.62877C9.97603 9.28151 10.539 9.28151 10.8863 9.62877L14.3712 13.1137C14.7185 13.461 14.7185 14.024 14.3712 14.3712Z' fill='%23686464'/%3E%3C/svg%3E%0A")
      center / contain no-repeat;
  }
`

const SSearchInput = styled.input`
  width: 28rem;
  background: rgba(0, 0, 0, 0.05);
  border: none;
  border-radius: 3.2rem;
  font-family: ${({ theme }) => theme.fonts.light};
  font-size: 1.6rem;
  outline: none;
  padding: 1.2rem 5.6rem;

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 32rem;
  }
`

const SToggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.2rem 0 0;

  ${({ theme }) => theme.mediaQueries.md} {
    margin: 0 0 0 1.6rem;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0 0 0 2.4rem;
  }
`

const SCertifiedLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.neutral600};
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  text-align: right;
  margin-right: 0.8rem;
`

const SFollowersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  width: 100%;
  gap: 3.2rem;
  max-width: 40rem;
  margin: 5.6rem auto;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(2, 1fr);
    max-width: none;
    gap: 2.4rem 4.8rem;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: repeat(3, 1fr);
    gap: 4.8rem;
    margin-top: 8.8rem;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    grid-template-columns: repeat(4, 1fr);
  }
`

export default FollowersProfileBlock
