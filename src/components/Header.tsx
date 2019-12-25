// eslint-disable-next-line
import React from 'react';
import { NavLink } from 'react-router-dom';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

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

const IS_LOGGED_IN = gql`
  {
    me {
      email
    }
  }
`;

export default function Header() {
  const { data } = useQuery(IS_LOGGED_IN, {
    notifyOnNetworkStatusChange: true,
  });
  console.log('data', data);

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
      <NavLink to="/register" className="item" css={navLinkItem}>
        등록
      </NavLink>
      <NavLink to="/find" className="item" css={navLinkItem}>
        친구찾기
      </NavLink>
      <NavLink to="/chat" className="item" css={navLinkItem}>
        채팅
      </NavLink>
      {data ? (
        <NavLink to="/mypage" className="item" css={navLinkItem}>
          마이페이지
        </NavLink>
      ) : (
        <NavLink to="/login" className="item" css={navLinkItem}>
          로그인
        </NavLink>
      )}
    </div>
  );
}
