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
} from '../../graphql/queries';
import Loading from '../Shared/Loading';

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
  renewFriends: any;
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
  renewFriends,
  history,
  checked,
  setChatFriend,
}: UserCardProps) {
  const [visible, setVisible] = useState<boolean>(false);

  const [
    followUser,
    { /* data: dataFU, error: errorFU, */ loading: loadingFU },
  ] = useMutation(FOLLOW_USER);
  const [
    cancelFollow,
    { /* data: dataCF, error: errorCF, */ loading: loadingCF },
  ] = useMutation(CANCEL_FOLLOWING);
  const [
    addFriend,
    { /* data: dataAF, error: errorAF, */ loading: loadingAF },
  ] = useMutation(ADD_FRIEND);
  const [
    deleteFriend,
    { /* data: dataDF, error: errorDF, */ loading: loadingDF },
  ] = useMutation(DELETE_FRIEND);
  const [
    deleteFollower,
    { /* data: dataDFo, error: errorDFo, */ loading: loadingDFo },
  ] = useMutation(DELETE_FOLLOWER);

  // 나중에 loading 같은 것 붙이기. 그리고 완료시 완료됐다는 문구. z-index같은 것 줘서 투명도 조절해서 친구 목록들 위에 띄워주면 좋을듯.

  const client = useApolloClient();

  // useEffect(() => {
  //   if (dataFU || dataCF || dataAF || dataDF || dataDFo) {
  //     message.success('처리되었습니다');
  //     renewFriends();
  //   }
  //   if (errorFU || errorCF || errorAF || errorDF || errorDFo) {
  //     client.writeData({ data: { isLoggedIn: false } });
  //     message.error('처리에 실패하였습니다');
  //     history.push('/');
  //     window.scrollTo(0, 0);
  //     // 에러 핸들링 안됨. Unhandled Rejection (Error): GraphQL error: Cannot read property 계속 이것 뜸.
  //   }
  // }
  // , [
  //   dataFU,
  //   dataCF,
  //   dataAF,
  //   dataDF,
  //   dataDFo,
  //   errorFU,
  //   errorCF,
  //   errorAF,
  //   errorDF,
  //   errorDFo,
  //   setVisible,
  //   renewFriends,
  // ]);

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
    const daysStr = weekdays
      .map((elm) => changeToKorean({ weekdays: elm.weekday }))
      .sort(makeOrder({ weekdays }))
      .join('');

    switch (daysStr) {
      case '월화수목금토일':
        return '매일 가능';
      case '월화수목금':
        return '주중만 가능';
      case '토일':
        return '주말만 가능';
      default:
        // 토, 일요일 구분선
        const indexOfSaturday = daysStr.indexOf('토');
        const indexOfSunday = daysStr.indexOf('일');
        if (indexOfSaturday !== -1) {
          const temp = daysStr.split('');
          temp.splice(indexOfSaturday, 0, ' | ');
          return temp.join('');
        }
        if (indexOfSaturday === -1 && indexOfSunday !== -1) {
          const temp = daysStr.split('');
          temp.splice(indexOfSunday, 0, ' | ');
          return temp.join('');
        }
        return daysStr;
    }
  };

  const cardActions = [<span onClick={() => setVisible(true)}>상세 보기</span>];

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
      <span
        onClick={
          () =>
            func({
              variables: { userId: id },
            })
              .then(() => {
                message.success('처리되었습니다');
                renewFriends();
              })
              .catch(() => {
                client.writeData({ data: { isLoggedIn: false } });
                message.error('처리에 실패하였습니다');
                history.push('/');
                window.scrollTo(0, 0);
              })
          // 여기다가 바로 붙이면 Unhandled Rejection (Error): GraphQL error: Cannot read property 'id' of null 그런게 안나는데 useEffect로 해서 위에다가 분기 붙이면 문제 생기는 이유가 뭘까???
        }
      >
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
          renewFriends={renewFriends}
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
