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

  const { data } = useQuery(GET_USERINFO, {
    fetchPolicy: 'cache-only',
  });
  // home에서 불리는 순서랑 얘가 cache data 낚아오는 순서랑... 로직을 생각해봐야 할듯. 얘도 데이터 들어옴에 따라 re-render되나? 값 바뀌면 redux처럼 re-render되는 듯 함.

  // console.log('로그인 상태 in header', loginData.isLoggedIn);
  // console.log('data in header', data);

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
              {/* {data.me.levelOf3Dae &&
              data.me.gender &&
              data.me.openImageChoice ? null : ( */}
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
              <NavLink to="/cards/friends" className="item" css={navLinkItem}>
                친구카드
              </NavLink>
            </Menu.Item>
            <Menu.Item>
              <MypageDropdown name={data.me.nickname} meId={data.me.id} />
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
    </Layout.Header>
  );
}
