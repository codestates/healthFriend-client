/** @jsx jsx */
import React from 'react';
import { Modal, Button, message, Avatar } from 'antd';
import { jsx, css } from '@emotion/core';
import { useMutation, useApolloClient } from '@apollo/react-hooks';

import {
  FOLLOW_USER,
  CANCEL_FOLLOWING,
  ADD_FRIEND,
  DELETE_FRIEND,
  DELETE_FOLLOWER,
  GET_USERINFO,
  GET_FRIENDS,
} from '../../graphql/queries';
import Loading from './Loading';
import redirectWhenError from '../../utils/redirectWhenError';

const modalHeaderMan = css`
  text-align: center;
  background: linear-gradient(to bottom, #5075af 65%, white 35%) no-repeat;
  padding: 24px 0 0 0;
`;
const modalHeaderWoman = css`
  text-align: center;
  background: linear-gradient(to bottom, #ff6b6b 65%, white 35%) no-repeat;
  padding: 24px 0 0 0;
`;
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

const modalImage = css`
  height: 150px;
  width: 150px;
  border-radius: 50%;
  border: 2px solid black;
`;

const modalNickname = css`
  text-align: center;
  font-size: 1.5rem;
`;

const modalAnswer = css`
  font-size: 0.8rem;
  padding: 5px;
  border-radius: 5px;
  background-color: lightgray;
  display: inline-block;
`;

const modalBodyCss = css`
  padding: 0px;
`;

type UserModalProps = {
  changeToKorean: Function;
  makeOrder: Function;
  visible: boolean;
  setVisible: (args: boolean) => void;
  id: any;
  nickname: string;
  gender: string;
  levelOf3Dae: string;
  weekdays: any[];
  ableDistricts: any[];
  motivations: any[];
  openImageChoice: string;
  messageToFriend: string;
  profileImage: string | undefined;
  type: string;
  history: any;
  setChatFriend: Function;
  isFriend: boolean;
};

function UserModal({
  changeToKorean,
  makeOrder,
  visible,
  setVisible,
  id,
  nickname,
  gender,
  levelOf3Dae,
  weekdays,
  ableDistricts,
  motivations,
  openImageChoice,
  messageToFriend,
  profileImage,
  type,
  history,
  setChatFriend,
  isFriend,
}: UserModalProps) {
  const client = useApolloClient();
  // userCard와 userModal의 아래 mutation들 다 완전 중복인데 중복 제거하는 법 있나?

  const [followUser, { loading: loadingFU }] = useMutation(FOLLOW_USER, {
    refetchQueries: [{ query: GET_USERINFO }],
    onCompleted: (data) => {
      if (data) message.success('처리되었습니다');
    },
    onError: (error) => {
      console.log(error);
      redirectWhenError({ history, client });
    },
  });
  const [cancelFollow, { loading: loadingCF }] = useMutation(CANCEL_FOLLOWING, {
    refetchQueries: [{ query: GET_FRIENDS }],
    onCompleted: (data) => {
      if (data) message.success('처리되었습니다');
    },
    onError: (error) => {
      console.log(error);
      redirectWhenError({ history, client });
    },
  });
  const [addFriend, { loading: loadingAF }] = useMutation(ADD_FRIEND, {
    refetchQueries: [{ query: GET_FRIENDS }],
    onCompleted: (data) => {
      if (data) {
        message.success('처리되었습니다');
        client.writeData({
          data: {
            unread:
              data.addFriend.followers.filter((elm) => !elm.checked).length +
              data.addFriend.friends.filter((elm) => !elm.checked).length,
          },
        });
      }
    },
    onError: (error) => {
      console.log(error);
      redirectWhenError({ history, client });
    },
  });
  const [deleteFriend, { loading: loadingDF }] = useMutation(DELETE_FRIEND, {
    refetchQueries: [{ query: GET_FRIENDS }],
    onCompleted: (data) => {
      if (data) {
        message.success('처리되었습니다');
        client.writeData({
          data: {
            unread:
              data.deleteFriend.followers.filter((elm) => !elm.checked).length +
              data.deleteFriend.friends.filter((elm) => !elm.checked).length,
          },
        });
      }
    },
    onError: (error) => {
      console.log(error);
      redirectWhenError({ history, client });
    },
  });
  const [deleteFollower, { loading: loadingDFo }] = useMutation(
    DELETE_FOLLOWER,
    {
      refetchQueries: [{ query: GET_FRIENDS }],
      onCompleted: (data) => {
        if (data) {
          message.success('처리되었습니다');
          client.writeData({
            data: {
              unread:
                data.deleteFollower.followers.filter((elm) => !elm.checked)
                  .length +
                data.deleteFollower.friends.filter((elm) => !elm.checked)
                  .length,
            },
          });
        }
      },
      onError: (error) => {
        console.log(error);
        redirectWhenError({ history, client });
      },
    },
  );

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
    modalFooter.push(
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

  if (type === 'friends') {
    makeButton(deleteFriend, '친구 끊기');
    makeButton(() => history.push('/chat'), '채팅하기');
  } else if (type === 'followers') {
    makeButton(deleteFollower, '친구신청 거절');
    makeButton(addFriend, '친구신청 수락');
  } else if (type === 'unknown') {
    makeButton(followUser, '친구 신청하기');
  } else if (type === 'following') {
    makeButton(cancelFollow, '친구신청 취소');
  }

  return (
    <Modal
      visible={visible}
      footer={modalFooter}
      css={modalBodyCss}
      // className="ant-modal-body"
      onCancel={() => setVisible(false)}
    >
      {loadingFU || loadingDFo || loadingDF || loadingAF || loadingCF ? (
        <Loading />
      ) : (
        <React.Fragment>
          <div css={gender === 'MALE' ? modalHeaderMan : modalHeaderWoman}>
            {profileImage &&
            (openImageChoice === 'OPEN' ||
              (openImageChoice === 'FRIEND' && isFriend)) ? (
              <img src={profileImage} css={modalImage} alt="" />
            ) : (
              <Avatar size={150} icon="user" />
            )}
            <div css={modalNickname}>{nickname}</div>
          </div>

          <div style={{ padding: '0 24px' }}>
            <div style={{ fontSize: '1rem', marginBottom: '10px' }}>
              <div>3대 중량</div>
              <div css={modalAnswer}>{changeToKorean({ levelOf3Dae })}</div>
            </div>

            <div style={{ fontSize: '1rem', marginBottom: '10px' }}>
              <div>운동 가능 지역</div>
              <div css={modalAnswer}>
                {ableDistricts.map((elm) => elm.district.nameOfDong).join(', ')}
              </div>
            </div>
            <div style={{ fontSize: '1rem', marginBottom: '10px' }}>
              <div>운동 가능 요일</div>
              <div css={modalAnswer}>
                {weekdays
                  .map((elm) => changeToKorean({ weekdays: elm.weekday }))
                  .sort(makeOrder({ weekdays }))
                  .join(', ')}
              </div>
            </div>
            <div style={{ fontSize: '1rem', marginBottom: '10px' }}>
              <div>헬친을 찾는 이유</div>
              <div css={modalAnswer}>
                {motivations
                  .map((elm) => changeToKorean({ motivations: elm.motivation }))
                  .join(', ')}
              </div>
            </div>
            <div style={{ fontSize: '1rem', marginBottom: '10px' }}>
              <div>자기소개</div>
              <div>{messageToFriend}</div>
            </div>
          </div>
        </React.Fragment>
      )}
    </Modal>
  );
}

export default UserModal;
