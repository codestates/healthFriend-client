/** @jsx jsx */
import React from 'react';
import { Modal, Avatar } from 'antd';
import { jsx, css } from '@emotion/core';
import { useApolloClient } from '@apollo/react-hooks';
import Loading from '../Loading';
import handleCardModalBtn from '../../../utils/Shared/UserCard/handleCardModalBtn';
import makeModalFooterBtn from '../../../utils/Shared/UserCard/makeModalFooterBtn';
import useMakeRelation from '../../../hooks/Shared/useMakeRelation';

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
  .ant-modal-body {
    padding: 0px;
  }
`;
const itemsWrapper = css`
  padding: 0px 24px;
`;
const modalItemWrapper = css`
  font-size: 1rem;
  margin-bottom: 10px;
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
  const { errorHandle, afterDoneFunc } = handleCardModalBtn({
    history,
    client,
  });

  const {
    deleteFriend,
    deleteFollower,
    addFriend,
    followUser,
    cancelFollow,
    loadingFU,
    loadingDFo,
    loadingDF,
    loadingAF,
    loadingCF,
  } = useMakeRelation({ afterDoneFunc, errorHandle });

  const modalFooter = makeModalFooterBtn({
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
  });

  return (
    <Modal
      visible={visible}
      footer={modalFooter}
      css={modalBodyCss}
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

          <div css={itemsWrapper}>
            <div css={modalItemWrapper}>
              <div>3대 중량</div>
              <div css={modalAnswer}>{changeToKorean({ levelOf3Dae })}</div>
            </div>

            <div css={modalItemWrapper}>
              <div>운동 가능 지역</div>
              <div css={modalAnswer}>
                {ableDistricts.map((elm) => elm.district.nameOfDong).join(', ')}
              </div>
            </div>
            <div css={modalItemWrapper}>
              <div>운동 가능 요일</div>
              <div css={modalAnswer}>
                {weekdays
                  .map((elm) => changeToKorean({ weekdays: elm.weekday }))
                  .sort(makeOrder({ weekdays }))
                  .join(', ')}
              </div>
            </div>
            <div css={modalItemWrapper}>
              <div>헬친을 찾는 이유</div>
              <div css={modalAnswer}>
                {motivations
                  .map((elm) => changeToKorean({ motivations: elm.motivation }))
                  .join(', ')}
              </div>
            </div>
            <div css={modalItemWrapper}>
              <div>자기소개</div>
              <div css={modalAnswer}>{messageToFriend}</div>
            </div>
          </div>
        </React.Fragment>
      )}
    </Modal>
  );
}

export default UserModal;
