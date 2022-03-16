import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FixedSizeList as List, ListOnItemsRenderedProps } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { UserType, NftType, NFTTransferType, CustomResponse } from 'interfaces'
import { computeCaps, formatDate } from 'utils/strings'
import Link from 'next/link'
import { middleEllipsis } from '../../../../utils/strings'
import { getUsers } from 'actions/user'
import Avatar, { AVATAR_VARIANT_BADGE, AVATAR_VARIANT_TRANSACTION } from 'components/base/Avatar'
import Button, { AnchorButton } from 'components/ui/Button'
import Chip from 'components/ui/Chip'
import { EXPLORER_URL, MARKETPLACE_ID } from 'utils/constant'
import { Loader } from 'components/ui/Icon'
import { getRandomNFTFromArray } from 'utils/functions'
import { getHistory } from 'actions/nft'
import { useApp } from 'redux/hooks'

const ITEM_SIZE = 88
const GUTTER_SIZE = 5

const tabs = ['infos', 'owners', 'history', 'bid']

export interface DetailsProps {
  NFT: NftType
  seriesData: NftType[]
  setNftToBuy: (NFT: NftType) => void
  setIsModalCheckoutExpanded: (b: boolean) => void
  isUserFromDappQR: boolean
  isVR: boolean
  canUserBuyAgain: boolean
  resetTabId?: boolean
}

