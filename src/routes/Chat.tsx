/** @jsx jsx */
import { useState } from 'react';
import { Row, Col, Button } from 'antd';
import { /* css, */ jsx } from '@emotion/core';
import { useQuery, useLazyQuery, useApolloClient } from '@apollo/react-hooks';

import {
  GET_USERS,
  IS_LOGGED_IN,
  GET_FOLLOWING,
  GET_FRIENDS,
  GET_FOLLOWERS,
} from '../graphql/queries';
import Loading from '../components/Shared/Loading';
import ErrorLoginFirst from '../components/Shared/ErrorLoginFirst';
import UserCard from '../components/FindFriend/UserCard';

function Chat() {
  const client = useApolloClient();
  const { data: loginData } = useQuery(IS_LOGGED_IN);
  const { loading, error, data } = useQuery(GET_USERS, {
    fetchPolicy: 'network-only',
  });
  const [list, setList] = useState<string>('');

  const [
    getFollowers,
    { loading: loadingFollowers, error: errorFollowers, data: dataFollowers },
  ] = useLazyQuery(GET_FOLLOWERS, {
    fetchPolicy: 'network-only',
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

  if (loading) return <Loading />;
  if (error) {
    client.writeData({ data: { isLoggedIn: false } });
    return <ErrorLoginFirst error={error} />;
  }
  // 여기도 서버에서 나오는 에러 종류에 따라서 Login 먼저 하세요를 보여줄지, 혹은 다른 에러 메세지를 보여줄지
  if (data) {
    client.writeData({ data: { isLoggedIn: true } });
  }
  if (loginData.isLoggedIn === false) {
    return <ErrorLoginFirst error={error} />;
  }

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
      if (errorFriends) return <p>{errorFriends.message}</p>;
      return (
        <p>아직 친구가 없네요. 친구 찾기로 가서 먼저 친구신청을 해보세요</p>
      );
    }
    if (list === 'followers') {
      if (dataFollowers && dataFollowers.me.followers.length > 0) {
        return dataFollowers.me.followers.map((oneData) =>
          makeFriend(oneData, list),
        );
      }
      if (loadingFollowers) return <Loading />;
      if (errorFollowers) return <p>{errorFollowers.message}</p>;
      return (
        <div>
          아직 사람들이 친구신청을 안 했네요. 마이페이지에서 정보를 상세하게
          입력해서 친구들이 나를 잘 찾을 수 있게 해보세요
        </div>
      );
    }
    if (list === 'following') {
      if (dataFollowing && dataFollowing.me.following.length > 0) {
        return dataFollowing.me.following.map((oneData) =>
          makeFriend(oneData, list),
        );
      }
      if (loadingFollowing) return <Loading />;
      if (errorFollowing) return <p>{errorFollowing.message}</p>;
      return (
        <div>
          아직 아무에게도 친구신청을 안 하셨네요. 친구 찾기로 이동하셔서 한번
          해보세요
        </div>
      );
    }
    return <div>여기는 채팅방 입니다</div>;
  }

  // 로딩 빙글빙글 돌아가는 것 만들어야 함.

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
            내가 친구하자 한 사람
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
            나에게 친구하자 온 사람
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
