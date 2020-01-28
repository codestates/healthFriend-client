import React from 'react';

type RoomUsersProps = {
  roomUsers: any[];
  sendDM: Function;
  me: any;
};

const RoomUsers = (props: RoomUsersProps) => {
  const { roomUsers, sendDM, me } = props;
  const users = roomUsers
    .filter(({ id }) => me.nickname !== id)
    .filter(
      ({ id }) => me.friends.map((fr) => fr.friend.nickname).indexOf(id) !== -1,
    )
    .map((user) => {
      return (
        <li
          className="room-member"
          key={user.id}
          onClick={() => sendDM(user.id)}
        >
          <div>
            <span className={`presence ${user.presence.state}`} />
            <span>{user.name}</span>
          </div>
        </li>
      );
    });

  return (
    <div className="room-users">
      <ul>{users}</ul>
    </div>
  );
};

export default RoomUsers;
