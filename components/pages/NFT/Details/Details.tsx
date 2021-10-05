import { useEffect, useState } from 'react';
import { FixedSizeList as List, ListOnItemsRenderedProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { UserType, NftType } from 'interfaces';
import gradient from 'random-gradient';
import styleDetails from './Details.module.scss';
import { computeCaps } from 'utils/strings';
import Link from 'next/link';
import { middleEllipsis } from '../../../../utils/strings';
import { getUsersByWalletIds } from 'actions/user';
import Creator from 'components/base/Creator';
import { MARKETPLACE_ID } from 'utils/constant';

export interface DetailsProps {
  NFT: NftType;
  user: UserType;
  setNftToBuy: (NFT: NftType) => void;
  setExp: (n: number) => void;
}

const Details: React.FC<DetailsProps> = ({
  NFT,
  user,
  setNftToBuy,
  setExp,
}) => {
  const [currentTab, setCurrentTab] = useState('info');
  const [usersData, setUsersData] = useState({} as any);
  const [serieDataGrouped, setSerieDataGrouped] = useState([] as NftType[]);
  //const [ownerNftsCount, setOwnerNftsCount] = useState({} as any);
  const [serieDataCount, setSerieDataCount] = useState({} as any);
  const bgGradient = { background: gradient(NFT.ownerData.name) };
  const serieData = NFT?.serieData ? NFT.serieData : [];

  useEffect(() => {
    const serieDataGroupedArray = [] as NftType[];
    //const ownerNftsCountObject = {} as any;
    const serieDataCountObject = {} as any;
    serieData.forEach((x) => {
      /*// Count owned by owner
      if (!ownerNftsCountObject[x.owner]) {
        ownerNftsCountObject[x.owner] = 1;
      } else {
        ownerNftsCountObject[x.owner] += 1;
      }*/
      // Compute rows to display && count number of listed / unlisted for each row
      const key = `${x.owner}-${x.listed}-${x.price}-${x.marketplaceId}`;
      if (!serieDataCountObject[key]) {
        serieDataCountObject[key] = 1;
        serieDataGroupedArray.push({
          id: x.id,
          listed: x.listed,
          marketplaceId: x.marketplaceId,
          owner: x.owner,
          price: x.price,
          priceTiime: x.priceTiime,
        } as NftType);
      } else {
        serieDataCountObject[key] += 1;
      }
    });
    setSerieDataGrouped(serieDataGroupedArray);
    //setOwnerNftsCount(ownerNftsCountObject);
    setSerieDataCount(serieDataCountObject);
  }, [serieData]);

  const handleCustomBuy = (NFT: NftType) => {
    setNftToBuy(NFT);
    setExp(2);
  };

  const switchTab = (tab: string) => {
    setCurrentTab(tab);
  };

  const onRowRendered = ({
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

  const loadDisplayedUsers = async (walletIds: string[]) => {
    try {
      let users = await getUsersByWalletIds(walletIds);
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

  const ownerData = ({
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
    const key = `${NFTRowOwner}-${NFTRowListed}-${NFTRowPrice}-${NFTRowMarketplaceId}`;
    const userCanBuy = user ? 
      user.capsAmount &&
      NFTRow &&
      NFTRowListed===1 &&
      NFTRowPrice &&
      NFTRowPrice !== '' &&
      Number(user.capsAmount) >= Number(NFTRowPrice) &&
      user.walletId !== NFTRowOwner &&
      NFTRowMarketplaceId === MARKETPLACE_ID
    : 
      NFTRowListed===1 && NFTRowMarketplaceId === MARKETPLACE_ID ;
    return (
      <div
        className={styleDetails.owners}
        key={NFTRowId}
        style={{ ...style, height: (style?.height as any) - GUTTER_SIZE }}
      >
        <Link href={`/${NFT.ownerData.walletId}`}>
          <a className={styleDetails.owner}>
            <div className={styleDetails.ownerBadge}>Owner</div>
            <div className={styleDetails.ownerProfile}>
              {ownerData?.picture || ownerData?.name ? (
                <Creator
                  className={styleDetails.ownerProfileIMG}
                  size={'fullwidth'}
                  user={ownerData}
                  showTooltip={false}
                />
              ) : (
                <div
                  className={styleDetails.ownerProfileIMG}
                  style={bgGradient}
                />
              )}
            </div>
            <div className={styleDetails.ownerDatas}>
              <div className={styleDetails.ownerDatasName}>
                <div>
                  {ownerData?.name
                    ? ownerData.name
                    : middleEllipsis(NFTRowOwner, 15)}
                </div>
                <span className={styleDetails.ownerTwitterUsername}>
                  {ownerData?.twitterName ? ownerData.twitterName : null}
                </span>
              </div>
              <div className={styleDetails.ownerDatasSales}>
                {NFTRowListed === 0 ? 
                  `${serieDataCount[key]} edition${serieDataCount[key] > 1 ? 's' : ''} not for sale`
                : NFTRowListed === 1 && NFTRowMarketplaceId === MARKETPLACE_ID ? 
                  `${serieDataCount[key]}${""/*/${ownerNftsCount[NFTRowOwner]}*/} on sale for ${computeCaps(Number(NFTRowPrice))} CAPS ${serieDataCount[key] > 1 ? 
                      "each" 
                    : 
                      ""
                    }`
                  : 
                    `${serieDataCount[key]}${""/*/${ownerNftsCount[NFTRowOwner]}*/} on sale on other marketplace(s)`}
              </div>
            </div>
          </a>
        </Link>
        <div>
          <div
            className={`${styleDetails.buyButton} ${
              !userCanBuy && styleDetails.disabled
            }`}
            onClick={() => userCanBuy && NFTRow && handleCustomBuy(NFTRow)}
          >
            {(user && user.walletId) !== NFTRowOwner ? "Buy" : "Owned"}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styleDetails.detailsMain}>
      <div className={styleDetails.detailsMenu}>
        <button
          className={
            currentTab === 'info'
              ? styleDetails.detailsMenuActiveItem
              : styleDetails.detailsMenuItem
          }
          onClick={() => switchTab('info')}
        >
          Infos
        </button>
        <button
          className={
            currentTab === 'owners'
              ? styleDetails.detailsMenuActiveItem
              : styleDetails.detailsMenuItem
          }
          onClick={() => switchTab('owners')}
        >
          Owners
        </button>
        <button
          className={
            currentTab === 'history'
              ? styleDetails.detailsMenuActiveItem
              : styleDetails.detailsMenuItem
          }
          onClick={() => switchTab('history')}
        >
          History
        </button>
        <button
          className={
            currentTab === 'bid'
              ? styleDetails.detailsMenuActiveItem
              : styleDetails.detailsMenuItem
          }
          onClick={() => switchTab('bid')}
          disabled={true}
        >
          Bid
        </button>
      </div>
      <div>
        <div className={styleDetails.detailsContent}>
          {currentTab === 'info' && (
            <div className={styleDetails.detailsInfos}>
              <div className={styleDetails.creatorWrapper}>
                <div className={styleDetails.creatorBadge}>Creator</div>
                <div className={styleDetails.TopInfosCreator}>
                  <div className={styleDetails.TopInfosCreatorPicture}>
                    {NFT.creatorData?.picture || NFT.creatorData?.name ? (
                      <Creator
                        className={styleDetails.TopInfosCreatorPictureIMG}
                        size={'fullwidth'}
                        user={NFT.creatorData}
                        showTooltip={false}
                      />
                    ) : (
                      <div
                        className={styleDetails.TopInfosCreatorPictureIMG}
                        style={bgGradient}
                      />
                    )}
                  </div>
                  <div className={styleDetails.TopInfosCreatorName}>
                    <div>{NFT.creatorData.name}</div>
                    <span className={styleDetails.ownerTwitterUsername}>
                      {NFT.creatorData?.twitterName
                        ? NFT.creatorData.twitterName
                        : null}
                    </span>
                  </div>
                </div>
              </div>
              <div className={styleDetails.infoDatasWrapper}>
                <div className={styleDetails.infoDatas}>
                  <small className={styleDetails.infoDatasTitle}>
                    Contract Address
                  </small>
                  <div className={styleDetails.infoDatasContent}>
                    0x1dDB2C0897daF18632662E71fdD2dbDC0eB3a9Ec
                  </div>
                </div>
                <div className={styleDetails.infoDatas}>
                  <small className={styleDetails.infoDatasTitle}>
                    Token ID
                  </small>
                  <div className={styleDetails.infoDatasContent}>
                    100300039566
                  </div>
                </div>
                <div className={styleDetails.infoDatas}>
                  <small className={styleDetails.infoDatasTitle}>Size</small>
                  <div className={styleDetails.infoDatasContent}>
                    1024 x 1024 px.IMAGE(427KB)
                  </div>
                </div>
              </div>
            </div>
          )}
          {currentTab === 'owners' && (
            <div className={styleDetails.ownersContainers}>
              <AutoSizer>
                {({ width, height }) => (
                  <List
                    width={width}
                    height={height}
                    itemCount={serieDataGrouped.length}
                    itemSize={75}
                    onItemsRendered={onRowRendered}
                  >
                    {ownerData}
                  </List>
                )}
              </AutoSizer>
            </div>
          )}
          {currentTab === 'history' && (
            <>
              <div className={styleDetails.History}>
                <div className={styleDetails.HistoryLeftBlock}>
                  <div className={styleDetails.HistoryPicture}>
                    {NFT.ownerData?.picture || NFT.ownerData?.name ? (
                      <Creator
                        className={styleDetails.HistoryPictureIMG}
                        size={'fullwidth'}
                        user={NFT.ownerData}
                        showTooltip={false}
                      />
                    ) : (
                      <div
                        className={styleDetails.HistoryPictureIMG}
                        style={bgGradient}
                      />
                    )}
                  </div>
                  <div className={styleDetails.HistoryName}>
                    <div>{NFT.ownerData.name}</div>
                  </div>
                  <div className={styleDetails.ownerBadge}>Owner</div>
                </div>
                <div className={styleDetails.TernoaChainButton}>
                  View transaction on Ternoa Chain
                </div>
              </div>
              <div className={styleDetails.History}>
                <div className={styleDetails.HistoryLeftBlock}>
                  <div className={styleDetails.HistoryPicture}>
                    {NFT.creatorData?.picture || NFT.creatorData?.name ? (
                      <Creator
                        className={styleDetails.HistoryPictureIMG}
                        size={'fullwidth'}
                        user={NFT.creatorData}
                        showTooltip={false}
                      />
                    ) : (
                      <div
                        className={styleDetails.HistoryPictureIMG}
                        style={bgGradient}
                      />
                    )}
                  </div>
                  <div className={styleDetails.HistoryName}>
                    <div>{NFT.creatorData.name}</div>
                  </div>
                  <div className={styleDetails.ownerBadge}>Creator</div>
                </div>
              <div className={styleDetails.TernoaChainButton}>
                  View transaction on Ternoa Chain
                </div>
              </div>
            </>
          )}
          {currentTab === 'bid' && <div></div>}
        </div>
      </div>
    </div>
  );
};

export default Details;
