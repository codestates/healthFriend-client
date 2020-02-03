/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { message } from 'antd';

// font-color change가 안됨.  ant-actions로 change해야 하는지
const negativeFooter = css`
  font-size: 13px;
`;
const positiveFooter = css`
  font-size: 14px;
  font-weight: bold;
`;

const makeCardFooterBtn = ({
  type,
  checkFriends,
  checkFollowers,
  id,
  nickname,
  setVisible,
  setChatFriend,
  deleteFriend,
  deleteFollower,
  addFriend,
  followUser,
  cancelFollow,
  history,
}) => {
  const checkCard = () => {
    if (type === 'friends') checkFriends({ variables: { userIds: [id] } });
    if (type === 'followers') checkFollowers({ variables: { userIds: [id] } });
  };

  const cardActions = [
    <span
      onClick={() => {
        setVisible(true);
        checkCard();
      }}
    >
      상세 보기
    </span>,
  ];

  const makeButton = (func, buttonText) => {
    if (buttonText === '채팅하기') {
      return cardActions.push(
        <span
          onClick={() => {
            checkCard();
            setChatFriend({ variables: { id, nickname } });
            message.success('채팅창으로 이동합니다');
            func();
          }}
          css={positiveFooter}
        >
          {buttonText}
        </span>,
      );
    }
    return cardActions.push(
      <span
        onClick={() => {
          func({ variables: { userId: id } });
        }}
        css={
          ['친구 끊기', '요청 거절', '신청 취소'].indexOf(buttonText) !== -1
            ? negativeFooter
            : positiveFooter
        }
      >
        {buttonText}
      </span>,
    );
  };

  switch (type) {
    case 'friends':
      makeButton(deleteFriend, '친구 끊기');
      makeButton(() => history.push('/Chat'), '채팅하기');
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

  return cardActions;
};

export default makeCardFooterBtn;
