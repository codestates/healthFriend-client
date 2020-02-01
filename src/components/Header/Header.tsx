/** @jsx jsx */
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu, Badge } from 'antd';
import { css, jsx } from '@emotion/core';
import { useQuery, useApolloClient } from '@apollo/react-hooks';

import MypageDropdown from './MypageDropdown';
import {
  GET_USERINFO,
  IS_LOGGED_IN,
  GET_UNREAD,
  SUBSCRIBE_FOLLOWERS,
  SUBSCRIBE_FRIENDS,
} from '../../graphql/queries';

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
  background: #5075af;
`;

const navLinkItem = css`
  color: #fff !important;
  font-size: 1rem;
  height: 62px;
  display: flex !important;
  align-items: center;
`;

export default function Header() {
  const client = useApolloClient();
  const { data: loginData } = useQuery(IS_LOGGED_IN);
  const { data: unread } = useQuery(GET_UNREAD);
  const { subscribeToMore, data: dataMe, refetch: refetchMe } = useQuery(
    GET_USERINFO,
    {
      fetchPolicy: 'network-only',
    },
  );

  useEffect(() => {
    subscribeToMore({
      document: SUBSCRIBE_FOLLOWERS,
      updateQuery: () => {
        refetchMe();
      },
    });
    subscribeToMore({
      document: SUBSCRIBE_FRIENDS,
      updateQuery: () => {
        refetchMe();
      },
    });
    // 이렇게 아래처럼 다시 수거해가는 부분 없어도 되나?
    // return () => {
    //   subscribeToMore({
    //     document: SUBSCRIBE_FOLLOWERS,
    //   });
    // };
    // eslint-disable-next-line
  }, []);

  // home에서 불리는 순서랑 얘가 cache data 낚아오는 순서랑... 로직을 생각해봐야 할듯. 얘도 데이터 들어옴에 따라 re-render되나? 값 바뀌면 redux처럼 re-render되는 듯 함.

  if (dataMe && dataMe.me /* && !unread */) {
    client.writeData({
      data: {
        unread:
          dataMe.me.followers.filter((elm) => !elm.checked).length +
          dataMe.me.friends.filter((elm) => !elm.checked).length,
        unreadFollowers: dataMe.me.followers.filter((elm) => !elm.checked)
          .length,
        unreadFriends: dataMe.me.friends.filter((elm) => !elm.checked).length,
      },
    });
  }

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

      {loginData.isLoggedIn && dataMe && dataMe.me ? (
        <React.Fragment>
          <Menu mode="horizontal" css={navMenu}>
            <Menu.Item>
              {dataMe.me.motivations.length > 0 &&
              dataMe.me.weekdays.length > 0 &&
              dataMe.me.ableDistricts.length > 0 ? null : (
                <NavLink to="/register" className="item" css={navLinkItem}>
                  내 정보등록
                </NavLink>
              )}
            </Menu.Item>
            <Menu.Item>
              <NavLink to="/find" className="item" css={navLinkItem}>
                친구찾기
              </NavLink>
            </Menu.Item>
            {unread && unread.unread !== 0 ? (
              <Menu.Item>
                <Badge
                  count={unread.unread}
                  overflowCount={999}
                  offset={[0, 12]}
                  // style={{ fontSize: '30px' }}
                >
                  <NavLink
                    to="/cards/friends"
                    className="item"
                    css={navLinkItem}
                  >
                    친구카드
                  </NavLink>
                </Badge>
              </Menu.Item>
            ) : (
              <Menu.Item>
                <NavLink to="/cards/friends" className="item" css={navLinkItem}>
                  친구카드
                </NavLink>
              </Menu.Item>
            )}
            <Menu.Item>
              <NavLink to="/chat" className="item" css={navLinkItem}>
                채팅
              </NavLink>
            </Menu.Item>
            <Menu.Item>
              <MypageDropdown name={dataMe.me.nickname} />
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
