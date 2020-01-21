/** @jsx jsx */
import React, { useState } from 'react';
import { Col, Card, Typography, Avatar, message } from 'antd';
import { jsx, css } from '@emotion/core';
import { useMutation, useApolloClient } from '@apollo/react-hooks';

import { withRouter } from 'react-router-dom';
import questionList from '../../config/questions';
import UserModal from './UserModal';
import {
  FOLLOW_USER,
  CANCEL_FOLLOWING,
  ADD_FRIEND,
  DELETE_FRIEND,
  DELETE_FOLLOWER,
  GET_USERINFO,
  GET_FRIENDS,
  CHECK_FOLLOWERS,
  CHECK_FRIENDS,
} from '../../graphql/queries';
import Loading from './Loading';
import redirectWhenError from '../../utils/redirectWhenError';

const { Title } = Typography;

const margin = css`
  margin-bottom: 20px;
`;

const cardCSS = css`
  border-radius: 4px;

  .ant-card-body {
    height: 220px;
    overflow: auto;
  }

  .ant-card-actions {
    border-radius: 0 0 4px 4px;
  }
`;

const districtCSS = css`
  border: 1px solid #ededed;
  border-radius: 4px;
  background: #fafafa;
  padding: 5px;
  margin-right: 5px;
  line-height: 2.5;
  white-space: nowrap;
`;

const titleCSS = css`
  word-break: keep-all;
`;

type UserCardProps = {
  id: any; // string으로 하면 안 되는 이유는??
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
  location: any;
  match: any;
  checked: boolean;
  setChatFriend: Function;
};

function UserCard({
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
  checked,
  setChatFriend,
}: UserCardProps) {
  const client = useApolloClient();
  const [visible, setVisible] = useState<boolean>(false);

  // useEffect 쓰는 것보다 아래처럼 내장 callback 쓰는게 나음.
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
  const [checkFollowers] = useMutation(CHECK_FOLLOWERS, {
    refetchQueries: [{ query: GET_FRIENDS }],
    onError: () => redirectWhenError({ history, client }),
  });

  const [checkFriends] = useMutation(CHECK_FRIENDS, {
    refetchQueries: [{ query: GET_FRIENDS }],
    onError: () => redirectWhenError({ history, client }),
  });

  // 나중에 loading 같은 것 붙이기. 그리고 완료시 완료됐다는 문구. z-index같은 것 줘서 투명도 조절해서 친구 목록들 위에 띄워주면 좋을듯.

  // 일단 이렇게 해놨는데 수정 필요할듯. 도장표시 같은 걸로.
  const color = checked ? 'black' : 'red';

  const changeToKorean = (data) => {
    const questionIndex: number = questionList
      .map((oneQ) => oneQ.subject)
      .indexOf(Object.keys(data)[0]);
    const optionIndex: number = questionList[questionIndex].value.indexOf(
      Object.values(data)[0] as string,
    ); // 이런식 typescript 문법도 공부
    return questionList[questionIndex].answer[optionIndex];
  };

  const makeOrder = (data) => {
    const targetQ = questionList.filter(
      (elm) => elm.subject === Object.keys(data)[0],
    )[0];
    const getOrder = (one: string): number => targetQ.answer.indexOf(one);
    return (one: string, two: string): number => getOrder(one) - getOrder(two);
  };

  const getPossibleDays = (weekdays) => {
    const days = weekdays
      .map((elm) => changeToKorean({ weekdays: elm.weekday }))
      .sort(makeOrder({ weekdays }))
      .join('');
    const SatIndex = days.indexOf('토');
    const SunIndex = days.indexOf('일');

    switch (days) {
      case '월화수목금토일':
        return '매일 가능';
      case '월화수목금':
        return '주중만 가능';
      case '토일':
        return '주말만 가능';
      default:
        // 토, 일요일 구분선
        if (SatIndex !== -1) {
          const temp = days.split('');
          temp.splice(SatIndex, 0, ' | ');
          return temp.join('');
        }
        if (SatIndex === -1 && SunIndex !== -1) {
          const temp = days.split('');
          temp.splice(SunIndex, 0, ' | ');
          return temp.join('');
        }
        return days;
    }
  };

  const checkCard = () => {
    if (type === 'friends') {
      checkFriends({ variables: { userIds: [id] } });
    }
    if (type === 'followers') {
      checkFollowers({ variables: { userIds: [id] } });
    }
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
        <span onClick={() => func()}>
          <b>{buttonText}</b>
        </span>,
      );
      // 채팅 연결 성공후 성공했다는 알림 및 채팅창 불 들어오는 noti 같은 것.
    }
    return cardActions.push(
      <span onClick={() => func({ variables: { userId: id } })}>
        <b>{buttonText}</b>
      </span>,
    );
  };

  if (type === 'friends') {
    makeButton(deleteFriend, '친구 끊기');
    makeButton(
      () => setChatFriend({ variables: { id, nickname } }),
      '채팅하기',
    );
  } else if (type === 'followers') {
    makeButton(deleteFollower, '친구신청 거절');
    makeButton(addFriend, '친구신청 수락');
  } else if (type === 'unknown') {
    makeButton(followUser, '친구 신청하기');
  } else if (type === 'following') {
    makeButton(cancelFollow, '친구신청 취소');
  }
  // find 메뉴에서 친구 신청하기 버튼 누르면 아래 경고창 뜸.
  // Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed.If necessary, trigger nested updates in componentDidUpdate.

  return (
    <Col xs={24} sm={12} lg={8} css={margin}>
      <Card actions={cardActions} css={cardCSS}>
        <UserModal
          id={id}
          changeToKorean={changeToKorean}
          makeOrder={makeOrder}
          visible={visible}
          setVisible={setVisible}
          nickname={nickname}
          levelOf3Dae={levelOf3Dae}
          gender={gender}
          weekdays={weekdays}
          ableDistricts={ableDistricts}
          motivations={motivations}
          openImageChoice={openImageChoice}
          messageToFriend={messageToFriend}
          type={type}
          history={history}
        />
        <Card.Meta avatar={<Avatar icon="user" />} title={nickname} />
        <br />
        <p style={{ position: 'absolute', top: 20, right: 20, color }}>
          {changeToKorean({ levelOf3Dae }).match(/\((.*?)\)/g)}
          {/* {changeToKorean({ gender })} */}
        </p>

        {loadingFU || loadingDFo || loadingDF || loadingAF || loadingCF ? (
          <Loading />
        ) : (
          <React.Fragment>
            <Title level={4} css={titleCSS}>
              {motivations
                .map((elm) => changeToKorean({ motivations: elm.motivation }))
                .join(', ')}
            </Title>
            <p>
              <span>{getPossibleDays(weekdays)}</span>
            </p>
            <p>
              {ableDistricts.map((elm) => (
                <span css={districtCSS} key={elm.district.nameOfDong}>
                  {elm.district.nameOfDong}
                </span>
              ))}
            </p>
          </React.Fragment>
        )}
      </Card>
    </Col>
  );
}

export default withRouter(UserCard);
