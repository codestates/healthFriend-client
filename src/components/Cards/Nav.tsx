import React from 'react';
import { Col, Badge } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import NavButton from './NavButton';

import {
  GET_UNREAD_FOLLOWERS,
  GET_UNREAD_FRIENDS,
} from '../../graphql/queries';

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
    <>
      <Col xs={8} md={8}>
        {unreadFriends && unreadFriends.unreadFriends > 0 ? (
          <Badge count={unreadFriends.unreadFriends} overflowCount={999}>
            <NavButtonMade relation="friends" subject="헬스 친구" />
          </Badge>
        ) : (
          <NavButtonMade relation="friends" subject="헬스 친구" />
        )}
      </Col>
      <Col xs={8} md={8}>
        <NavButtonMade relation="following" subject="보낸 요청" />
      </Col>
      <Col xs={8} md={8}>
        {unreadFollowers && unreadFollowers.unreadFollowers > 0 ? (
          <Badge count={unreadFollowers.unreadFollowers} overflowCount={999}>
            <NavButtonMade relation="followers" subject="받은 요청" />
          </Badge>
        ) : (
          <NavButtonMade relation="followers" subject="받은 요청" />
        )}
      </Col>
    </>
  );
}
