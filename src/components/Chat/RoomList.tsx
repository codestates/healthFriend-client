import React from 'react';
import { Avatar } from 'antd';

type RoomListProps = {
  rooms: any[];
  currentRoom: any;
  connectToRoom: any;
  currentUser: any;
  me: any;
};

const RoomList = (props: RoomListProps) => {
  const { rooms, currentRoom, connectToRoom, currentUser, me } = props;

  const roomList = rooms
    .filter((room) => room.isPrivate)
    .filter(
      (room) =>
        me.friends
          .map((fr) => fr.friend.nickname)
          .indexOf(
            room.customData.userIds.filter((id) => id !== currentUser.id)[0],
          ) !== -1,
    )
    .map((room) => {
      const image = me.friends.filter(
        (fr) =>
          fr.friend.nickname ===
          room.customData.userIds.filter((id) => id !== currentUser.id)[0],
      )[0].friend.profileImage;

      const isRoomActive = room.id === currentRoom.id ? 'active' : '';

      return (
        <li
          className={isRoomActive}
          key={room.id}
          onClick={() => connectToRoom(room.id)}
        >
          {image.length > 0 ? (
            <Avatar src={image[0].filename} />
          ) : (
            <Avatar icon="user" />
          )}
          &nbsp;&nbsp;
          {room.customData && room.customData.isDirectMessage ? (
            <span className="room-name">
              {room.customData.userIds.filter((id) => id !== currentUser.id)[0]}
            </span>
          ) : (
            <span className="room-name">{room.name}</span>
          )}
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
