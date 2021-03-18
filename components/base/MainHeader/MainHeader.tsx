/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from "react";
//import { useTranslation } from 'react-i18next';

import Logo from "components/assets/LogoTernoa";
import Creator from "../Creator";

import style from "./MainHeader.module.scss";

const MainHeader: React.FC<any> = ({ setModalExpand }) => {
  const [, setSearchValue] = useState("" as string);
  const [isExpanded, setIsExpanded] = useState(false);
  //const { t } = useTranslation();

  // to update when wallet API will be integrated
  const walletId = null;
  const item: any = null;

  /*
  const walletId = {
    id: 61768,
  };

  const item = {
    name: 'Takeshi Kovacs',
    caps: 78029,
    img:
      'https://images.unsplash.com/photo-1497551060073-4c5ab6435f12?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1267&q=80',
    verified: true,
    id: 9,
  };
  */

  const updateKeywordSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  };

  return (
    <div className={style.Header}>
      <div className={style.HeaderContainer}>
        <Logo className={style.Logo} onClick={() => true} />
        <div className={style.SearchBar}>
          <input
            type="search"
            onChange={updateKeywordSearch}
            className={style.Input}
            placeholder="Search"
          />
        </div>
        <div className={style.Infos}>
          <div className={style.Links}>
            <a className={style.LinkItem} href="/">
              Explore
            </a>
            <a className={style.LinkItem} href="/">
              How it works ?
            </a>
            <a className={style.LinkItem} href="/">
              Support
            </a>
          </div>
          <div className={style.Wallet}>
            {walletId ? (
              <div className={style.Regular}>
                <div className={style.Create}>Create NFT</div>
                <div
                  onClick={() => setIsExpanded(!isExpanded)}
                  className={style.Profile}
                >
                  <div className={style.Caps}>
                    <span className={style.NumberCaps}>{item?.caps}</span>
                    caps
                  </div>
                  <div className={style.ProfileImageContainer}>
                    <img
                      className={style.ProfileImage}
                      src={item?.img}
                      alt="profile"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className={style.Regular}>
                <div className={style.Create}>Create NFT</div>
                <div
                  onClick={() => setModalExpand(true)}
                  className={style.Connect}
                >
                  Connect
                </div>
              </div>
            )}
          </div>
        </div>
        {walletId && item && isExpanded && (
          <div className={style.Dropdown}>
            <div className={style.DropdownContainer}>
              <div className={style.DropdownProfile}>
                <Creator item={item} size="xsmall" showTooltip={false} />
                <div className={style.Name}>{item?.name}</div>
              </div>

              <div className={style.Section}>
                <div className={style.SectionTitle}>
                  Wallet :
                  <span className={style.SectionWallet}>
                    gdt67fx6.....ej636373BH
                  </span>
                </div>
              </div>
              <div className={style.Section}>
                <div className={style.SectionTitle}>Profile</div>
              </div>
              <div className={style.Section}>
                <div className={style.SectionTitle}>Account</div>
              </div>
              <div className={style.Section}>
                <div className={style.SectionTitle}>Disconnect</div>
              </div>
            </div>
            <div className={style.CapsSection}>
              <span>My wallet</span>
              <div className={style.CapsPrice}>{item?.caps} Caps</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainHeader;

/*

<ContainerHeader>

            <Row>

                <Col small="50" medium="20" large="20">
                    <TitleHeader role="button" tabIndex={0} onClick={() => { history.push('/'); }}>
                        <TernoaLogo />
                        <span>&nbsp; Ternoa Stamp</span>
                    </TitleHeader>

                </Col>

                <Col small="50" medium="40" large="40">
                    <SearchStyled>
                        <FaSearchStyled />
                        <InputStyled onChange={updateKeywordSearch} full placeholder={t('header.find')} type="search" />
                    </SearchStyled>
                </Col>


                <Col small="100" medium="40" large="40">
                    <div>

                        <Button
                            onClick={() => { history.push(`/search?q=${searchValue}`); }}
                        >
                            <FaSearch />
                        </Button>

                        <Button
                            primary
                            onClick={() => { history.push('/create'); }}
                        >
                            {t('header.createButton')}
                        </Button>

                        {walletId ?

                            (
                                <Button
                                    onClick={() => { history.push('/profile-top'); }}
                                >
                                    <span>{walletId} &nbsp; <Caps /></span>
                                </Button>
                            )
                            :
                            (
                                <Button
                                    onClick={() => { history.push('/connect-wallet'); }}
                                >
                                    <span>{t('header.connectWallet')} </span>
                                </Button>
                            )}


                    </div>

                </Col>
            </Row>
        </ContainerHeader>



*/
