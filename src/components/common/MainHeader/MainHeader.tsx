import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import Logo from '../assets/LogoTernoa';

import { H3 } from '../Title/Title';
import { ReactComponent as TernoaLogo } from '../assets/logo-ternoa.svg';
import { ReactComponent as Caps } from '../assets/caps.svg';

import style from './MainHeader.module.scss';


type MainHeaderType = {
  walletId: string;
};

const MainHeader: React.FC<MainHeaderType> = ({ walletId }) => {

  const [searchValue, setSearchValue] = useState('' as string);

  const history = useHistory();
  const { t } = useTranslation();

  const updateKeywordSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  };

  return (
    <div className={style.Header}>
      <div className={style.HeaderContainer}>
        <Logo className={style.Logo} onClick={e => true} />
        <div className={style.SearchBar}>
          <input type="search" onChange={updateKeywordSearch} className={style.Input} placeholder="Search" />
        </div>
        <div className={style.Infos}>
          <div className={style.Links}>
            <a className={style.LinkItem} href="#">Explore</a>
            <a className={style.LinkItem} href="#">How it works ?</a>
            <a className={style.LinkItem} href="#">Support</a>
          </div>
          <div className={style.Wallet}> {walletId ?
            <div>connected</div>
            :
            <div className={style.Regular}>
              <div className={style.Create}>Create NFT</div>
              <div className={style.Connect}>Connect</div>
            </div>}
          </div>
        </div>
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
