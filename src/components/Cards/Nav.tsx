/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import { Col, Badge } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import NavButton from './NavButton';

import {
  GET_UNREAD_FOLLOWERS,
  GET_UNREAD_FRIENDS,
} from '../../graphql/queries';

const trapezoid = css`
  width: 250px;
  height: 20px;
  background: #999999;
  transform: perspective(10px) rotateX(3deg);
  margin: 0 auto;
`;

type NavProps = {
  history: any;
  state: string;
};

type NavButtonMadeProps = {
  relation: string;
  subject: string;
};

export default function Nav({ history, state }: NavProps) {
  const { data: unreadFollowers } = useQuery(GET_UNREAD_FOLLOWERS);
  const { data: unreadFriends } = useQuery(GET_UNREAD_FRIENDS);

  // 아래 중복 제거 과정 뭔가 부자연스러움. NavButtonMade도 밖으로 빼기?
  const NavButtonMade = ({ relation, subject }: NavButtonMadeProps) => (
    <NavButton
      relation={relation}
      subject={subject}
      history={history}
      state={state}
    />
  );

  return (
    <React.Fragment>
      <Col xs={24} md={8}>
        {unreadFriends && unreadFriends.unreadFriends > 0 ? (
          <Badge count={unreadFriends.unreadFriends} overflowCount={999}>
            <NavButtonMade relation="friends" subject="헬스 친구" />
          </Badge>
        ) : (
          <NavButtonMade relation="friends" subject="헬스 친구" />
        )}
        {state === 'friends' ? <div css={trapezoid} /> : null}
      </Col>
      <Col xs={24} md={8}>
        <NavButtonMade relation="following" subject="보낸 요청" />
        {state === 'following' ? <div css={trapezoid} /> : null}
      </Col>
      <Col xs={24} md={8}>
        {unreadFollowers && unreadFollowers.unreadFollowers > 0 ? (
          <Badge count={unreadFollowers.unreadFollowers} overflowCount={999}>
            <NavButtonMade relation="followers" subject="받은 요청" />
          </Badge>
        ) : (
          <NavButtonMade relation="followers" subject="받은 요청" />
        )}
        {state === 'followers' ? <div css={trapezoid} /> : null}
      </Col>
    </React.Fragment>
  );
}
