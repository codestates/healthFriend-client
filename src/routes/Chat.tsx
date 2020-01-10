/** @jsx jsx */
import { useState } from 'react';
import { Row, Col, Button } from 'antd';
import { /* css, */ jsx } from '@emotion/core';
import { useQuery, useLazyQuery, useApolloClient } from '@apollo/react-hooks';

import {
  IS_LOGGED_IN,
  GET_FOLLOWING,
  GET_FRIENDS,
  GET_FOLLOWERS,
} from '../graphql/queries';
import Loading from '../components/Shared/Loading';
import ErrorLoginFirst from '../components/Shared/ErrorLoginFirst';
import UserCard from '../components/FindFriend/UserCard';
import redirectWhenTokenExp from '../utils/redirectWhenTokenExp';
import message from '../config/Message';

type ChatProps = {
  history: any; // match, location을 같이 쓰니 안되고, 얘만 쓰니 되네... withRouter로 붙인 애들은 다 써줘야 하는 것 같고, 아닌 애들은 아닌 듯.
};

function Chat({ history }: ChatProps) {
  const client = useApolloClient();
  const { data: loginData } = useQuery(IS_LOGGED_IN);
  const [list, setList] = useState<string>('');

  const [
    getFollowers,
    { loading: loadingFollowers, error: errorFollowers, data: dataFollowers },
  ] = useLazyQuery(GET_FOLLOWERS, {
    fetchPolicy: 'network-only', // 각 옵션에는 모두 이유가 있게.
  });
  const [
    getFollowing,
    { loading: loadingFollowing, error: errorFollowing, data: dataFollowing },
  ] = useLazyQuery(GET_FOLLOWING, {
    fetchPolicy: 'network-only',
  });
  const [
    getFriends,
    { loading: loadingFriends, error: errorFriends, data: dataFriends },
  ] = useLazyQuery(GET_FRIENDS, {
    fetchPolicy: 'network-only',
  });

  // react가 SPA이기 때문에 주소창에 주소를 쳐서 들어오면 state가 무조건 initial로 돌아가면서 isLoggedIn = false로 되게 된다. 그래서 로긴 무조건 다시 하라고 뜨게 됨.
  if (!loginData.isLoggedIn) return <ErrorLoginFirst error={null} />;

  const renewFriends = () => {
    if (list === 'friends') return getFriends;
    if (list === 'followers') return getFollowers;
    if (list === 'following') return getFollowing;
  };

  const makeFriend = (oneData, type) => {
    return (
      <UserCard
        id={oneData.id}
        key={oneData.email}
        nickname={oneData.nickname}
        gender={oneData.gender}
        openImageChoice={oneData.openImageChoice}
        messageToFriend={oneData.messageToFriend}
        motivations={oneData.motivations}
        levelOf3Dae={oneData.levelOf3Dae}
        weekdays={oneData.weekdays}
        ableDistricts={oneData.ableDistricts}
        type={type}
        renewFriends={renewFriends()}
      />
    );
  };

  function FriendList() {
    if (list === 'friends') {
      if (dataFriends && dataFriends.me.friends.length > 0) {
        return dataFriends.me.friends.map((oneData) =>
          makeFriend(oneData, list),
        );
      }
      if (loadingFriends) return <Loading />;
      if (errorFriends) redirectWhenTokenExp(history, client);
      return <p>{message.friendsEmpty}</p>;
    }
    if (list === 'followers') {
      if (dataFollowers && dataFollowers.me.followers.length > 0) {
        return dataFollowers.me.followers.map((oneData) =>
          makeFriend(oneData, list),
        );
      }
      if (loadingFollowers) return <Loading />;
      if (errorFollowers) redirectWhenTokenExp(history, client);
      return <div>{message.followersEmpty}</div>;
    }
    if (list === 'following') {
      if (dataFollowing && dataFollowing.me.following.length > 0) {
        return dataFollowing.me.following.map((oneData) =>
          makeFriend(oneData, list),
        );
      }
      if (loadingFollowing) return <Loading />;
      if (errorFollowing) redirectWhenTokenExp(history, client);
      return <div>{message.followingEmpty}</div>;
    }
    return <div>{message.chatRoomWelcome}</div>;
  }

  return (
    <div>
      <br />
      <Row type="flex" justify="center">
        <Col xs={24} md={5}>
          <Button
            type="primary"
            onClick={() => {
              getFriends();
              setList('friends');
            }}
          >
            헬스 친구
          </Button>
        </Col>
        <Col xs={24} md={5}>
          <Button
            type="primary"
            onClick={() => {
              getFollowing();
              setList('following');
            }}
          >
            보낸 요청
          </Button>
        </Col>
        <Col xs={24} md={5}>
          <Button
            type="primary"
            onClick={() => {
              getFollowers();
              setList('followers');
            }}
          >
            받은 요청
          </Button>
        </Col>
        <Col xs={24} md={5}>
          <Button type="primary">채팅창</Button>
        </Col>
        <br />
        <br />
        <Col xs={24} md={22}>
          <FriendList />
        </Col>
      </Row>
    </div>
  );
}

export default Chat;
