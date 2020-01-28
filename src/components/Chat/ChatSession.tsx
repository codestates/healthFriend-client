import React from 'react';
import { format } from 'date-fns';

type ChatSessionProps = {
  messages: any[];
};

const ChatSession = (props: ChatSessionProps) => {
  const { messages } = props;
  return messages.map((message) => {
    const time = format(new Date(`${message.updatedAt}`), 'HH:mm');

    return (
      <li className="message" key={message.id}>
        <div>
          <span className="user-id">{message.senderId}</span>
          <span>{message.text}</span>
        </div>
        <span className="message-time">{time}</span>
      </li>
    );
  });
};

export default ChatSession;
