import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import colors from '../../ui-library/styles/colors';
import { H3 } from '../../Title/Title';

const FooterMenu = styled.ul`
  list-style: none;
  padding-left:0px;
`;

const FooterMenuElement = styled.li`
  display: block;
  margin: 0 10px;
  line-height: 25px;
  & a {
    color: ${colors.dark_blue};
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    text-decoration: none;
  }
`;

export type MenuElementType = {
  id: number;
  uri: string,
  text: string,
  isInternal: boolean,
};

type FooterSubMenuType = {
  subTitle: string;
  menuElements: MenuElementType[];
};

const FooterSubMenu: React.FC<FooterSubMenuType> = (props) => (
  <>
    <H3>{props.subTitle}</H3>
    <FooterMenu>
      {props.menuElements.map((menu, index) => (
        <FooterMenuElement key={menu.id}>
          {menu.isInternal ?
            (<Link to={menu.uri}>{menu.text}</Link>)
            :
            (<a href={menu.uri}>{menu.text}</a>)}
        </FooterMenuElement>
      ))}
    </FooterMenu>
  </>
);

export default FooterSubMenu;
