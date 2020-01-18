import React from 'react';
import { Row, Col } from 'antd';
import { useQuery, useMutation } from '@apollo/react-hooks';

import Chatting from '../components/Cards/Chatting';
import useSubscript from '../hooks/Shared/useSubscript';
import useMakeChatRoom from '../hooks/Cards/useMakeChatRoom';
import { SET_CHAT_FRIEND, GET_CHAT_FRIEND } from '../graphql/queries';

type ChatProps = {
  history: any;
};

export default function Chat({ history }: ChatProps) {
  useSubscript(history);

  const { data: chatFriend, loading, error } = useQuery(GET_CHAT_FRIEND);
  const [setChatFriend] = useMutation(SET_CHAT_FRIEND);

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
