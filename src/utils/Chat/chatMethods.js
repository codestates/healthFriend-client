import Chatkit from '@pusher/chatkit-client';
import axios from 'axios';
import { CHATKIT_INSTANCE_LOCATOR } from '../../config/chatkitConfig';

// typescript로 바꾸기

// function showNotificationToast() {
//   if (window.Notification && Notification.permission === 'granted') return;

//   this.setState({
//     showNotificationToast: true,
//   });
// }

function sendMessage(event) {
  event.preventDefault();
  const { newMessage, currentUser, currentRoom } = this.state;

  if (newMessage.trim() === '') return;

  currentUser.sendMessage({
    text: newMessage,
    roomId: `${currentRoom.id}`,
  });

  // const parts = [];

  // if (newMessage.trim() === '') return;

  // parts.push({
  //   type: 'text/plain',
  //   content: newMessage,
  // });

  // currentUser.sendMultipartMessage({
  //   roomId: `${currentRoom.id}`,
  //   parts,
  // });

  //

  this.setState({
    ...this.state,
    newMessage: '',
  });
}

function handleInput(event) {
  const { value, name } = event.target;
  this.setState({
    ...this.state,
    [name]: value,
  });
}

function createPrivateRoom(id) {
  const { currentUser, rooms } = this.state;
  const roomName = `${currentUser.id}_${id}`;

  const isPrivateChatCreated = rooms.filter((room) => {
    if (room.customData && room.customData.isDirectMessage) {
      const arr = [currentUser.id, id];
      const { userIds } = room.customData;

      if (arr.sort().join('') === userIds.sort().join('')) {
        return {
          room,
        };
      }
    }

    return false;
  });

  if (isPrivateChatCreated.length > 0) {
    return Promise.resolve(isPrivateChatCreated[0]);
  }

  return currentUser.createRoom({
    name: `${roomName}`,
    private: true,
    addUserIds: [`${id}`],
    customData: {
      isDirectMessage: true,
      userIds: [currentUser.id, id],
    },
  });
}

// function showNotification(message) {
//   console.log('message 노티', message);
//   // let messageText;
//   // message.parts.forEach((p) => {
//   //   messageText = p.payload.content;
//   // });

//   return new Notification(message.senderId, {
//     // body: messageText,
//     body: message.text,
//   });
// }

function connectToRoom(id = '92c49eb7-fe76-42bf-a85b-37e30a31cabb') {
  const { currentUser } = this.state;
  const { chatFriend } = this.props.chatFriend;

  this.setState({
    messages: [],
  });

  return (
    currentUser
      // .subscribeToRoomMulitpart({
      .subscribeToRoom({
        roomId: `${id}`,
        messageLimit: 100,
        hooks: {
          onMessage: (message) => {
            this.setState({
              messages: [...this.state.messages, message],
            });
            // //
            // const { currentRoom } = this.state;

            // if (currentRoom === null) return;

            // console.log('message', message);

            // return currentUser.setReadCursor({
            //   roomId: currentRoom.id,
            //   position: message.id,
            // });

            // if (message.senderId !== currentUser.id) {
            //   console.log('here comes', message);
            //   showNotification(message);
            // }
          },
          onPresenceChanged: () => {
            const { currentRoom } = this.state;
            this.setState({
              roomUsers: currentRoom.users.sort((a) => {
                if (a.presence.state === 'online') return -1;
                return 1;
              }),
            });
          },
        },
      })
      .then((currentRoom) => {
        const roomName =
          currentRoom.customData && currentRoom.customData.isDirectMessage
            ? currentRoom.customData.userIds.filter(
                (id) => id !== currentUser.id,
              )[0]
            : currentRoom.name;

        console.log('rooms, ', currentUser.rooms);

        this.setState({
          currentRoom,
          isLoading: false,
          // roomUsers: currentRoom.users,
          rooms: currentUser.rooms,
          roomName,
        });

        // showNotificationToast.call(this);
      })
      .then(() => {
        if (
          chatFriend.nickname !== '' &&
          id === '92c49eb7-fe76-42bf-a85b-37e30a31cabb'
        ) {
          createPrivateRoom.call(this, chatFriend.nickname).then((room) => {
            connectToRoom.call(this, room.id);
          });
        }
      })
      .catch(console.error)
  );
}

function sendDM(id) {
  createPrivateRoom.call(this, id).then((room) => {
    connectToRoom.call(this, room.id);
  });
}

function connectToChatkit() {
  const { me } = this.props.me;
  const { chatFriend } = this.props.chatFriend;
  this.setState({
    userId: me.nickname,
  });

  const uri =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:4000'
      : 'https://api.healthfriend.club';

  axios
    .post(`${uri}/users`, {
      userId: me.nickname,
    })
    .then(() => {
      const tokenProvider = new Chatkit.TokenProvider({
        url: `${uri}/authenticate`,
      });

      const chatManager = new Chatkit.ChatManager({
        instanceLocator: CHATKIT_INSTANCE_LOCATOR,
        userId: me.nickname,
        tokenProvider,
      });

      return chatManager
        .connect({
          onAddedToRoom: (room) => {
            const { rooms } = this.state;
            this.setState({
              rooms: [...rooms, room],
            });
          },
          // //
          // onRoomUpdated: (room) => {
          //   const { rooms } = this.state;
          //   const index = rooms.findIndex((r) => r.id === room.id);
          //   rooms[index] = room;
          //   this.setState({
          //     rooms,
          //   });
          // },
        })
        .then((currentUser) => {
          this.setState(
            {
              currentUser,
              // rooms: currentUser.rooms,
            },
            () => {
              if (chatFriend.nickname !== '') {
                const chatRoom = this.state.rooms.filter(
                  (room) =>
                    room.customData &&
                    room.customData.userIds.indexOf(chatFriend.nickname) !== -1,
                );
                if (chatRoom.length > 0) {
                  return connectToRoom.call(this, chatRoom[0].id);
                }
                return connectToRoom.call(this);
              }
              connectToRoom.call(this);
            },
          );
        });
    })
    .catch(console.error);
}

// function grantPermission() {
//   console.log('여기로 오나? permission 부분 전단계 ');
//   console.log('notification permission', Notification.permission);
//   if (!('Notification' in window)) {
//     console.log('후보 1');
//     alert('This browser does not support system notifications');
//     return;
//   }

//   if (Notification.permission === 'granted') {
//     console.log('후보 2');
//     new Notification('You are already subscribed to web notifications');
//     return;
//   }

//   if (
//     Notification.permission !== 'denied' ||
//     Notification.permission === 'default'
//   ) {
//     console.log('여기로 오나? permission 부분');
//     Notification.requestPermission().then((result) => {
//       console.log('result', result);
//       if (result === 'granted') {
//         new Notification('헬스 친구 메세지', {
//           body: '이제 채팅 메세지를 받아볼 수 있습니다',
//         });
//       }
//     });
//   }

//   this.setState({
//     showNotificationToast: false,
//   });
// }

export {
  sendMessage,
  handleInput,
  connectToRoom,
  connectToChatkit,
  sendDM,
  // grantPermission,
};
