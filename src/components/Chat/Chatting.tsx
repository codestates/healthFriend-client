import React from 'react';
import {
  Chat,
  Channel,
  ChannelList,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  // Thread,
} from 'stream-chat-react';

type ChattingProps = {
  makeChatRoom: Function;
  friend: any;
  setFriend: Function;
};

// const MyMessageComponent = ({ setActiveChannel, channel }) => {
//   const unreadCount = channel.countUnread();

//   return (
//     <div className="channel_preview">
//       <button
//         onClick={(e) => {
//           setActiveChannel(channel, e);
//           console.log('what is in channel?', channel);
//         }}
//       >
//         {channel.data.name}
//         Unread messages: {unreadCount}
//       </button>
//     </div>
//   );
// };

function Chatting({ makeChatRoom, friend, setFriend }: ChattingProps) {
  const { chatClient, filters, sort, newChannel } = makeChatRoom(friend);

  console.log('chatClient', chatClient);

  console.log('newChannel in Chatting', newChannel);

  return (
    <Chat client={chatClient} theme="messaging dark">
      <ChannelList
        filters={filters}
        sort={sort}
        // Preview={MyMessageComponent}
      />
      {newChannel ? (
        <Channel channel={newChannel}>
          <div style={{ height: '80%', width: '100%' }}>
            <Window>
              <ChannelHeader title={`${friend.nickname}님과의 대화`} />
              <MessageList />
              <MessageInput />
            </Window>
            <button
              onClick={() => {
                newChannel.delete();
                setFriend('');
              }}
            >
              나가기
            </button>
          </div>
        </Channel>
      ) : null}
      <Channel>
        <div style={{ height: '80%', width: '100%' }}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          {/* <button onClick={() => newChannel.delete()}>나가기</button> */}
        </div>
        {/* <Thread /> */}
        {/* <button>나가기</button> */}
      </Channel>
    </Chat>
  );
}

// 윗 부분 중복 제거

export default Chatting;
