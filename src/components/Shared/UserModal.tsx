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

const modalHeader = css`
  text-align: center;
  margin: 30px 20px 0;
`;

const modalImage = css`
  height: 150px;
  width: 150px;
  border-radius: 50%;
`;

const modalNickname = css`
  text-align: center;
  font-size: 1.7rem;
  margin-bottom: 20px;
  border-bottom: 1px solid black;
`;

const modalAnswer = css`
  font-size: 0.8rem;
  padding: 5px;
  border-radius: 5px;
  background-color: lightgray;
  display: inline-block;
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
    <Button key="back" onClick={() => setVisible(false)}>
      닫기
    </Button>,
  ];

  const makeButton = (func, buttonText) => {
    if (buttonText === '채팅하기') {
      return modalFooter.push(
        <span
          onClick={() => {
            setChatFriend({ variables: { id, nickname } });
            message.success('채팅창으로 이동합니다');
            func();
          }}
        >
          <b>{buttonText}</b>
        </span>,
      );
      // 채팅 연결 성공후 성공했다는 알림 및 채팅창 불 들어오는 noti 같은 것.
    }
    modalFooter.push(
      <Button
        key={buttonText}
        type="primary"
        onClick={() => func({ variables: { userId: id } })}
      >
        {buttonText}
      </Button>,
    );
  };

  if (type === 'friends') {
    makeButton(deleteFriend, '친구 끊기');
    makeButton(() => history.push('/Chat'), '채팅하기');
  } else if (type === 'followers') {
    makeButton(deleteFollower, '친구신청 거절');
    makeButton(addFriend, '친구신청 수락');
  } else if (type === 'unknown') {
    makeButton(followUser, '친구 신청하기');
  } else if (type === 'following') {
    makeButton(cancelFollow, '친구신청 취소');
  }

  return (
    <div>
      <Modal
        visible={visible}
        footer={modalFooter}
        onCancel={() => setVisible(false)}
      >
        {loadingFU || loadingDFo || loadingDF || loadingAF || loadingCF ? (
          <Loading />
        ) : (
          <React.Fragment>
            <div css={modalHeader}>
              {profileImage &&
              (openImageChoice === 'OPEN' ||
                (openImageChoice === 'FRIEND' && isFriend)) ? (
                <img src={profileImage} css={modalImage} alt="" />
              ) : (
                <Avatar size={150} icon="user" />
              )}
            </div>
            <div css={modalNickname}>{nickname}</div>
            <div
              style={{
                fontSize: '1.3rem',
                margin: '10px 0',
              }}
            >
              헬스친구 정보
            </div>
            <div>
              <div style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
                <div>성별</div>
                <div css={modalAnswer}>{changeToKorean({ gender })}</div>
              </div>
              <div style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
                <div>3대 중량</div>
                <div css={modalAnswer}>{changeToKorean({ levelOf3Dae })}</div>
              </div>
              <div style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
                <div>사진 공개</div>
                <div css={modalAnswer}>
                  {changeToKorean({ openImageChoice })}
                </div>
              </div>
              <div style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
                <div>운동 가능 지역</div>
                <div css={modalAnswer}>
                  {ableDistricts
                    .map((elm) => elm.district.nameOfDong)
                    .join(', ')}
                </div>
              </div>
              <div style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
                <div>운동 가능 요일</div>
                <div css={modalAnswer}>
                  {weekdays
                    .map((elm) => changeToKorean({ weekdays: elm.weekday }))
                    .sort(makeOrder({ weekdays }))
                    .join(', ')}
                </div>
              </div>
              <div style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
                <div>헬친을 찾는 이유</div>
                <div css={modalAnswer}>
                  {motivations
                    .map((elm) =>
                      changeToKorean({ motivations: elm.motivation }),
                    )
                    .join(', ')}
                </div>
              </div>
              <div style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
                <div>자기소개</div>
                <div>{messageToFriend}</div>
              </div>
            </div>
          </React.Fragment>
        )}
      </Modal>
    </div>
  );
}

export default UserModal;