const Details: React.FC<DetailsProps> = ({
  NFT,
  seriesData,
  setNftToBuy,
  setIsModalCheckoutExpanded,
  isUserFromDappQR,
  isVR,
  canUserBuyAgain,
  resetTabId,
}) => {
  const { user } = useApp()
  const [currentTab, setCurrentTab] = useState(tabs[0])
  const [usersData, setUsersData] = useState({} as any)
  const [serieDataGrouped, setSerieDataGrouped] = useState([] as NftType[])
  const [serieDataCount, setSerieDataCount] = useState({} as any)
  const [historyData, setHistoryData] = useState<NFTTransferType[]>([])
  const [historyLoading, setHistoryLoading] = useState(false)

  useEffect(() => {
    let shouldUpdate = true
    const loadHistoryData = async () => {
      try {
        setHistoryLoading(true)
        const data: CustomResponse<NFTTransferType> = await getHistory(NFT.id, NFT.serieId, true)
        if (!data || !data.data) throw new Error('No data found')
        if (shouldUpdate) setHistoryData(data.data)
        if (shouldUpdate) setHistoryLoading(false)
      } catch (err) {
        if (shouldUpdate) setHistoryLoading(false)
        console.log(err)
      }
    }

    loadHistoryData()
    return () => {
      shouldUpdate = false
    }
  }, [NFT.id, NFT.serieId])

  useEffect(() => {
    const serieDataGroupedArray = [] as NftType[]
    const serieDataCountObject = {} as any
    seriesData.forEach((x) => {
      // Compute rows to display && count number of listed / unlisted for each row
      const key = `${x.owner}-${x.listed}-${x.price}-${x.marketplaceId}-${x.isCapsule}`
      if (!serieDataCountObject[key]) {
        serieDataCountObject[key] = [x.id]
        serieDataGroupedArray.push({
          id: x.id,
          listed: x.listed,
          marketplaceId: x.marketplaceId,
          owner: x.owner,
          price: x.price,
          serieId: x.serieId,
          isCapsule: x.isCapsule,
        } as NftType)
      } else {
        serieDataCountObject[key].push(x.id)
      }
    })
    setSerieDataGrouped(serieDataGroupedArray)
    setSerieDataCount(serieDataCountObject)
  }, [seriesData])

  const handleCustomBuy = (NFT: NftType) => {
    const key = `${NFT.owner}-${NFT.listed}-${NFT.price}-${NFT.marketplaceId}-${NFT.isCapsule}`
    const NFTToBuy = seriesData.find((x) => x.id === getRandomNFTFromArray(serieDataCount[key])) || NFT
    setNftToBuy(NFTToBuy)
    setIsModalCheckoutExpanded(true)
  }

  const onRowRenderedOwners = ({ overscanStartIndex, overscanStopIndex }: ListOnItemsRenderedProps) => {
    const ownersToLoad = []
    if (serieDataGrouped.length > 0) {
      for (let i = overscanStartIndex; i <= overscanStopIndex; i++) {
        if (serieDataGrouped[i] && !usersData[serieDataGrouped[i].owner]) {
          ownersToLoad.push(serieDataGrouped[i].owner)
        }
      }
      if (ownersToLoad.length > 0) {
        loadDisplayedUsers(ownersToLoad)
      }
    }
  }

  const onRowRenderedHistory = ({ overscanStartIndex, overscanStopIndex }: ListOnItemsRenderedProps) => {
    const usersToLoad = []
    if (historyData.length > 0) {
      for (let i = overscanStartIndex; i <= overscanStopIndex; i++) {
        if (historyData[i]) {
          if (historyData[i].from.startsWith('5') && !usersData[historyData[i].from]) {
            usersToLoad.push(historyData[i].from)
          }
          if (historyData[i].to.startsWith('5') && !usersData[historyData[i].to]) {
            usersToLoad.push(historyData[i].to)
          }
        }
      }
      if (usersToLoad.length > 0) {
        loadDisplayedUsers(usersToLoad)
      }
    }
  }

  const loadDisplayedUsers = async (walletIds: string[]) => {
    try {
      const users = await getUsers(walletIds)
      const usersObject = {} as any
      if (users && users.data.length > 0) {
        users.data.forEach((u) => {
          usersObject[u.walletId] = u
        })
        setUsersData({ ...usersData, ...usersObject })
      }
    } catch (err) {
      console.log(err)
    }
  }

  const ownerRowData = ({ index, style }: { index: number; style: React.CSSProperties | undefined }) => {
    const NFTRow = serieDataGrouped && serieDataGrouped.length > 0 ? serieDataGrouped[index] : null
    const NFTRowId = NFTRow ? NFTRow.id : null
    const NFTRowOwner = NFTRow ? NFTRow.owner : ''
    const NFTRowPrice = NFTRow ? NFTRow.price : ''
    const NFTRowListed = NFTRow ? NFTRow.listed : ''
    const NFTRowMarketplaceId = NFTRow ? NFTRow.marketplaceId : ''
    const ownerData = (usersData[NFTRowOwner] ?? {}) as UserType
    const { name, picture, twitterName, verified } = ownerData

    const key = `${NFTRowOwner}-${NFTRowListed}-${NFTRowPrice}-${NFTRowMarketplaceId}-${NFTRow?.isCapsule}`
    const NFTRowTypeWording = (NFTRow?.isCapsule ? 'capsule' : 'edition') + (serieDataCount[key].length > 1 ? 's' : '')
    const userCanBuy =
      (!isVR || (isVR && isUserFromDappQR && canUserBuyAgain)) &&
      (user
        ? user.capsAmount &&
          NFTRow &&
          NFTRowListed === 1 &&
          NFTRowPrice &&
          NFTRowPrice !== '' &&
          Number(user.capsAmount) >= Number(NFTRowPrice) &&
          user.walletId !== NFTRowOwner &&
          NFTRowMarketplaceId === MARKETPLACE_ID
        : NFTRowListed === 1 && NFTRowMarketplaceId === MARKETPLACE_ID)

    return (
      <SRows key={NFTRowId} style={{ ...style, height: (style?.height as any) - GUTTER_SIZE }}>
        <SRowWrapper>
          <SStatusChipMobileWrapper>
            <Chip color="primary200" size="medium" text="Owner" variant="round" />
          </SStatusChipMobileWrapper>
          <SRowDatas>
            <Avatar
              isNameEllipsis
              isVerified={verified}
              name={name}
              picture={picture}
              twitterName={twitterName}
              variant={AVATAR_VARIANT_TRANSACTION}
              walletId={NFTRowOwner}
            />
            <Link href={`/nft/${NFTRowId}`} passHref>
              <SStatusLink>
                {NFTRowListed === 0
                  ? `${serieDataCount[key].length} ${NFTRowTypeWording} not for sale`
                  : NFTRowListed === 1 && NFTRowMarketplaceId === MARKETPLACE_ID
                  ? `${serieDataCount[key].length} ${NFTRowTypeWording} on sale for ${computeCaps(
                      Number(NFTRowPrice)
                    )} CAPS ${serieDataCount[key].length > 1 ? 'each' : ''}`
                  : `${serieDataCount[key].length} ${NFTRowTypeWording} on sale on other marketplace(s)`}
              </SStatusLink>
            </Link>
          </SRowDatas>
        </SRowWrapper>
        <SChipButtonWrapper>
          <Button
            color="primary500"
            disabled={!userCanBuy}
            onClick={() => userCanBuy && NFTRow && handleCustomBuy(NFTRow)}
            size="small"
            text={
              (user && user.walletId) === NFTRowOwner
                ? 'Owned'
                : isVR && !isUserFromDappQR
                ? 'VR gallery'
                : canUserBuyAgain
                ? 'Buy'
                : '1 per account'
            }
            variant="contained"
          />
        </SChipButtonWrapper>
      </SRows>
    )
  }

  const historyRowData = ({ index, style }: { index: number; style: React.CSSProperties | undefined }) => {
    const NFTTransferRow = historyData[index]
    const { amount, extrinsicId, from, id, quantity, timestamp, to, typeOfTransaction } = NFTTransferRow
    const isTransactionCreationOrSale = typeOfTransaction === 'creation' || typeOfTransaction === 'sale'
    const isTransactionViewDisabled = !EXPLORER_URL

    const fromData = (usersData[from] ?? null) as UserType
    const toData = (usersData[to] ?? null) as UserType

    return (
      <SRows key={id} style={{ ...style, height: (style?.height as any) - GUTTER_SIZE }}>
        <SRowWrapper>
          <SStatusChipMobileWrapper>
            <Chip color="primary200" size="medium" text={typeOfTransaction} variant="round" />
          </SStatusChipMobileWrapper>
          <SRowDatas>
            <Avatar
              isAddressDisplayed
              isNameEllipsis
              isVerified={isTransactionCreationOrSale ? toData?.verified : fromData?.verified}
              name={isTransactionCreationOrSale ? toData?.name : fromData?.name}
              picture={isTransactionCreationOrSale ? toData?.picture : fromData?.picture}
              variant={AVATAR_VARIANT_TRANSACTION}
              walletId={isTransactionCreationOrSale ? to : from}
            />
            <SDatasDetails>
              <SRowDatasDetails>
                {typeOfTransaction === 'creation' && `Created ${quantity} edition${quantity > 1 ? 's' : ''}`}
                {typeOfTransaction === 'transfer' &&
                  `Transferred ${quantity} edition${quantity > 1 ? 's' : ''}
            to ${toData?.name ?? middleEllipsis(to, 10)}`}
                {typeOfTransaction === 'sale' &&
                  `Bought ${quantity} edition${quantity > 1 ? 's' : ''} 
            for ${computeCaps(Number(amount))} caps 
            from ${fromData?.name ?? middleEllipsis(from, 10)}`}
                {typeOfTransaction === 'burn' && `Burned ${quantity} edition${quantity > 1 ? 's' : ''}`}
              </SRowDatasDetails>
              {timestamp && <SRowDatasSubDetails>{formatDate(new Date(timestamp))}</SRowDatasSubDetails>}
            </SDatasDetails>
          </SRowDatas>
        </SRowWrapper>
        <SChipButtonWrapper>
          <AnchorButton
            color="primary500"
            disabled={isTransactionViewDisabled}
            href={`${!isTransactionViewDisabled ? `${EXPLORER_URL}/nft/${id}?extrinsic=${extrinsicId}` : '#'}`}
            size="small"
            text="View"
            variant={isTransactionViewDisabled ? 'contained' : 'outlined'}
          />
        </SChipButtonWrapper>
      </SRows>
    )
  }

  useEffect(() => {
    setCurrentTab(tabs[0])
  }, [resetTabId])

  return (
    <>
      <STabsContainer>
        {tabs.map((tab) => (
          <STab
            key={tab}
            color={currentTab === tab ? 'contrast' : 'neutral100'}
            disabled={tab === 'bid'}
            onClick={() => setCurrentTab(tab)}
            size="medium"
            text={tab}
            variant="contained"
          />
        ))}
      </STabsContainer>
      <SContentContainer>
        {currentTab === 'infos' && (
          <SInfosContainer>
            <SInfosCreatorContainer>
              <SStatusChipWrapper>
                <Chip color="primary200" size="medium" text="Creator" variant="round" />
              </SStatusChipWrapper>
              <Avatar
                isVerified={NFT.creatorData?.verified}
                name={NFT.creatorData?.name}
                picture={NFT.creatorData?.picture}
                twitterName={NFT.creatorData?.twitterName}
                variant={AVATAR_VARIANT_BADGE}
                walletId={NFT.creator}
              />
            </SInfosCreatorContainer>
            <SInfosDataContainer>
              <SInfoDatasTitle>Series ID :</SInfoDatasTitle>
              <SInfoDatasContent>{NFT.serieId}</SInfoDatasContent>
            </SInfosDataContainer>
          </SInfosContainer>
        )}
        {currentTab === 'owners' && (
          <SRowsContainer>
            <AutoSizer>
              {({ width, height }) => (
                <List
                  width={width}
                  height={height}
                  itemCount={serieDataGrouped.length}
                  itemSize={ITEM_SIZE}
                  onItemsRendered={onRowRenderedOwners}
                >
                  {ownerRowData}
                </List>
              )}
            </AutoSizer>
            {NFT.totalNft && seriesData.length < NFT.totalNft && <SLoader color="contrast" useLottie />}
          </SRowsContainer>
        )}
        {currentTab === 'history' &&
          (!historyLoading ? (
            <SRowsContainer>
              <AutoSizer>
                {({ width, height }) => (
                  <List
                    width={width}
                    height={height}
                    itemCount={historyData.length}
                    itemSize={ITEM_SIZE}
                    onItemsRendered={onRowRenderedHistory}
                  >
                    {historyRowData}
                  </List>
                )}
              </AutoSizer>
            </SRowsContainer>
          ) : (
            <SLoader color="contrast" useLottie />
          ))}
        {currentTab === 'bid' && <div></div>}
      </SContentContainer>
    </>
  )
}

