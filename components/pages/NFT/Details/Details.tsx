import { useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { UserType, NftType } from 'interfaces';
import gradient from 'random-gradient';
import style from './Details.module.scss';
import { computeCaps } from 'utils/strings';
import Link from 'next/link';
import { middleEllipsis } from '../../../../utils/strings';
import Badge from 'components/assets/badge';

export interface DetailsProps {
  NFT: NftType;
  user: UserType;
}

const Details: React.FC<DetailsProps> = ({ NFT }) => {
  console.log(NFT);
  const [info, setInfo] = useState(true);
  const [owners, setOwners] = useState(false);
  const [history, setHistory] = useState(false);
  const [bid, setBid] = useState(false);
  // const [serieData, setSerieData] = useState([NFT.serieData])
  const bgGradientOwner = { background: gradient(NFT.ownerData.name) };
  //const bgGradientCreator = { background: gradient(NFT.creatorData.name) };
  const formatedDate = NFT.timestampList?.toLocaleString();
  const handleInfo = () => {
    setInfo(true), setOwners(false), setHistory(false), setBid(false);
  };
  const handleOwners = () => {
    setInfo(false), setOwners(true), setHistory(false), setBid(false);
  };
  const handHistory = () => {
    setInfo(false), setOwners(false), setHistory(true), setBid(false);
  };
  // const handleBid = () => {
  //   setInfo(false)
  //   setOwners(false),
  //   setHistory(false),
  //   setBid(true)
  // }

  const ownerDatas = ({ index }) => (
    <div className={style.owners} key={NFT.serieData[index]?.id}>
      <Link href={`/${NFT.ownerData.walletId}`}>
        <a className={style.owner}>
          <div className={style.ownerBadge}>Owner</div>
          <div className={style.ownerProfile}>
            <div className={style.ownerProfileIMG} style={bgGradientOwner} />
          </div>
          <div className={style.ownerDatas}>
            <div className={style.ownerDatasName}>
              {middleEllipsis(NFT.serieData[index]?.owner, 15)}
            </div>
            <div className={style.ownerDatasSales}>
              <span style={{ color: 'red' }}>
                {' '}
                {NFT.totalListedNft}/{NFT.totalNft}{' '}
              </span>
              on sale for {computeCaps(Number(NFT.serieData[index]?.price))}{' '}
              CAPS each
            </div>
          </div>
        </a>
      </Link>
      <div>
        <div className={style.buyButton}>Buy</div>
      </div>
    </div>
  );

  return (
    <div className={style.detailsMain}>
      <div className={style.detailsMenu}>
        <button
          className={info ? style.detailsMenuActiveItem : style.detailsMenuItem}
          onClick={handleInfo}
        >
          Infos
        </button>
        <button
          className={
            owners ? style.detailsMenuActiveItem : style.detailsMenuItem
          }
          onClick={handleOwners}
        >
          Owners
        </button>
        <button
          className={
            history ? style.detailsMenuActiveItem : style.detailsMenuItem
          }
          onClick={handHistory}
        >
          History
        </button>
        <button
          className={bid ? style.detailsMenuActiveItem : style.detailsMenuItem}
          disabled={true}
        >
          Bid
        </button>
      </div>
      <div>
        <div className={style.detailsContent}>
          {info && (
            <div className={style.detailsInfos}>
              <div className={style.creatorWrapper}>
                <div className={style.creatorBadge}>Creator</div>
                <div className={style.TopInfosCreator}>
                  <div className={style.TopInfosCreatorPicture}>
                    <img
                      src={NFT.creatorData.picture}
                      className={style.TopInfosCreatorPictureIMG}
                    />
                    {NFT.creatorData.verified && (
                      <Badge className={style.TopInfosCreatorCertifiedBadge} />
                    )}
                  </div>
                  <div className={style.TopInfosCreatorName}>
                    {NFT.creatorData.name}
                  </div>
                </div>
              </div>
              <div className={style.infoDatasWrapper}>
                <div className={style.infoDatas}>
                  <small className={style.infoDatasTitle}>
                    Contract Address
                  </small>
                  <div className={style.infoDatasContent}>
                    0x1dDB2C0897daF18632662E71fdD2dbDC0eB3a9Ec
                  </div>
                </div>
                <div className={style.infoDatas}>
                  <small className={style.infoDatasTitle}>Token ID</small>
                  <div className={style.infoDatasContent}>100300039566</div>
                </div>
                <div className={style.infoDatas}>
                  <small className={style.infoDatasTitle}>Size</small>
                  <div className={style.infoDatasContent}>
                    1024 x 1024 px.IMAGE(427KB)
                  </div>
                </div>
              </div>
            </div>
          )}
          {owners && (
            <div
              className={style.ownersContainers}
            >
              <AutoSizer>
                {({ width, height }) => (
                  <List
                    width={width}
                    height={height}
                    itemCount={NFT.serieData?.length}
                    itemSize={75}
                  >
                    {ownerDatas}
                  </List>
                )}
              </AutoSizer>
            </div>
          )}

          {/* {owners && (
            <div className={style.ownersContainers}>
              <div className={style.owners}>
                <Link href={`/${NFT.ownerData.walletId}`}>
                  <a className={style.owner}>
                    <div className={style.ownerBadge}>Owner</div>
                    <div className={style.ownerProfile}>
                      {NFT.ownerData.picture ? (
                        <img
                          src={NFT.ownerData.picture}
                          className={style.ownerProfileIMG}
                        />
                      ) : (
                        <div
                          className={style.ownerProfileIMG}
                          style={bgGradientOwner}
                        />
                      )}
                    </div>
                    <div className={style.ownerDatas}>
                      <div className={style.ownerDatasName}>
                        {NFT.ownerData.name}
                      </div>
                      <div className={style.ownerDatasSales}>
                        {NFT.totalListedNft}/{NFT.totalNft} on sale for{' '}
                        {computeCaps(Number(NFT.price))} CAPS each
                      </div>
                    </div>
                  </a>
                </Link>
                <div>
                  <div className={style.buyButton}>Buy</div>
                </div>
              </div>
              {NFT.serieData?.map((owner) => (
                <div className={style.owners} key={owner.id}>
                  <Link href={`/${NFT.ownerData.walletId}`}>
                    <a className={style.owner}>
                      <div className={style.ownerBadge}>Owner</div>
                      <div className={style.ownerProfile}>
                        <div
                          className={style.ownerProfileIMG}
                          style={bgGradientOwner}
                        />
                      </div>
                      <div className={style.ownerDatas}>
                        <div className={style.ownerDatasName}>
                          {middleEllipsis(owner.owner, 15)}
                        </div>
                        <div className={style.ownerDatasSales}>
                          <span style={{ color: 'red' }}>
                            {' '}
                            {NFT.totalListedNft}/{NFT.totalNft}{' '}
                          </span>
                          on sale for {computeCaps(Number(owner.price))} CAPS
                          each
                        </div>
                      </div>
                    </a>
                  </Link>
                  <div>
                    <div className={style.buyButton}>Buy</div>
                  </div>
                </div>
              ))}
            </div>
          )} */}
          {history && (
            <div className={style.owners}>
              <Link href={`/${NFT.ownerData.walletId}`}>
                <a className={style.owner}>
                  <div className={style.ownerProfile}>
                    {NFT.ownerData.picture ? (
                      <img
                        src={NFT.ownerData.picture}
                        className={style.ownerProfileIMG}
                      />
                    ) : (
                      <div
                        className={style.ownerProfileIMG}
                        style={bgGradientOwner}
                      />
                    )}
                  </div>
                  <div className={style.ownerDatas}>
                    <div className={style.historyEvent}>Owner</div>
                    <div className={style.historyDatas}>
                      <small>
                        by <span>{NFT.ownerData.name}</span> {formatedDate}
                      </small>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          )}
          {/* {bid && 'bid'} */}
        </div>
      </div>
    </div>
  );
};

export default Details;
