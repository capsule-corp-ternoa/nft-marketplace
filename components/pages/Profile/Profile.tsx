import React, { useState } from 'react';
import Link from 'next/link';
//import { useTranslation } from 'react-i18next';
import style from './Profile.module.scss';
import Footer from 'components/base/Footer';
import FloatingHeader from 'components/base/FloatingHeader';
import NFTCard from 'components/base/NftCard';
import Creator from 'components/base/Creator';

import Sidebar from './Sidebar';
import FloatingMenu from './FloatingMenu';
import Edit from './Edit';
import Switch from 'react-switch';

const Profile: React.FC<any> = ({ item, NFTS, creators, setModalExpand }) => {
  //const { t } = useTranslation();
  const [isFiltered, setIsFiltered] = useState(false);
  const [scope, setScope] = useState('My NFTs on sale');
  const [expand, setExpand] = useState(false);
  const [, setSearchValue] = useState('' as string);

  const updateKeywordSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  };

  function returnTitle() {
    return scope;
  }

  function returnNFTs() {
    return NFTS.map((item: any) => (
      <div key={item.id} className={style.NFTShell}>
        <NFTCard mode="grid" item={item} />
      </div>
    ));
  }

  function returnCategory() {
    if (scope === 'Followings' || scope === 'Followers') {
      return (
        <div className={style.NFTs}>
          <div className={style.Top}>
            <h3 className={style.NFTTitle}>{returnTitle()}</h3>
            <div className={style.SearchContainer}>
              <div className={style.SearchBar}>
                <input
                  type="search"
                  onChange={updateKeywordSearch}
                  className={style.Input}
                  placeholder="Search"
                />
              </div>
              <div className={style.Toggle}>
                <label>
                  <Switch
                    checked={isFiltered}
                    onChange={() => setIsFiltered(!isFiltered)}
                    offColor="#000000"
                    onColor="#7417ea"
                    uncheckedIcon={false}
                    checkedIcon={false}
                    width={46}
                    handleDiameter={23}
                    className={style.SwitchShell}
                  />
                </label>
                <span className={style.Label}>Certified only</span>
              </div>
            </div>
          </div>
          <div className={style.FollowsContainer}>{returnCreators()}</div>
        </div>
      );
    }
    if (scope === 'edit') {
      return <Edit item={item} />;
    } else {
      return (
        <div className={style.NFTs}>
          <h3 className={style.NFTTitle}>{returnTitle()}</h3>
          <div className={style.NFTsContainer}>{returnNFTs()}</div>
        </div>
      );
    }
  }

  function returnCreators() {
    return creators.map((item: any) => (
      <div key={item.id} className={style.CreatorShell}>
        <Link href={`/${item.name}`}>
          <a>
            <Creator item={item} size="small" showTooltip={false} />
          </a>
        </Link>

        <div className={style.CreatorInfos}>
          <Link href={`/${item.name}`}>
            <a>
              <h2 className={style.CreatorName}>{item.name}</h2>
            </a>
          </Link>
          <span className={style.CreatorFollowers}>{item.caps} followers</span>
          <div onClick={(e) => e.stopPropagation()} className={style.Unfollow}>
            Unfollow
          </div>
        </div>
      </div>
    ));
  }

  return (
    <div className={style.Container}>
      <div className={style.Banner}>
        <img
          className={style.BannerIMG}
          src="https://images.unsplash.com/photo-1529641484336-ef35148bab06?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80"
          alt="banner"
        />
        {scope === 'edit' && (
          <div className={style.EditButton}>Edit banner</div>
        )}
      </div>
      <div className={style.Wrapper}>
        <Sidebar
          item={item}
          scope={scope}
          setScope={setScope}
          setExpand={setExpand}
        />
        {returnCategory()}
      </div>
      <FloatingHeader setModalExpand={setModalExpand} item={item} />
      <Footer />
      {expand && (
        <FloatingMenu setScope={setScope} scope={scope} setExpand={setExpand} />
      )}
    </div>
  );
};

export default Profile;
