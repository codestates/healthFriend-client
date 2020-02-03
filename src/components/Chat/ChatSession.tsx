import React from 'react';
import { Divider } from 'antd';
import moment from 'moment';
import 'moment/locale/ko';
import '../../css/Chat/chatSession.css';
// moment.locale('ko');

type ChatSessionProps = {
  messages: any[];
  me: any;
};

const ChatSession = (props: ChatSessionProps) => {
  const { messages, me } = props;
  let prevDay;

  return messages.map((message) => {
    const isOwnMessage = message.senderId === me.nickname;

    const today = moment(`${message.updatedAt}`).format('YYYY년 M월D일 dddd');
    let daySeperator;
    if (prevDay === '') {
      prevDay = today;
    }
    if (prevDay !== '' && prevDay !== today) {
      daySeperator = <Divider>{today}</Divider>;
      prevDay = today;
    }

    const time = moment(`${message.updatedAt}`).format('LT');

    return (
      <React.Fragment key={message.id}>
        {daySeperator || null}
        <div
          className={
            isOwnMessage
              ? 'Chat__messages__message__wrapper Chat__messages__message__wrapper--self'
              : 'Chat__messages__message__wrapper Chat__messages__message__wrapper--other'
          }
          key={message.id}
        >
          <div className="Chat__messages__message__wrapper__inner">
            <div
              className={
                isOwnMessage
                  ? 'Chat__messages__message Chat__messages__message--self'
                  : 'Chat__messages__message Chat__messages__message--other'
              }
            >
              <div className="Chat__messages__message__content">
                {message.text}
              </div>
              <div className="Chat__messages__message__time">{time}</div>
              <div
                className={
                  isOwnMessage
                    ? 'Chat__messages__message__arrow alt'
                    : 'Chat__messages__message__arrow'
                }
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  });
};

export default ChatSession;
