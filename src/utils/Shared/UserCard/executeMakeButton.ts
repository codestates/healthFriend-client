const executeMakeButton = ({
  type,
  history,
  makeButton,
  deleteFriend,
  deleteFollower,
  addFriend,
  followUser,
  cancelFollow,
}) => {
  switch (type) {
    case 'friends':
      makeButton(deleteFriend, '친구 끊기');
      makeButton(() => history.push('/chat'), '채팅하기');
      break;
    case 'followers':
      makeButton(deleteFollower, '요청 거절');
      makeButton(addFriend, '요청 수락');
      break;
    case 'unknown':
      makeButton(followUser, '친구 신청');
      break;
    case 'following':
      makeButton(cancelFollow, '신청 취소');
      break;
    default:
      break;
  }
};

export default executeMakeButton;
