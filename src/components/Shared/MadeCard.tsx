import React from 'react';
import UserCard from './UserCard';

// 여기 MadeCard 앞에 type 정의를 안해도 아무 문제 안 생기던데 원래 그런가? {} 형태로 props 형태로 안 넘기고, 그냥 함수 arg 형태로 넘겨서 그런듯.

// type MadeCardProps = {
//   oneData: any;
//   type: any;
//   setChatFriend: Function;
//   checked: boolean;
// };

export default function MadeCard(oneData, type, setChatFriend, checked) {
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
      profileImage={
        oneData.profileImage.length > 0
          ? oneData.profileImage[0].filename
          : undefined
      }
      type={type}
      setChatFriend={setChatFriend}
      checked={checked}
    />
  );
}
