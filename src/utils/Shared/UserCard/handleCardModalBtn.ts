import { message } from 'antd';
import getUnreadCount from './getUnreadCount';
import redirectWhenError from '../redirectWhenError';

const handleCardModalBtn = ({ history, client }) => {
  const errorHandle = (error) => {
    console.log(error);
    redirectWhenError({ history, client });
  };

  const writeUnreadState = (followers, friends) => {
    client.writeData({
      data: {
        unread: getUnreadCount(followers) + getUnreadCount(friends),
        unreadFollowers: getUnreadCount(followers),
        unreadFriends: getUnreadCount(friends),
      },
    });
  };

  const afterDoneFunc = (data, dataType, willNotify, willWriteUnread) => {
    if (data) {
      if (willNotify) message.success('처리되었습니다');
      if (willWriteUnread && dataType) {
        const { followers, friends } = data[dataType];
        writeUnreadState(followers, friends);
      }
    }
  };
  return { errorHandle, afterDoneFunc };
};

export default handleCardModalBtn;
