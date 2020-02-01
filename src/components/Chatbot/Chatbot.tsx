import React, { useState } from 'react';
import {
  Chat,
  Channel,
  ChannelHeader,
  Thread,
  Window,
} from 'stream-chat-react';
import { API_KEY } from '../../config/streamConfig';
import { MessageList, MessageInput } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import { useQuery } from '@apollo/react-hooks';
import { GET_USERINFO } from '../../graphql/queries';
import { Icon } from 'antd';
import 'antd/dist/antd.css';
import 'stream-chat-react/dist/css/index.css';

import Cookies from 'js-cookie';

export const Chatbot = () => {
  const chatClient = new StreamChat(API_KEY);

  const [isOpen, setIsOpen] = useState(false);

  const token: any = Cookies.get('stream-chat-token');
  const { error: errorR, loading: landingR, data: dataMe } = useQuery(
    GET_USERINFO,
    {
      fetchPolicy: 'network-only',
    },
  );

  if (landingR) return <p>로딩 중...</p>;
  if (errorR) return <p>오류 :(</p>;

  const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;
  const myEmail = dataMe.me.email;
  const yourEmail = 'admin@hf.club';
  const nickname = 'admin';

  const room = [myEmail, yourEmail]
    .sort()
    .join(',')
    .replace(regExp, '');

  chatClient.disconnect();
  chatClient.setUser(
    {
      id: dataMe.me.id,
      name: dataMe.me.nickname,
    },
    token,
  );

  const channel = chatClient.channel('messaging', `${room}`, {
    name: `${nickname}`,
  });
  return (
    <div>
      {isOpen ? (
        <div style={{ height: '0px', width: '0px' }}>
          <Chat client={chatClient}>
            <Channel channel={channel}>
              <div
                style={{
                  position: 'fixed',
                  right: '30px',
                  bottom: '80px',
                  height: '400px',
                  width: '380px',
                }}
              >
                <Window>
                  <ChannelHeader />
                  <MessageList />
                  <MessageInput />
                </Window>
                <Thread />
              </div>
            </Channel>
          </Chat>
        </div>
      ) : null}

      <div
        style={{
          position: 'fixed',
          right: '30px',
          bottom: '25px',
          fontSize: '2.3rem',
        }}
      >
        {isOpen ? (
          <Icon
            type="close-circle"
            theme="twoTone"
            onClick={() => setIsOpen(!isOpen)}
          />
        ) : (
          <Icon
            type="message"
            theme="twoTone"
            onClick={() => setIsOpen(!isOpen)}
          />
        )}
      </div>
    </div>
  );
};

export default Chatbot;
