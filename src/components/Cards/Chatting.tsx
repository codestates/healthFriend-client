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
  useMakeChatRoom: Function;
  chatFriend: any;
  setChatFriend: Function;
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

function Chatting({
  useMakeChatRoom,
  chatFriend,
  setChatFriend,
}: ChattingProps) {
  const { chatClient, filters, sort, newChannel } = useMakeChatRoom(chatFriend);

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
              <ChannelHeader title={`${chatFriend.nickname}님과의 대화`} />
              <MessageList />
              <MessageInput />
            </Window>
            <button
              onClick={() => {
                newChannel.delete();
                setChatFriend('');
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