const STabsContainer = styled.div`
  display: flex;
  align-items: center;
  overflow-x: auto;

  > * {
    margin-left: 1.6rem;

    &:first-child {
      margin: 0;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    > * {
      margin-left: 3.2rem;

      &:first-child {
        margin: 0;
      }
    }
  }
`

const STab = styled(Button)`
  box-shadow: none;
  text-transform: capitalize;
`

const SContentContainer = styled.div`
  margin-top: 1.6rem;
  height: 29vh;
`

const SInfosContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.neutral100};
  border-radius: 1.2rem;
  padding: 1.2rem 2.4rem 1.2rem 1.2rem;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    height: ${`${ITEM_SIZE - GUTTER_SIZE}px`};
  }
`

const SInfosCreatorContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
  }
`

const SInfosDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 0.8rem;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    justify-content: flex-start;
    align-items: baseline;
  }
`

const SInfoDatasTitle = styled.small`
  font-size: 1.2rem;
`

const SInfoDatasContent = styled.div`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 1.6rem;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-left: 0.4rem;
  }
`

const SRowsContainer = styled.div`
  height: 29vh;
  width: auto;
`

const SRows = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.colors.neutral100};
  border-radius: 1.2rem;
  overflow: auto hidden;
  padding: 1.2rem;
`

