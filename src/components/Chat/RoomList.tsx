import React from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import defaultAvatar from '../../static/default-avatar.png';
import '../../css/Chat/roomList.css';

type RoomListProps = {
  rooms: any[];
  currentRoom: any;
  sendDM: any;
  currentUser: any;
  me: any;
  messages: any[];
  roomUsers: any[];
};

const RoomList = (props: RoomListProps) => {
  const { rooms, currentRoom, currentUser, me, sendDM, roomUsers } = props;

  const roomList = rooms
    .filter((room) => room.isPrivate)
    .sort(
      (a: any, b: any) =>
        ((moment(b.lastMessageAt).valueOf as any) -
          (moment(a.lastMessageAt).valueOf as any)) as any,
    )
    .filter(
      (room) =>
        me.friends
          .map((fr) => fr.friend.nickname)
          .indexOf(
            room.customData.userIds.filter((id) => id !== currentUser.id)[0],
          ) !== -1,
    )
    .map((room) => {
      const counterUser = room.customData.userIds.filter(
        (id) => id !== currentUser.id,
      )[0];
      const image = me.friends.filter(
        (fr) => fr.friend.nickname === counterUser,
      )[0].friend.profileImage;
      const { openImageChoice } = me.friends.filter(
        (fr) => fr.friend.nickname === counterUser,
      )[0].friend.openImageChoice;

      const isRoomActive = room.id === currentRoom.id ? 'active' : '';

      // console.log('unReadCount', room.unreadCount);
      return (
        <li
          className={`UserList__container__list__item ${isRoomActive}`}
          key={room.id}
          onClick={() => sendDM(counterUser)}
        >
          <div>
            <img
              src={
                image.length > 0 && openImageChoice !== 'CLOSE'
                  ? image[0].filename
                  : defaultAvatar
              }
              className="UserList__container__list__item__avatar"
              alt="avatar"
            />
          </div>
          <div className="UserList__container__list__item__content">
            <p className="UserList__container__list__item__content__name">
              {room.customData && room.customData.isDirectMessage
                ? room.customData.userIds.filter(
                    (id) => id !== currentUser.id,
                  )[0]
                : room.name}
              &nbsp;&nbsp;
              {roomUsers.length > 0 && (
                <span
                  className={`presence ${
                    roomUsers.filter((user) => user.id === counterUser)[0]
                      .presence.state
                  }`}
                />
              )}
            </p>
            <p className="UserList__container__list__item__content__text">
              {/* {`${lastMessage.senderId}: ${lastMessage.text} `} */}
              {/* You: That would be great! */}
            </p>
          </div>
          <div className="UserList__container__list__item__time">
            {moment(new Date()).format('L') ===
            moment(room.lastMessageAt).format('L')
              ? moment(room.lastMessageAt).format('LT')
              : moment(room.lastMessageAt).format('L')}
          </div>
        </li>
      );
    });

  return (
    <div className="rooms">
      <ul className="chat-rooms">{roomList}</ul>
    </div>
  );
};

export default RoomList;
