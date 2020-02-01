/** @jsx jsx */
import { useState, useEffect } from 'react';
import { Row, Col, Typography } from 'antd';
import { css, jsx } from '@emotion/core';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import Chatkit from '@pusher/chatkit-client';
import axios from 'axios';

import renderImage from '../static/renderImage.jpg';
// import IfLoginUSeeFriend from '../components/Home/IfLoginUSeeFriend';
import MainButton from '../components/Home/MainButton';
import {
  GET_USERINFO,
  IS_LOGGED_IN,
  GET_RANDOM_USERS,
  GET_USER_COUNT,
} from '../graphql/queries';
import useSubscript from '../hooks/Shared/useSubscript';
import redirectWhenError from '../utils/redirectWhenError';
import MadeCard from '../components/Shared/MadeCard';
import { CHATKIT_INSTANCE_LOCATOR } from '../config/chatkitConfig';

const { Title } = Typography;

const renderingImage = css`
  width: 100%;
  object-fit: cover;
  height: 82vh;
  filter: grayscale(20%);
`;

const renderingMessage = css`
  position: absolute;
  text-align: center;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);

  *.ant-typography {
    color: #fff;
  }
`;

const mainButtonCss = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

type HomeProps = {
  history: any;
};

function Home({ history }: HomeProps) {
  const client = useApolloClient();
  // console.log('token 유무', Cookies.get('access-token'));
  const { data: dataMe, error: errorMe } = useQuery(GET_USERINFO, {
    fetchPolicy: 'network-only',
  });
  // 문제 1. 왜 token을 지워도 dataMe에 데이터가 들어오는 쿼리가 날라갈까? 어디선가 있는지 모르는 cache에서 가져오는 듯한데.
  // console.log('dataMe', dataMe);
  const { data: dataCount } = useQuery(GET_USER_COUNT, {
    fetchPolicy: 'network-only',
  });
  const { data: dataUsers } = useQuery(GET_RANDOM_USERS);
  console.log(dataUsers);
  const { data: loginData } = useQuery(IS_LOGGED_IN);

  // 채팅창 때문에 여기 인증하는 부분 최악인듯... 코드 뜯어고쳐야....
  const [chatState, setChatState] = useState<any>({
    userId: '',
    currentUser: null,
  });

  useEffect(() => {
    const joinRoom = (id) => {
      if (chatState.currentUser) {
        const { currentUser } = chatState;
        return currentUser!
          .subscribeToRoom({
            roomId: `${id}`,
            messageLimit: 100,
            hooks: {
              onMessage: () => {},
              onPresenceChanged: () => {},
            },
          })
          .catch(console.error);
      }
    };
    joinRoom('92c49eb7-fe76-42bf-a85b-37e30a31cabb');
    // eslint-disable-next-line
  }, [chatState.currentUser && chatState.currentUser.id]);

  useSubscript(history);

  const uri =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:5200'
      : 'https://api.healthfriend.club';

  if (
    dataMe &&
    dataMe.me &&
    dataMe.me.nickname
    // && Cookies.get('access-token')
  ) {
    client.writeData({ data: { isLoggedIn: true } });
    if (!chatState.currentUser) {
      axios
        .post(`${uri}/users`, {
          userId: dataMe.me.nickname,
        })
        .then(() => {
          const tokenProvider = new Chatkit.TokenProvider({
            url: `${uri}/authenticate`,
          });

          const chatManager = new Chatkit.ChatManager({
            instanceLocator: CHATKIT_INSTANCE_LOCATOR,
            userId: dataMe.me.nickname,
            tokenProvider,
          });

          return chatManager
            .connect({
              onAddedToRoom: () => {},
            })
            .then((currentUser) => {
              setChatState({
                ...chatState,
                currentUser,
              });
            });
        })
        .catch(console.error);
    }
  }

  // errorMe!.graphQLErrors[0]!.extensions!.code ----> errorMe에 값들이 잘 들어오므로 분기처리 하기.

  // 일부러 로그아웃을 하지는 않았는데 token이 만료됐을 때
  if (
    loginData.isLoggedIn &&
    errorMe
    //  &&  errorMe.extensions.code === 'NO_TOKEN'
  ) {
    client.writeData({ data: { isLoggedIn: false } });
    redirectWhenError({ history, client });
  }

  return (
    <Row type="flex" justify="center">
      <Col xs={24}>
        <img src={renderImage} alt="" css={renderingImage} />
        <div css={renderingMessage}>
          <Title level={1}>
            {dataCount ? dataCount.userCount : 1000} 명의 친구들이
            <br />
            당신을 기다리고 있어요
          </Title>
        </div>
        <div css={mainButtonCss}>
          <MainButton {...{ dataMe, history, loginData }} />
        </div>
      </Col>
      {dataUsers && (
        <Col xs={20}>
          <Row type="flex" justify="center" style={{ marginTop: 20 }}>
            <Col xs={24}>
              <Row gutter={24}>
                {dataUsers.randomUsers.map((oneData) =>
                  MadeCard(oneData, 'unknown', () => null, true, false),
                )}
              </Row>
            </Col>
            <MainButton {...{ dataMe, history, loginData }} />
          </Row>
        </Col>
      )}
    </Row>
  );
}

export default Home;
