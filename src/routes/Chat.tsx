/** @jsx jsx */
import { useState } from 'react';
import { Row, Col, Button } from 'antd';
import { /* css, */ jsx } from '@emotion/core';
import { useQuery, useLazyQuery, useApolloClient } from '@apollo/react-hooks';
import { StreamChat } from 'stream-chat';
import 'stream-chat-react/dist/css/index.css';
import cookie from 'js-cookie';

import {
  IS_LOGGED_IN,
  GET_FOLLOWING,
  GET_FRIENDS,
  GET_FOLLOWERS,
  GET_USERINFO,
} from '../graphql/queries';
import Loading from '../components/Shared/Loading';
import ErrorLoginFirst from '../components/Shared/ErrorLoginFirst';
import UserCard from '../components/FindFriend/UserCard';
import redirectWhenTokenExp from '../utils/redirectWhenTokenExp';
import message from '../config/Message';
import Chatting from '../components/Chat/Chatting';
import { API_KEY } from '../config/streamConfig';

type ChatProps = {
  history: any; // match, location을 같이 쓰니 안되고, 얘만 쓰니 되네... withRouter로 붙인 애들은 다 써줘야 하는 것 같고, 아닌 애들은 아닌 듯.
};

function Chat({ history }: ChatProps) {
  const client = useApolloClient();
  const { data } = useQuery(GET_USERINFO);
  const { data: loginData } = useQuery(IS_LOGGED_IN);
  const [list, setList] = useState<string>('');
  const [friend, setFriend] = useState<any>('');

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

  const makeChatRoom = (hf) => {
    const token = cookie.get('stream-chat-token');

    console.log('data.me.id', data.me.id);
    console.log('friend', hf.id);

    const chatClient = new StreamChat(API_KEY);

    // async, await로 만드는 법 모르겠음.
    // setUser하는 부분이 로그인하자마자 set을 해야 할까?? 그래야 친구들 목록에 등록이 되고, 바로 말 걸수 있나?
    chatClient.setUser(
      {
        id: data.me.id,
        name: data.me.nickname,
        image: 'https://getstream.io/random_svg/?name=John', // data.me.image? 있는것: antd
      },
      token,
    );

    let newChannel;

    if (friend) {
      newChannel = chatClient.channel(
        'messaging',
        (data.me.id + friend.id).slice(0, 20),
        {
          members: [data.me.id, friend.id],
          // invites: [friend],
        },
      );
      // const state = newChannel.watch();
      newChannel.on('message.new', (event) => {
        console.log('메세지 왔어');
      });
    }

    // as any말고 typescript error처리 안되네

    chatClient.on(((event) => {
      if (event.total_unread_count != null) {
        console.log(
          `unread messages count is now: ${event.total_unread_count}`,
        );
      }
      if (event.unread_channels != null) {
        console.log(`unread channels count is now: ${event.unread_channels}`);
      }
    }) as any);

    const filters = { type: 'messaging' };
    const sort = { last_message_at: -1 };

    chatClient.queryChannels(
      filters,
      { last_message_at: -1 },
      {
        state: true,
      },
    );

    console.log('newChannel in chat', newChannel);

    return { chatClient, filters, sort, newChannel };
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
        setFriend={setFriend}
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
          <Button
            type="primary"
            onClick={() => {
              setList('chat');
            }}
          >
            채팅창
          </Button>
        </Col>
        <br />
        <br />
        <Col xs={24} md={15}>
          {list === 'chat' ? (
            <Chatting makeChatRoom={makeChatRoom} friend={friend} />
          ) : (
            <FriendList />
          )}
        </Col>
      </Row>
    </div>
  );
}

export default Chat;
