/** @jsx jsx */
import { Modal, Button, message } from 'antd';
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
  history: any;
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
  history,
}: UserModalProps) {
  const client = useApolloClient();
  const [followUser, { loading: loadingFU }] = useMutation(FOLLOW_USER, {
    refetchQueries: [{ query: GET_USERINFO }],
    onCompleted: () => message.success('처리되었습니다'),
    onError: () => redirectWhenError({ history, client }),
  });
  const [cancelFollow, { loading: loadingCF }] = useMutation(CANCEL_FOLLOWING, {
    refetchQueries: [{ query: GET_FRIENDS }],
    onCompleted: () => message.success('처리되었습니다'),
    onError: () => redirectWhenError({ history, client }),
  });
  const [addFriend, { loading: loadingAF }] = useMutation(ADD_FRIEND, {
    refetchQueries: [{ query: GET_FRIENDS }],
    onCompleted: () => message.success('처리되었습니다'),
    onError: () => redirectWhenError({ history, client }),
  });
  const [deleteFriend, { loading: loadingDF }] = useMutation(DELETE_FRIEND, {
    refetchQueries: [{ query: GET_FRIENDS }],
    onCompleted: () => message.success('처리되었습니다'),
    onError: () => redirectWhenError({ history, client }),
  });
  const [deleteFollower, { loading: loadingDFo }] = useMutation(
    DELETE_FOLLOWER,
    {
      refetchQueries: [{ query: GET_FRIENDS }],
      onCompleted: () => message.success('처리되었습니다'),
      onError: () => redirectWhenError({ history, client }),
    },
  );

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
