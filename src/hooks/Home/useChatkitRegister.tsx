import { useState, useEffect } from 'react';
import Chatkit from '@pusher/chatkit-client';
import axios from 'axios';
import { CHATKIT_INSTANCE_LOCATOR } from '../../config/chatkitConfig';

// 채팅창 때문에 여기 인증하는 부분 최악인듯... 코드 뜯어고쳐야....
const useChatkitRegister = ({ dataMe, client }) => {
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

  const uri =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:4000'
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
};

export default useChatkitRegister;
