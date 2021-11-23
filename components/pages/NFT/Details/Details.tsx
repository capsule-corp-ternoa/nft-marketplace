import { useEffect, useState } from 'react';
import { FixedSizeList as List, ListOnItemsRenderedProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { UserType, NftType, NFTTransferType, CustomResponse } from 'interfaces';
import styleDetails from './Details.module.scss';
import { computeCaps, formatDate } from 'utils/strings';
import Link from 'next/link';
import { middleEllipsis } from '../../../../utils/strings';
import { getUsers } from 'actions/user';
import Creator from 'components/base/Creator';
import { MARKETPLACE_ID } from 'utils/constant';
import CopyPaste from 'components/assets/copypaste';
import { clipboardCopy, getRandomNFTFromArray } from 'utils/functions';
import { getHistory } from 'actions/nft';

export interface DetailsProps {
  NFT: NftType;
  user: UserType;
  setNftToBuy: (NFT: NftType) => void;
  setExp: (n: number) => void;
  isUserFromDappQR: boolean;
  isVR: boolean;
}

const Details: React.FC<DetailsProps> = ({
  NFT,
  user,
  setNftToBuy,
  setExp,
  isUserFromDappQR,
  isVR,
}) => {
  const tabs = ["infos", "owners", "history", "bid"]
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [usersData, setUsersData] = useState({} as any);
  const [serieDataGrouped, setSerieDataGrouped] = useState([] as NftType[]);
  const [serieDataCount, setSerieDataCount] = useState({} as any);
  const [historyData, setHistoryData] = useState<NFTTransferType[]>([])
  const serieData = NFT?.serieData || [];
  
  useEffect(() => {
    loadHistoryData()
  }, [])

  useEffect(() => {
    const serieDataGroupedArray = [] as NftType[];
    const serieDataCountObject = {} as any;
    serieData.forEach((x) => {
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
  }, [serieData]);

  const handleCustomBuy = (NFT: NftType) => {
    const key = `${NFT.owner}-${NFT.listed}-${NFT.price}-${NFT.marketplaceId}`;
    const NFTToBuy = serieData.find(x => x.id === getRandomNFTFromArray(serieDataCount[key])) || NFT
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
      const data:CustomResponse<NFTTransferType> = await getHistory(NFT.id, NFT.serieId, true)
      if (!data || !data.data) throw new Error("No data found")
      setHistoryData(data.data)
    }catch(err){
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
    const GUTTER_SIZE = 5;
    const NFTRow =
      serieDataGrouped && serieDataGrouped.length > 0
        ? serieDataGrouped[index]
        : null;
    const NFTRowId = NFTRow ? NFTRow.id : null;
    const NFTRowOwner = NFTRow ? NFTRow.owner : '';
    const NFTRowPrice = NFTRow ? NFTRow.price : '';
    const NFTRowListed = NFTRow ? NFTRow.listed : '';
    const NFTRowMarketplaceId = NFTRow ? NFTRow.marketplaceId : '';
    const ownerData = (
      usersData[NFTRowOwner] ? usersData[NFTRowOwner] : null
    ) as UserType;
    const key = `${NFTRowOwner}-${NFTRowListed}-${NFTRowPrice}-${NFTRowMarketplaceId}-${NFTRow?.isCapsule}`;
    const NFTRowTypeWording = (NFTRow?.isCapsule ? 'capsule' : 'edition') + (serieDataCount[key].length > 1 ? 's' : '');
    const userCanBuy = (!isVR || (isVR && isUserFromDappQR)) && (user
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
    return (
      <div
        className={styleDetails.rows}
        key={NFTRowId}
        style={{ ...style, height: (style?.height as any) - GUTTER_SIZE }}
      >
        <div className={styleDetails.row}>
          <div className={styleDetails.rowBadge}>Owner</div>
          <div className={styleDetails.CreatorPicture}>
            <Creator
              className={styleDetails.CreatorPictureIMG}
              size={'fullwidth'}
              user={ownerData}
              walletId={NFTRowOwner}
              showTooltip={false}
            />
          </div>
          <div className={styleDetails.rowDatas}>
            <div className={styleDetails.rowDatasName}>
              <div>
                <Link href={`/${NFTRowOwner}`}>
                  <a>
                    {ownerData?.name || middleEllipsis(NFTRowOwner, 20)}
                  </a>
                </Link>
              </div>
              <span className={styleDetails.rowTwitterUsername}>
                {ownerData?.twitterName ? ownerData.twitterName : null}
              </span>
            </div>
            <Link href={`/nft/${NFTRowId}`}>
              <a className={styleDetails.rowDatasDetails}>
                {NFTRowListed === 0
                  ? `${serieDataCount[key].length} ${NFTRowTypeWording} not for sale`
                  : NFTRowListed === 1 && NFTRowMarketplaceId === MARKETPLACE_ID
                  ? `${
                      serieDataCount[key].length
                    } ${NFTRowTypeWording} on sale for ${computeCaps(
                      Number(NFTRowPrice)
                    )} CAPS ${serieDataCount[key].length > 1 ? 'each' : ''}`
                  : `${serieDataCount[key].length} ${NFTRowTypeWording} on sale on other marketplace(s)`}
              </a>
            </Link>
          </div>
        </div>
        <div>
          <div
            className={`${styleDetails.buyButton} ${
              !userCanBuy && styleDetails.disabled
            }`}
            onClick={() => userCanBuy && NFTRow && handleCustomBuy(NFTRow)}
          >
            {(user && user.walletId) === NFTRowOwner ? 'Owned' : ((isVR && !isUserFromDappQR) ? 'VR gallery' : 'Buy')}
          </div>
        </div>
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
    const GUTTER_SIZE = 5;
    const NFTTransferRow = historyData[index]
    const fromData = (
      usersData[NFTTransferRow.from] ? usersData[NFTTransferRow.from] : null
    ) as UserType;
    const toData = (
      usersData[NFTTransferRow.to] ? usersData[NFTTransferRow.to] : null
    ) as UserType;
    return (
      <div
        className={styleDetails.rows}
        key={NFTTransferRow.id}
        style={{ ...style, height: (style?.height as any) - GUTTER_SIZE }}
      >
        <div className={styleDetails.row}>
          <div className={styleDetails.rowBadge}>
            {NFTTransferRow.typeOfTransaction.substr(0,1).toUpperCase() + NFTTransferRow.typeOfTransaction.substr(1,NFTTransferRow.typeOfTransaction.length - 1)}
          </div>
          <div className={styleDetails.CreatorPicture}>
            <Creator
              className={styleDetails.CreatorPictureIMG}
              size={'fullwidth'}
              user={NFTTransferRow.typeOfTransaction === "creation" ? toData : fromData}
              walletId={NFTTransferRow.typeOfTransaction === "creation" ? NFTTransferRow.to : NFTTransferRow.from}
              showTooltip={false}
            />
          </div>
          <div className={styleDetails.rowDatas}>
            <div className={styleDetails.historyDatasName}>
              <div>
                {NFTTransferRow.typeOfTransaction !== "creation" ? 
                  <Link href={`/${NFTTransferRow.from}`}>
                    <a>
                      {fromData?.name || middleEllipsis(NFTTransferRow.from, 10)}
                    </a>
                  </Link>
                :
                  <Link href={`/${NFTTransferRow.to}`}>
                    <a>
                      {toData?.name || middleEllipsis(NFTTransferRow.to, 10)}
                    </a>
                  </Link>
                }
              </div>
              {NFTTransferRow.typeOfTransaction !== "creation" ? 
                <span className={styleDetails.HistoryAddress} onClick={() => clipboardCopy(NFTTransferRow.from)}>
                  {fromData?.name ? middleEllipsis(NFTTransferRow.from, 20) : "copy to clipboard"}
                  <CopyPaste className={styleDetails.SmallCopyPaste}/>
                </span>
              : 
                <span className={styleDetails.HistoryAddress} onClick={() => clipboardCopy(NFTTransferRow.to)}>
                  {toData?.name ? middleEllipsis(NFTTransferRow.to, 20) : "copy to clipboard"}
                  <CopyPaste className={styleDetails.SmallCopyPaste}/>
                </span>
              }
            </div>
            <div >
              <div className={styleDetails.rowDatasDetails}>
                {NFTTransferRow.typeOfTransaction === "creation" &&
                  `Created ${NFTTransferRow.quantity} edition${NFTTransferRow.quantity > 1 ? "s" : ""}`
                }
                {NFTTransferRow.typeOfTransaction === "transfer" &&
                  `Transferred ${NFTTransferRow.quantity} edition${NFTTransferRow.quantity > 1 ? "s" : ""}
                  to ${toData?.name ? toData.name : middleEllipsis(NFTTransferRow.to, 15)}`
                }
                {NFTTransferRow.typeOfTransaction === "sale" &&
                  `Sold ${NFTTransferRow.quantity} edition${NFTTransferRow.quantity > 1 ? "s" : ""} 
                  to ${toData?.name ? toData.name : middleEllipsis(NFTTransferRow.to, 15)}`
                }
                {NFTTransferRow.typeOfTransaction === "burn" &&
                  `Burned ${NFTTransferRow.quantity} edition${NFTTransferRow.quantity > 1 ? "s" : ""}`
                }
              </div>
              {NFTTransferRow.timestamp && 
                <div className={styleDetails.historyDatasDetailDate}>
                    {formatDate(new Date(NFTTransferRow.timestamp))}
                </div>
              }
            </div>
          </div>
        </div>
        <div className={styleDetails.TernoaChainButton}>
          View transaction
        </div>
      </div>
    );
  };

  return (
    <div className={styleDetails.detailsMain}>
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
                <div className={styleDetails.creatorBadge}>Creator</div>
                <div className={styleDetails.TopInfosCreator}>
                  <div className={styleDetails.TopInfosCreatorPicture}>
                    <Creator
                      className={styleDetails.TopInfosCreatorPictureIMG}
                      size={'fullwidth'}
                      user={NFT.creatorData}
                      walletId={NFT.creator}
                      showTooltip={false}
                    />
                  </div>
                  <div className={styleDetails.TopInfosCreatorName}>
                    <div>
                      <Link href={`/${NFT.creator}`}>
                        <a>{NFT.creatorData?.name || middleEllipsis(NFT.creator, 20)}</a>
                      </Link>
                    </div>
                    <span className={styleDetails.rowTwitterUsername}>
                      {NFT.creatorData?.twitterName || null}
                    </span>
                  </div>
                </div>
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
                    itemSize={75}
                    onItemsRendered={onRowRenderedOwners}
                  >
                    {ownerRowData}
                  </List>
                )}
              </AutoSizer>
            </div>
          )}
          {currentTab === 'history' && (
            <div className={styleDetails.rowsContainers}>
              <AutoSizer>
                {({ width, height }) => (
                  <List
                    width={width}
                    height={height}
                    itemCount={historyData.length}
                    itemSize={75}
                    onItemsRendered={onRowRenderedHistory}
                  >
                    {historyRowData}
                  </List>
                )}
              </AutoSizer>
            </div>
          )}
          {currentTab === 'bid' && <div></div>}
        </div>
      </div>
    </div>
  );
};

export default Details;
