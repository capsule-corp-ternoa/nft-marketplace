import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components'
import { FixedSizeList as List, ListOnItemsRenderedProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { UserType, NftType, NFTTransferType, CustomResponse } from 'interfaces';
import styleDetails from './Details.module.scss';
import { computeCaps, formatDate } from 'utils/strings';
import Link from 'next/link';
import { middleEllipsis } from '../../../../utils/strings';
import { getUsers } from 'actions/user';
import Avatar, { AVATAR_VARIANT_BADGE } from 'components/base/Avatar';
import Button from 'components/ui/Button';
import Chip from 'components/ui/Chip';
import { EXPLORER_URL, MARKETPLACE_ID } from 'utils/constant';
import { Loader } from 'components/ui/Icon';
import { getRandomNFTFromArray } from 'utils/functions';
import { getHistory } from 'actions/nft';
import { breakpointMap } from 'style/theme/base';

const GUTTER_SIZE = 5;

export interface DetailsProps {
  NFT: NftType;
  seriesData: NftType[]
  user: UserType;
  setNftToBuy: (NFT: NftType) => void;
  setExp: (n: number) => void;
  isUserFromDappQR: boolean;
  isVR: boolean;
  canUserBuyAgain: boolean;
}

const Details: React.FC<DetailsProps> = ({
  NFT,
  seriesData,
  user,
  setNftToBuy,
  setExp,
  isUserFromDappQR,
  isVR,
  canUserBuyAgain,
}) => {
  const tabs = ["infos", "owners", "history", "bid"]
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [usersData, setUsersData] = useState({} as any);
  const [serieDataGrouped, setSerieDataGrouped] = useState([] as NftType[]);
  const [serieDataCount, setSerieDataCount] = useState({} as any);
  const [historyData, setHistoryData] = useState<NFTTransferType[]>([])
  const [historyLoading, setHistoryLoading] = useState(false)

  const isMobile = useMediaQuery({
    query: `(max-width: ${breakpointMap.md - 1}px)`,
  });
  const isTablet = useMediaQuery({
    query: `(max-width: ${breakpointMap.lg - 1}px)`,
  });
  
  useEffect(() => {
    loadHistoryData()
  }, [NFT.id, NFT.serieId])

  useEffect(() => {
    const serieDataGroupedArray = [] as NftType[];
    const serieDataCountObject = {} as any;
    seriesData.forEach((x) => {
      // Compute rows to display && count number of listed / unlisted for each row
      const key = `${x.owner}-${x.listed}-${x.price}-${x.marketplaceId}-${x.isCapsule}`;
      if (!serieDataCountObject[key]) {
        serieDataCountObject[key] = [x.id];
        serieDataGroupedArray.push({
          id: x.id,
          listed: x.listed,
          marketplaceId: x.marketplaceId,
          owner: x.owner,
          price: x.price,
          priceTiime: x.priceTiime,
          serieId: x.serieId,
          isCapsule: x.isCapsule,
        } as NftType);
      } else {
        serieDataCountObject[key].push(x.id);
      }
    });
    setSerieDataGrouped(serieDataGroupedArray);
    setSerieDataCount(serieDataCountObject);
  }, [seriesData]);

  const handleCustomBuy = (NFT: NftType) => {
    const key = `${NFT.owner}-${NFT.listed}-${NFT.price}-${NFT.marketplaceId}-${NFT.isCapsule}`;
    const NFTToBuy = seriesData.find(x => x.id === getRandomNFTFromArray(serieDataCount[key])) || NFT
    setNftToBuy(NFTToBuy);
    setExp(2);
  };

  const switchTab = (tab: string) => {
    setCurrentTab(tab);
  };

  const onRowRenderedOwners = ({
    overscanStartIndex,
    overscanStopIndex,
  }: ListOnItemsRenderedProps) => {
    let ownersToLoad = [];
    if (serieDataGrouped.length > 0) {
      for (let i = overscanStartIndex; i <= overscanStopIndex; i++) {
        if (serieDataGrouped[i] && !usersData[serieDataGrouped[i].owner]) {
          ownersToLoad.push(serieDataGrouped[i].owner);
        }
      }
      if (ownersToLoad.length > 0) {
        loadDisplayedUsers(ownersToLoad);
      }
    }
  };

  const onRowRenderedHistory = ({
    overscanStartIndex,
    overscanStopIndex,
  }: ListOnItemsRenderedProps) => {
    let usersToLoad = [];
    if (historyData.length > 0) {
      for (let i = overscanStartIndex; i <= overscanStopIndex; i++) {
        if (historyData[i]){
          if (historyData[i].from.startsWith("5") && !usersData[historyData[i].from]) {
            usersToLoad.push(historyData[i].from);
          }
          if (historyData[i].to.startsWith("5") && !usersData[historyData[i].to]) {
            usersToLoad.push(historyData[i].to);
          }
        }
      }
      if (usersToLoad.length > 0) {
        loadDisplayedUsers(usersToLoad);
      }
    }
  };

  const loadDisplayedUsers = async (walletIds: string[]) => {
    try {
      let users = await getUsers(walletIds);
      let usersObject = {} as any;
      if (users && users.data.length > 0) {
        users.data.forEach((u) => {
          usersObject[u.walletId] = u;
        });
        setUsersData({ ...usersData, ...usersObject });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loadHistoryData = async () => {
    try{
      setHistoryLoading(true)
      const data:CustomResponse<NFTTransferType> = await getHistory(NFT.id, NFT.serieId, true)
      if (!data || !data.data) throw new Error("No data found")
      setHistoryData(data.data)
      setHistoryLoading(false)
    }catch(err){
      setHistoryLoading(false)
      console.log(err);
    }
  }

  const ownerRowData = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties | undefined;
  }) => {
    const NFTRow =
      serieDataGrouped && serieDataGrouped.length > 0
        ? serieDataGrouped[index]
        : null;
    const NFTRowId = NFTRow ? NFTRow.id : null;
    const NFTRowOwner = NFTRow ? NFTRow.owner : '';
    const NFTRowPrice = NFTRow ? NFTRow.price : '';
    const NFTRowListed = NFTRow ? NFTRow.listed : '';
    const NFTRowMarketplaceId = NFTRow ? NFTRow.marketplaceId : '';
    const ownerData = (usersData[NFTRowOwner] ?? {}) as UserType;
    const { name, picture, twitterName, verified } = ownerData;

    const key = `${NFTRowOwner}-${NFTRowListed}-${NFTRowPrice}-${NFTRowMarketplaceId}-${NFTRow?.isCapsule}`;
    const NFTRowTypeWording = (NFTRow?.isCapsule ? 'capsule' : 'edition') + (serieDataCount[key].length > 1 ? 's' : '');
    const userCanBuy = (!isVR || (isVR && isUserFromDappQR && canUserBuyAgain)) && (user
      ? user.capsAmount &&
        NFTRow &&
        NFTRowListed === 1 &&
        NFTRowPrice &&
        NFTRowPrice !== '' &&
        Number(user.capsAmount) >= Number(NFTRowPrice) &&
        user.walletId !== NFTRowOwner &&
        NFTRowMarketplaceId === MARKETPLACE_ID
      : NFTRowListed === 1 && NFTRowMarketplaceId === MARKETPLACE_ID
    );

    const StatusLinkLabel = () => (
      <Link href={`/nft/${NFTRowId}`} passHref>
        <SStatusLink>
          {NFTRowListed === 0
            ? `${serieDataCount[key].length} ${NFTRowTypeWording} not for sale`
            : NFTRowListed === 1 && NFTRowMarketplaceId === MARKETPLACE_ID
            ? `${
                serieDataCount[key].length
              } ${NFTRowTypeWording} on sale for ${computeCaps(
                Number(NFTRowPrice)
              )} CAPS ${serieDataCount[key].length > 1 ? 'each' : ''}`
            : `${serieDataCount[key].length} ${NFTRowTypeWording} on sale on other marketplace(s)`}
        </SStatusLink>
      </Link>
    );

    return (
      <div
        className={styleDetails.rows}
        key={NFTRowId}
        style={{ ...style, height: (style?.height as any) - GUTTER_SIZE }}
      >
        <div className={styleDetails.row}>
          {!isMobile && (
            <SChipButtonWrapper>
              <Chip
                color="primaryLight"
                size="medium"
                text="Owner"
                variant="round"
              />
            </SChipButtonWrapper>
          )}
          <SRowDatas>
            <Avatar
              isClickable
              isVerified={verified}
              label={isTablet && <StatusLinkLabel />}
              name={name}
              picture={picture}
              twitterName={isTablet ? undefined : twitterName}
              variant={isTablet ? AVATAR_VARIANT_BADGE : undefined}
              walletId={NFTRowOwner}
            />
            {!isTablet && <StatusLinkLabel />}
          </SRowDatas>
        </div>
        <SChipButtonWrapper>
          <Button
            color="primary"
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
      </div>
    );
  };

  const historyRowData = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties | undefined;
  }) => {
    const NFTTransferRow = historyData[index]
    const { amount, extrinsic, from, id, quantity, timestamp, to, typeOfTransaction } = NFTTransferRow;
    const isTransactionCreationOrSale = (typeOfTransaction === "creation" || typeOfTransaction === "sale");
    const isTransactionViewDisabled = !EXPLORER_URL;

    const fromData = (usersData[from] ?? null) as UserType;
    const toData = (usersData[to] ?? null) as UserType;

    const StatusLabel = () => (
      <SDatasDetails>
        <SRowDatasDetails>
          {typeOfTransaction === "creation" &&
            `Created ${quantity} edition${quantity > 1 ? "s" : ""}`
          }
          {typeOfTransaction === "transfer" &&
            `Transferred ${quantity} edition${quantity > 1 ? "s" : ""}
            to ${toData?.name ?? middleEllipsis(to, 10)}`
          }
          {typeOfTransaction === "sale" &&
            `Bought ${quantity} edition${quantity > 1 ? "s" : ""} 
            for ${computeCaps(Number(amount))} caps 
            from ${fromData?.name ?? middleEllipsis(from, 10)}`
          }
          {typeOfTransaction === "burn" &&
            `Burned ${quantity} edition${quantity > 1 ? "s" : ""}`
          }
        </SRowDatasDetails>
        {timestamp && 
          <SRowDatasSubDetails>
              {formatDate(new Date(timestamp))}
          </SRowDatasSubDetails>
        }
      </SDatasDetails>
    );

    return (
      <div
        className={styleDetails.rows}
        key={id}
        style={{ ...style, height: (style?.height as any) - GUTTER_SIZE }}
      >
        <div className={styleDetails.row}>
          {!isMobile && (
            <SChipButtonWrapper>
              <Chip color="primaryLight" size="medium" text={typeOfTransaction} variant="round" />
            </SChipButtonWrapper>
          )}
          <SRowDatas>
            <Avatar
              isAddressDisplayed={!isMobile}
              isClickable
              isVerified={isTransactionCreationOrSale ? toData?.verified : fromData?.verified}
              label={isMobile && <StatusLabel />}
              name={isTransactionCreationOrSale ? toData?.name : fromData?.name}
              picture={isTransactionCreationOrSale ? toData?.picture : fromData?.picture}
              variant={isTablet ? AVATAR_VARIANT_BADGE : undefined}
              walletId={isTransactionCreationOrSale ? to : from}
            />
            {!isMobile && <StatusLabel />}
          </SRowDatas>
        </div>
        <SChipButtonWrapper>
          <Button
            color="primary"
            disabled={isTransactionViewDisabled}
            href={`${!isTransactionViewDisabled ? `${EXPLORER_URL}/nft/${id}?extrinsic=${extrinsic.id}` : "#"}`}
            size="small"
            text="View transaction"
            variant={isTransactionViewDisabled ? "contained" : "outlined"}
          />
        </SChipButtonWrapper>
      </div>
    );
  };

  return (
    <>
      <div className={styleDetails.detailsMenu}>
        {tabs.map(x => {
          return (
            <button
              key={x}
              className={
                currentTab === x
                  ? styleDetails.detailsMenuActiveItem
                  : styleDetails.detailsMenuItem
              }
              onClick={() => switchTab(x)}
              disabled={x==="bid"}
            >
              {x[0].toUpperCase() + x.substring(1)}
            </button>
          )
        })}
      </div>
      <div>
        <div className={styleDetails.detailsContent}>
          {currentTab === 'infos' && (
            <div className={styleDetails.detailsInfos}>
              <div className={styleDetails.creatorWrapper}>
                <SChipButtonWrapper>
                  <Chip
                    color="primaryLight"
                    size="medium"
                    text="Creator"
                    variant="round"
                  />
                </SChipButtonWrapper>
                <Avatar
                  isClickable
                  isVerified={NFT.creatorData?.verified}
                  name={NFT.creatorData?.name}
                  picture={NFT.creatorData?.picture}
                  twitterName={NFT.creatorData?.twitterName}
                  variant={isTablet ? AVATAR_VARIANT_BADGE : undefined}
                  walletId={NFT.creator}
                />
              </div>
              <div className={styleDetails.infoDatasWrapper}>
              <div className={styleDetails.infoDatas}>
                  <small className={styleDetails.infoDatasTitle}>
                    Series ID : 
                  </small>
                  <div className={styleDetails.infoDatasContent}>
                    {NFT.serieId}
                  </div>
                </div>
              </div>
            </div>
          )}
          {currentTab === 'owners' && (
            <div className={styleDetails.rowsContainers}>
              <AutoSizer>
                {({ width, height }) => (
                  <List
                    width={width}
                    height={height}
                    itemCount={serieDataGrouped.length}
                    itemSize={88}
                    onItemsRendered={onRowRenderedOwners}
                  >
                    {ownerRowData}
                  </List>
                )}
              </AutoSizer>
              {NFT.totalNft && seriesData.length < NFT.totalNft && <SLoader color="primary" />}
            </div>
          )}
          {currentTab === 'history' && 
            (!historyLoading ? 
              <div className={styleDetails.rowsContainers}>
                <AutoSizer>
                  {({ width, height }) => (
                    <List
                      width={width}
                      height={height}
                      itemCount={historyData.length}
                      itemSize={88}
                      onItemsRendered={onRowRenderedHistory}
                    >
                      {historyRowData}
                    </List>
                  )}
                </AutoSizer>
              </div>
            :
              <SLoader color="primary" />
            )
          }
          {currentTab === 'bid' && <div></div>}
        </div>
      </div>
    </>
  );
};

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
`;

const SRowDatasDetails = styled.div`
  color: ${({ theme }) => theme.colors.contrast};
  font-size: 1.2rem;
  
  ${({ theme }) => theme.mediaQueries.md} {
    font-family: ${({theme}) => theme.fonts.bold};
    font-size: 1.6rem;
  }
`;

const SRowDatasSubDetails = styled.div`
  color: ${({ theme }) => theme.colors.neutral200};
  font-family: ${({theme}) => theme.fonts.light};
  font-size: 0.8rem;
  
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 1.2rem;
  }
`;

const SChipButtonWrapper = styled.div`
  margin: 1.2rem;
  text-transform: capitalize;
`;

const SStatusLink = styled.a`
  color: ${({ theme }) => theme.colors.contrast};
  font-size: 1.2rem;
  
  ${({ theme }) => theme.mediaQueries.lg} {
    font-family: ${({theme}) => theme.fonts.bold};
    font-size: 1.6rem;
    margin-left: 1.6rem;
  }
`;

const SDatasDetails = styled.div`
  margin-top: 0.4rem;

  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 0;
    margin-left: 1.6rem;
  }
`;

const SLoader = styled(Loader)`
  margin: 4rem auto;
`;

export default Details;
