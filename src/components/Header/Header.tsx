/** @jsx jsx */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { css, jsx } from '@emotion/core';
import { useQuery } from '@apollo/react-hooks';

import MypageDropdown from './MypageDropdown';
import { GET_USERINFO, IS_LOGGED_IN } from '../../graphql/queries';

const logo = css`
  width: 120px;
  float: left;
`;

const navMenu = css`
  float: right;
  background: transparent;
  border: 0;

  & .ant-menu-item {
    height: 100%;
    border-bottom: 0 !important;

    &.ant-menu-item-selected {
      background: transparent !important;
    }

    & > .ant-dropdown-trigger {
      color: #fff !important;
      height: 62px;
      display: flex !important;
      align-items: center;
    }
  }
`;

const navHeader = css`
  background: #1e272e;
`;

const navLinkItem = css`
  color: #fff !important;
  font-size: 1rem;
  height: 62px;
  display: flex !important;
  align-items: center;
`;

export default function Header() {
  const { data: loginData } = useQuery(IS_LOGGED_IN);

  const { data } = useQuery(GET_USERINFO);

  return (
    <Layout.Header className="header" css={navHeader}>
      <div css={logo}>
        <NavLink
          exact
          to="/"
          className="item"
          activeClassName="active"
          css={navLinkItem}
        >
          헬스친구
        </NavLink>
      </div>

      {loginData.isLoggedIn && data && data.me ? (
        <React.Fragment>
          <Menu mode="horizontal" css={navMenu}>
            <Menu.Item>
              {/* {data.me.levelOf3Dae && data.me.messageToFriend ? null : ( */}
              <NavLink to="/register" className="item" css={navLinkItem}>
                등록
              </NavLink>
              {/* )} */}
            </Menu.Item>
            <Menu.Item>
              <NavLink to="/find" className="item" css={navLinkItem}>
                친구찾기
              </NavLink>
            </Menu.Item>
            <Menu.Item>
              <NavLink to="/chat" className="item" css={navLinkItem}>
                채팅
              </NavLink>
            </Menu.Item>
            <Menu.Item>
              <MypageDropdown name={data.me.nickname} />
            </Menu.Item>
          </Menu>
        </React.Fragment>
      ) : (
        <Menu mode="horizontal" css={navMenu}>
          <Menu.Item>
            <NavLink to="/login" className="item" css={navLinkItem}>
              로그인
            </NavLink>
          </Menu.Item>
        </Menu>
      )}

      {/* {loginData.isLoggedIn && data && data.me ? (
        <MypageDropdown name={data.me.nickname} />
      ) : (
        <Menu mode="horizontal" css={navMenu}>
          <Menu.Item>
            <NavLink to="/login" className="item" css={navLinkItem}>
              로그인
            </NavLink>
          </Menu.Item>
        </Menu>
      )} */}
    </Layout.Header>
  );
}
