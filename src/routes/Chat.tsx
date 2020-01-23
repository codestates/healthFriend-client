import React from 'react';
import { Row, Col } from 'antd';
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';

import Chatting from '../components/Chat/Chatting';
import useSubscript from '../hooks/Shared/useSubscript';
import useMakeChatRoom from '../hooks/Chat/useMakeChatRoom';
import {
  SET_CHAT_FRIEND,
  GET_CHAT_FRIEND,
  IS_LOGGED_IN,
} from '../graphql/queries';
import Loading from '../components/Shared/Loading';
import redirectWhenError from '../utils/redirectWhenError';

type ChatProps = {
  history: any;
};

export default function Chat({ history }: ChatProps) {
  const client = useApolloClient();
  const { data: loginData } = useQuery(IS_LOGGED_IN);
  // 여긴 아직 /chat 으로 직접 주소 치고 들어올때 dataMe undefined 에러 대비 등이 안 돼 있음.
  const { data: chatFriend, loading, error } = useQuery(GET_CHAT_FRIEND);
  const [setChatFriend] = useMutation(SET_CHAT_FRIEND);
  useSubscript(history);

  if (!loginData.isLoggedIn) redirectWhenError({ history, client });
  if (loading) return <Loading />;
  if (error) redirectWhenError({ history, client });

  return (
    <div>
      <br />
      <Row type="flex" justify="center">
        <Col xs={24} md={20}>
          {chatFriend ? (
            <Chatting
              useMakeChatRoom={useMakeChatRoom}
              chatFriend={chatFriend}
              setChatFriend={setChatFriend}
            />
          ) : (
            <div>채팅 대화 상대가 없습니다</div>
          )}
        </Col>
      </Row>
    </div>
  );
}