const SRowWrapper = styled.div`
  display: flex;
  align-items: center;
`

const SRowDatas = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`

const SRowDatasDetails = styled.div`
  color: ${({ theme }) => theme.colors.contrast};
  font-size: 1.2rem;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  ${({ theme }) => theme.mediaQueries.lg} {
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: 1.6rem;
  }
`

const SRowDatasSubDetails = styled.div`
  color: ${({ theme }) => theme.colors.neutral600};
  font-family: ${({ theme }) => theme.fonts.light};
  font-size: 0.8rem;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 1.2rem;
  }
`

const SChipButtonWrapper = styled.div`
  margin: 1.2rem;
  text-transform: capitalize;
`

const SStatusChipWrapper = styled(SChipButtonWrapper)`
  min-width: 10rem;
`

const SStatusChipMobileWrapper = styled(SStatusChipWrapper)`
  display: none;

  ${({ theme }) => theme.mediaQueries.md} {
    display: inline-block;
  }
`

const SStatusLink = styled.a`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: ${({ theme }) => theme.colors.contrast};
  font-size: 1.2rem;
  max-width: 24rem;
  overflow: hidden;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 1.6rem;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: 1.6rem;
  }
`

const SDatasDetails = styled.div`
  margin-top: 0.4rem;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 0;
    margin-left: 1.6rem;
  }
`

const SLoader = styled(Loader)`
  margin: 8rem auto;
`

export default Details
