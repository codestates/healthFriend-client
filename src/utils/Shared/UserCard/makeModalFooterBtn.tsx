/** @jsx jsx */
import { Button, message } from 'antd';
import { jsx, css } from '@emotion/core';
import executeMakeButton from './executeMakeButton';

const modalButtonCss = css`
  background: #ed9364;
  border-color: #ed9364;
  color: black;
  &:hover {
    background-color: #ffbe76;
    border-color: #ffbe76;
    color: black;
  }
  &:focus {
    background-color: #ed9364;
    border-color: #ed9364;
    color: black;
  }
`;
const negativeButtonCss = css`
  background: #e9e2d0;
  border-color: #e9e2d0;
  color: #999;
  &:hover {
    background-color: #ccc;
    border-color: #ccc;
    color: #999;
  }
  &:focus {
    background-color: #ccc;
    border-color: #ccc;
    color: #999;
  }
`;

const makeModalFooterBtn = ({
  setVisible,
  id,
  setChatFriend,
  nickname,
  type,
  history,
  deleteFriend,
  deleteFollower,
  addFriend,
  followUser,
  cancelFollow,
}) => {
  const modalFooter = [
    <Button key="back" css={modalButtonCss} onClick={() => setVisible(false)}>
      닫기
    </Button>,
  ];

  const makeButton = (func, buttonText) => {
    if (buttonText === '채팅하기') {
      return modalFooter.push(
        <Button
          key={id}
          css={modalButtonCss}
          onClick={() => {
            setChatFriend({ variables: { id, nickname } });
            message.success('채팅창으로 이동합니다');
            func();
          }}
        >
          <b>{buttonText}</b>
        </Button>,
      );
      // 채팅 연결 성공후 성공했다는 알림 및 채팅창 불 들어오는 noti 같은 것.
    }
    return modalFooter.push(
      <Button
        key={buttonText}
        css={
          ['친구 끊기', '친구신청 거절', '친구신청 취소'].indexOf(
            buttonText,
          ) !== -1
            ? negativeButtonCss
            : modalButtonCss
        }
        type="primary"
        onClick={() => func({ variables: { userId: id } })}
      >
        {buttonText}
      </Button>,
    );
  };

  executeMakeButton({
    type,
    history,
    makeButton,
    deleteFriend,
    deleteFollower,
    addFriend,
    followUser,
    cancelFollow,
  });

  return modalFooter;
};

export default makeModalFooterBtn;
