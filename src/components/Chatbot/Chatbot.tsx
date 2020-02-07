import React, { useState } from 'react';
import {
  Chat,
  Channel,
  // ChannelHeader,
  Thread,
  Window,
  MessageList,
  MessageInput,
} from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import { Icon } from 'antd';
import 'antd/dist/antd.css';
import 'stream-chat-react/dist/css/index.css';
import Cookies from 'js-cookie';
import { API_KEY } from '../../config/streamConfig';

type ChatbotProps = {
  loginData: { isLoggedIn: boolean };
  dataMe: any;
};

export const Chatbot = ({ loginData, dataMe }: ChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const chatClient = new StreamChat(API_KEY);
  const token: any = Cookies.get('stream-chat-token');

  if (!loginData.isLoggedIn || (dataMe && dataMe.me === null)) return null;
  // eslint-disable-next-line
  const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;
  const myEmail = dataMe.me.email;
  console.log('myEmail', myEmail);
  const yourEmail = 'admin@hf.club';
  const { nickname } = dataMe.me;

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

  const state = channel.watch();

  console.log('channel, ', channel.state);
  console.log('token', token);
  console.log('chatClient', chatClient);
  console.log('state', state.then((res) => console.log('res', res)));

  return (
    <div>
      {isOpen && dataMe && dataMe.me && channel ? (
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
        {isOpen && dataMe && dataMe.me && channel ? (
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
