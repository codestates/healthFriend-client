import React from 'react';
import UserCard from '../FindFriend/UserCard';

export default function MakeCard(oneData, type, renewFriends, setChatFriend) {
  return (
    <UserCard
      id={oneData.id}
      key={oneData.email}
      nickname={oneData.nickname}
      gender={oneData.gender}
      openImageChoice={oneData.openImageChoice}
      messageToFriend={oneData.messageToFriend}
      motivations={oneData.motivations}
      levelOf3Dae={oneData.levelOf3Dae}
      weekdays={oneData.weekdays}
      ableDistricts={oneData.ableDistricts}
      type={type}
      renewFriends={renewFriends}
      setChatFriend={setChatFriend}
    />
  );
}
