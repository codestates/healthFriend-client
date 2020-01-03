/** @jsx jsx */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { css, jsx } from '@emotion/core';
import { useQuery } from '@apollo/react-hooks';

import MypageDropdown from './MypageDropdown';
import { GET_USERINFO } from '../../graphql/queries';

const navHeader = css`
  background-color: #1e272e;
  display: table;
  table-layout: fixed;
  width: 100%;
`;

const navLinkItem = css`
  text-align: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: table-cell;
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  &:hover {
    background-color: #485460;
    color: white;
  }
  &:active {
    background-color: #7d97ad;
  }
`;

// api로 call 안 하고, cache에서 찾아서 data 받는건?
// 로그인 과정에서 api call을 하면 cache에 이후 자동으로 저장되는건지도 확인

export default function Header() {
  const { data } = useQuery(GET_USERINFO, {
    fetchPolicy: 'network-only',
  });

  // const client = useApolloClient();
  // const todos = client.readQuery({
  //   query: IS_LOGGED_IN,
  // });

  return (
    <div className="header" css={navHeader}>
      <NavLink
        exact
        to="/"
        className="item"
        activeClassName="active"
        css={navLinkItem}
      >
        헬친
      </NavLink>
      {data ? (
        <React.Fragment>
          {/* {data.me.levelOf3Dae && data.me.messageToFriend ? null : ( */}
          <NavLink to="/register" className="item" css={navLinkItem}>
            등록
          </NavLink>
          {/* )} */}
          <NavLink to="/find" className="item" css={navLinkItem}>
            친구찾기
          </NavLink>
          <NavLink to="/chat" className="item" css={navLinkItem}>
            채팅
          </NavLink>
        </React.Fragment>
      ) : null}

      {data ? (
        <MypageDropdown name={data.me.nickname} />
      ) : (
        <NavLink to="/login" className="item" css={navLinkItem}>
          로그인
        </NavLink>
      )}
    </div>
  );
}
