import React from 'react';
import UserCard from '../FindFriend/UserCard';

// 여기 MakeCard 앞에 type 정의를 안해도 아무 문제 안 생기던데 원래 그런가? {} 형태로 props 형태로 안 넘기고, 그냥 함수 arg 형태로 넘겨서 그런듯.

// type MakeCardProps = {
//   oneData: any;
//   type: any;
//   renewFriends: Function;
//   setChatFriend: Function;
//   checked: boolean;
// };

export default function MakeCard(
  oneData,
  type,
  renewFriends,
  setChatFriend,
  checked,
) {
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
      checked={checked}
    />
  );
}
