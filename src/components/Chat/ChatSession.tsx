import React from 'react';
import { format } from 'date-fns';

type ChatSessionProps = {
  messages: any[];
  me: any;
};

const ChatSession = (props: ChatSessionProps) => {
  const { messages, me } = props;
  return messages.map((message) => {
    console.log('msg in chatSession', message);
    console.log('me in chatSession', me);
    const isOwnMessage = message.senderId === me.nickname;
    const time = format(new Date(`${message.updatedAt}`), 'HH:mm');

    return (
      <li className="message" key={message.id}>
        <div
          className={
            isOwnMessage
              ? 'Chat__messages__message__wrapper Chat__messages__message__wrapper--self'
              : 'Chat__messages__message__wrapper Chat__messages__message__wrapper--other'
          }
        >
          <span className="user-id">{message.senderId}</span>
          <span>{message.text}</span>
        </div>
        <span className="message-time">{time}</span>
      </li>
    );
  });
};

export default ChatSession;
