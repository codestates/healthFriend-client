/** @jsx jsx */
import { useState } from 'react';
import { Row, Col, Button } from 'antd';
import { /* css, */ jsx } from '@emotion/core';
import { useQuery, useLazyQuery, useApolloClient } from '@apollo/react-hooks';
import { Redirect } from 'react-router-dom';

import {
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
  // const { loading, error, data, refetch } = useQuery(GET_USERS, {
  //   fetchPolicy: 'network-only',
  // });
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
  if (loginData.isLoggedIn === false) {
    return <ErrorLoginFirst error={null} />;
  }

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
      if (errorFriends) {
        client.writeData({ data: { isLoggedIn: false } });
        alert('로그인 기한 만료');
        window.scrollTo(0, 0);
        return <Redirect to="/" />;
      }
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
      if (errorFollowers) {
        client.writeData({ data: { isLoggedIn: false } });
        alert('로그인 기한 만료');
        window.scrollTo(0, 0);
        return <Redirect to="/" />;
      }
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
      if (errorFollowing) {
        client.writeData({ data: { isLoggedIn: false } });
        alert('로그인 기한 만료');
        window.scrollTo(0, 0);
        return <Redirect to="/" />;
      }
      return (
        <div>
          아직 아무에게도 친구신청을 안 하셨네요. 친구 찾기로 이동하셔서 한번
          해보세요
        </div>
      );
    }
    return <div>여기는 채팅방 입니다</div>;
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
