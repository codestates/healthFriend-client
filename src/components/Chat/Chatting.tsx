import React from 'react';
import {
  Chat,
  Channel,
  ChannelList,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
} from 'stream-chat-react';

type ChattingProps = {
  makeChatRoom: Function;
  friend: any;
};

function Chatting({ makeChatRoom, friend }: ChattingProps) {
  const { chatClient, filters, sort, newChannel } = makeChatRoom(friend);

  console.log('newChannel in Chatting', newChannel);

  return (
    <Chat client={chatClient} theme="messaging light">
      <ChannelList filters={filters} sort={sort} />
      {newChannel ? (
        <Channel channel={newChannel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      ) : (
        <Channel>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      )}
    </Chat>
  );
}

// 윗 부분 중복 제거

export default Chatting;
