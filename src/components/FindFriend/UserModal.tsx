/** @jsx jsx */
import { useEffect } from 'react';
import { Modal, Button, message } from 'antd';
import { jsx, css } from '@emotion/core';
import { useMutation } from '@apollo/react-hooks';

import {
  FOLLOW_USER,
  CANCEL_FOLLOWING,
  ADD_FRIEND,
  DELETE_FRIEND,
  DELETE_FOLLOWER,
} from '../../graphql/queries';
import Loading from '../Shared/Loading';

const tableCSS = css`
  width: 100%;
`;

const tableTH = css`
  width: 100px;
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
  type: string;
  renewFriends: any;
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
  type,
  renewFriends,
}: UserModalProps) {
  const [
    followUser,
    { data: dataFU, error: errorFU, loading: loadingFU },
  ] = useMutation(FOLLOW_USER);
  const [
    cancelFollow,
    { data: dataCF, error: errorCF, loading: loadingCF },
  ] = useMutation(CANCEL_FOLLOWING);
  const [
    addFriend,
    { data: dataAF, error: errorAF, loading: loadingAF },
  ] = useMutation(ADD_FRIEND);
  const [
    deleteFriend,
    { data: dataDF, error: errorDF, loading: loadingDF },
  ] = useMutation(DELETE_FRIEND);
  const [
    deleteFollower,
    { data: dataDFo, error: errorDFo, loading: loadingDFo },
  ] = useMutation(DELETE_FOLLOWER);

  useEffect(() => {
    if (dataFU || dataCF || dataAF || dataDF || dataDFo) {
      message.success('처리되었습니다');
      setVisible(false);
      renewFriends();
    }
    if (errorFU || errorCF || errorAF || errorDF || errorDFo) {
      message.error('처리에 실패하였습니다');
      setVisible(false);
    }
  }, [
    dataFU,
    dataCF,
    dataAF,
    dataDF,
    dataDFo,
    errorFU,
    errorCF,
    errorAF,
    errorDF,
    errorDFo,
    setVisible,
    renewFriends,
  ]);

  const modalFooter = [
    <Button key="back" onClick={() => setVisible(false)}>
      닫기
    </Button>,
  ];

  const makeButton = (func, buttonText) =>
    modalFooter.push(
      <Button
        key={buttonText}
        type="primary"
        onClick={() =>
          func({
            variables: { userId: id },
          })
        }
      >
        {buttonText}
      </Button>,
    );

  if (type === 'friends') {
    makeButton(deleteFriend, '친구 끊기');
    makeButton(() => console.log('친구야 채팅하자'), '채팅하기');
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
        title={nickname}
        footer={modalFooter}
        onCancel={() => setVisible(false)}
      >
        {loadingFU || loadingDFo || loadingDF || loadingAF || loadingCF ? (
          <Loading />
        ) : (
          <table css={tableCSS}>
            <tbody>
              <tr>
                <th css={tableTH}>성별</th>
                <td>{changeToKorean({ gender })}</td>
              </tr>
              <tr>
                <th css={tableTH}>3대 중량</th>
                <td>{changeToKorean({ levelOf3Dae })}</td>
              </tr>
              <tr>
                <th css={tableTH}>사진 공개</th>
                <td>{changeToKorean({ openImageChoice })}</td>
              </tr>
              <tr>
                <th css={tableTH}>운동 가능 지역</th>
                <td>
                  {ableDistricts
                    .map((elm) => elm.district.nameOfDong)
                    .join(', ')}
                </td>
              </tr>
              <tr>
                <th css={tableTH}>운동 가능 요일</th>
                <td>
                  {weekdays
                    .map((elm) => changeToKorean({ weekdays: elm.weekday }))
                    .sort(makeOrder({ weekdays }))
                    .join(', ')}
                </td>
              </tr>
              <tr>
                <th css={tableTH}>헬친을 찾는 이유</th>
                <td>
                  {motivations
                    .map((elm) =>
                      changeToKorean({ motivations: elm.motivation }),
                    )
                    .join(', ')}
                </td>
              </tr>
              <tr>
                <th css={tableTH}>인사말</th>
                <td>{messageToFriend}</td>
              </tr>
            </tbody>
          </table>
        )}
      </Modal>
    </div>
  );
}

export default UserModal;
