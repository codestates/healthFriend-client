import React from 'react';
import { Col, Button, Badge } from 'antd';
import { useQuery } from '@apollo/react-hooks';

import {
  GET_UNREAD_FOLLOWERS,
  GET_UNREAD_FRIENDS,
} from '../../graphql/queries';

type NavProps = {
  history: any;
  state: string;
};

export default function Nav({ history, state }: NavProps) {
  const { data: unreadFollowers } = useQuery(GET_UNREAD_FOLLOWERS);
  const { data: unreadFriends } = useQuery(GET_UNREAD_FRIENDS);

  // 아래 중복들 제거하기
  return (
    <>
      <Col xs={24} md={5}>
        {unreadFriends && unreadFriends.unreadFriends > 0 ? (
          <Badge count={unreadFriends.unreadFriends} overflowCount={999}>
            <Button
              type={state === 'friends' ? 'primary' : 'default'}
              onClick={() => {
                history.push('/cards/friends');
              }}
            >
              헬스 친구
            </Button>
          </Badge>
        ) : (
          <Button
            type={state === 'friends' ? 'primary' : 'default'}
            onClick={() => {
              history.push('/cards/friends');
            }}
          >
            헬스 친구
          </Button>
        )}
      </Col>
      <Col xs={24} md={5}>
        <Button
          type={state === 'following' ? 'primary' : 'default'}
          onClick={() => {
            history.push('/cards/following');
          }}
        >
          보낸 요청
        </Button>
      </Col>
      <Col xs={24} md={5}>
        {unreadFollowers && unreadFollowers.unreadFollowers > 0 ? (
          <Badge count={unreadFollowers.unreadFollowers} overflowCount={999}>
            <Button
              type={state === 'followers' ? 'primary' : 'default'}
              onClick={() => {
                history.push('/cards/followers');
              }}
            >
              받은 요청
            </Button>
          </Badge>
        ) : (
          <Button
            type={state === 'followers' ? 'primary' : 'default'}
            onClick={() => {
              history.push('/cards/followers');
            }}
          >
            받은 요청
          </Button>
        )}
      </Col>
    </>
  );
}
