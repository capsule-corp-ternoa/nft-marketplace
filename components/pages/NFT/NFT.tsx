import React, { useEffect, useState } from 'react';
import style from './NFT.module.scss';
import Footer from 'components/base/Footer';
import FloatingHeader from 'components/base/FloatingHeader';
import Media from 'components/base/Media';
import Scale from 'components/assets/scale';
import Share from 'components/assets/share';
import Like from 'components/assets/heart';
import Eye from 'components/assets/eye';
import { computeCaps, computeTiime } from 'utils/strings';
import { UserType, NftType } from 'interfaces';
import { likeNFT, unlikeNFT } from 'actions/user';
import ModalShare from 'components/base/ModalShare';
import NoNFTImage from '../../assets/NoNFTImage';
import gradient from 'random-gradient';
import Details from './Details';
import Creator from 'components/base/Creator';
import { MARKETPLACE_ID } from 'utils/constant';

export interface NFTPageProps {
  NFT: NftType;
  setNftToBuy: (NFT: NftType) => void;
  user: UserType;
  setUser: (u: UserType) => void;
  type: string | null;
  setExp: (n: number) => void;
  setNotAvailable: (b: boolean) => void;
  setModalExpand: (b: boolean) => void;
  capsValue: number;
}

const NFTPage: React.FC<NFTPageProps> = ({
  setExp,
  NFT,
  setNftToBuy,
  setModalExpand,
  setNotAvailable,
  user,
  setUser,
  type,
}) => {
  const [likeLoading, setLikeLoading] = useState(false);
  const [modalShareOpen, setModalShareOpen] = useState(false);
  const bgGradient = { background: gradient(NFT.ownerData.name) };
  const shareSubject = 'Check out this Secret NFT';
  const shareText = `Check out ${NFT.name ? NFT.name : 'this nft'} on ${
    process.env.NEXT_PUBLIC_APP_LINK
      ? process.env.NEXT_PUBLIC_APP_LINK
      : 'secret-nft.com'
  }`;
  const shareUrl =
    (typeof window !== 'undefined' && window.location?.href) ||
    `https://www.${
      process.env.NEXT_PUBLIC_APP_LINK
        ? process.env.NEXT_PUBLIC_APP_LINK
        : 'secret-nft.com'
    }/nft/${NFT.id}`;
  const isLiked = !user
    ? undefined
    : NFT.serieId === '0'
    ? user.likedNFTs?.map((x) => x.nftId).includes(NFT.id)
    : user.likedNFTs?.map((x) => x.serieId).includes(NFT.serieId);
  const numberListedOnThisMarketplace = !NFT.serieData
    ? 0
    : NFT.serieData.reduce(
        (prev, current) =>
          prev +
          (current?.listed === 1 && current.marketplaceId === MARKETPLACE_ID
            ? 1
            : 0),
        0
      );
  const smallestPriceRow = (!NFT.serieData || NFT.serieData.length<=1) ? 
    NFT
  : 
    NFT.serieData.filter(x=>x.marketplaceId === MARKETPLACE_ID).sort(
      (a, b) =>
        (a.owner === b.owner ? 0 : (!user ? 0 : (a.owner===user.walletId ? 1 : (b.owner===user.walletId ? -1 : 0)))) || // take nft which i'm not owner first
        b.listed - a.listed || //listed first
        Number(a.price) - Number(b.price) || //lowest price first
        Number(a.priceTiime) - Number(b.priceTiime) // lower pricetiime first
    )[0];
  const userCanBuy = user ? 
      user.capsAmount &&
      smallestPriceRow &&
      smallestPriceRow.listed &&
      smallestPriceRow.price &&
      smallestPriceRow.price !== '' &&
      Number(user.capsAmount) >= Number(smallestPriceRow.price) &&
      user.walletId !== smallestPriceRow.owner &&
      smallestPriceRow.marketplaceId === MARKETPLACE_ID
    : 
      smallestPriceRow ? 
        smallestPriceRow.listed===1 && smallestPriceRow.marketplaceId === MARKETPLACE_ID 
      : 
        false;

  useEffect(() => {
    setNftToBuy(smallestPriceRow);
  }, [smallestPriceRow]);

  const handleLikeDislike = async () => {
    try {
      let res = null;
      if (!likeLoading && user) {
        setLikeLoading(true);
        if (!isLiked) {
          res = await likeNFT(user.walletId, NFT.id, NFT.serieId);
        } else {
          res = await unlikeNFT(user.walletId, NFT.id, NFT.serieId);
        }
      }
      if (res !== null) setUser({ ...user, ...res });
      setLikeLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleShare = async () => {
    try {
      // TODO : Make share with native
      // if (window && window.isRNApp && navigator){
      //   await navigator.share({
      //     title: shareSubject,
      //     text: shareText,
      //     url: shareUrl
      //   })
      // }else{
      //   setModalShareOpen(true)
      // }
      setModalShareOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBuy = () => {
    setNftToBuy(smallestPriceRow)
    setExp(2)
  }

  return (
    <div className={style.Container}>
      <div className={style.MainWrapper}>
        <div className={style.Wrapper}>
          <div className={style.NFT}>
            <Media
              src={NFT.media.url}
              type={type}
              alt="imgnft"
              draggable="false"
              className={style.NFTIMG}
            />
            <div onClick={() => setExp(1)} className={style.Scale}>
              <Scale className={style.ScaleSVG} />
            </div>
          </div>
          <div className={style.Text}>
            <div className={style.Top}>
              <div className={style.TopInfosCreator}>
                <div className={style.TopInfosCreatorPicture}>
                  {NFT.creatorData?.picture || NFT.creatorData?.name ? (
                    <Creator
                      className={style.TopInfosCreatorPictureIMG}
                      size={'fullwidth'}
                      user={NFT.creatorData}
                    />
                  ) : (
                    <div
                      className={style.TopInfosCreatorPictureIMG}
                      style={bgGradient}
                    />
                  )}
                </div>
                <div className={style.TopInfosCreatorName}>
                  {NFT.creatorData.name}
                  <span className={style.creatorTwitterUsername}>
                    {NFT.creatorData?.twitterName
                      ? NFT.creatorData.twitterName
                      : null}
                  </span>
                </div>
              </div>
              <div className={style.TopInfos}>
                <div className={style.Views}>
                  <Eye className={style.EyeSVG} />
                  {NFT.viewsCount}
                </div>
                <div
                  className={`${style.Like} ${isLiked ? style.Liked : ''} ${
                    likeLoading || !user ? style.DisabledLike : ''
                  }`}
                  onClick={() => handleLikeDislike()}
                >
                  <Like className={style.LikeSVG} />
                </div>
                <div className={style.Share} onClick={() => handleShare()}>
                  <Share className={style.ShareSVG} />
                </div>
              </div>
            </div>
            <div className={style.Line} />
            <div className={style.Hide}>
              <div className={style.Tags}>
                <div className={style.Tag}>
                  <span role="img" className={style.Emoji} aria-label="art">
                    🎨
                  </span>
                  Design
                </div>
              </div>
            </div>
            <h1 className={style.Title}>{NFT.name}</h1>
            <p className={style.Description}>{NFT.description}</p>
            <div className={style.Buy}>
              <div
                onClick={() =>
                  userCanBuy && 
                  handleBuy()
                }
                className={
                  userCanBuy ? 
                    style.Button
                  : 
                    `${style.Button} ${style.Disabled}`
                }
              >
                Buy {`${smallestPriceRow && (smallestPriceRow.price || smallestPriceRow.priceTiime) ? "for " : ""}`}
                {smallestPriceRow && (
                  <>
                    {smallestPriceRow.price &&
                      Number(smallestPriceRow.price) > 0 &&
                      `${computeCaps(Number(smallestPriceRow.price))} CAPS`}
                    {smallestPriceRow.price &&
                      Number(smallestPriceRow.price) > 0 &&
                      smallestPriceRow.priceTiime &&
                      Number(smallestPriceRow.priceTiime) &&
                      ` / `}
                    {smallestPriceRow.priceTiime &&
                      Number(smallestPriceRow.priceTiime) > 0 &&
                      `${computeTiime(
                        Number(smallestPriceRow.priceTiime)
                      )} TIIME`}
                  </>
                )}
              </div>
            </div>
            <div className={style.Available}>
              <div className={style.AvailbleText}>
                <NoNFTImage className={style.AvailbleCards} />
                {`${numberListedOnThisMarketplace} of ${
                  NFT.serieData ? NFT.serieData.length : 0
                }`}{' '}
                Available
              </div>
              <div className={style.AvailableBackLine} />
            </div>
          </div>
        </div>
        <div>
          <Details
            NFT={NFT}
            user={user}
            setNftToBuy={setNftToBuy}
            setExp={setExp}
          />
        </div>
      </div>
      <Footer setNotAvailable={setNotAvailable} />
      <FloatingHeader user={user} setModalExpand={setModalExpand} />
      {modalShareOpen && (
        <ModalShare
          setModalExpand={setModalShareOpen}
          title={'Share this NFT with your friends'}
          subject={shareSubject}
          text={shareText}
          url={shareUrl}
        />
      )}
    </div>
  );
};

export default NFTPage;
