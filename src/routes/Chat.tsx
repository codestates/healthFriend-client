import React from 'react';
import { Row, Col } from 'antd';
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';

import Chatting from '../components/Cards/Chatting';
import useSubscript from '../hooks/Shared/useSubscript';
import useMakeChatRoom from '../hooks/Chat/useMakeChatRoom';
import { SET_CHAT_FRIEND, GET_CHAT_FRIEND } from '../graphql/queries';
import Loading from '../components/Shared/Loading';
import redirectWhenError from '../utils/redirectWhenError';

type ChatProps = {
  history: any;
};

export default function Chat({ history }: ChatProps) {
  // 여긴 아직 /chat 으로 직접 주소 치고 들어올때 에러 대비 등이 안 돼 있음.

  useSubscript(history);

  const { data: chatFriend, loading, error } = useQuery(GET_CHAT_FRIEND);
  const [setChatFriend] = useMutation(SET_CHAT_FRIEND);
  const client = useApolloClient();

  if (loading) return <Loading />;
  if (error) redirectWhenError({ history, client });

  return (
    <div>
      <br />
      <Row type="flex" justify="center">
        <Col xs={24} md={20}>
          <Chatting
            useMakeChatRoom={useMakeChatRoom}
            chatFriend={chatFriend}
            setChatFriend={setChatFriend}
          />
        </Col>
      </Row>
    </div>
  );
}
