/** @jsx jsx */
import React, { useState } from 'react';
import { Col, Card, Avatar, message, Popover } from 'antd';
import { jsx, css } from '@emotion/core';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faChild } from '@fortawesome/free-solid-svg-icons';

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

const margin = css`
  padding: 10px;
  margin: 0 auto;
  text-align: center;
`;

const cardCSS = css`
  border-radius: 4px;
  width: 80%;
  display: inline-block;

  .ant-card-head-title {
    padding: 0;
  }

  .ant-card-body {
    height: 200px;
    overflow: auto;
    padding: 20px;
  }

  .ant-card-actions {
    border-radius: 0 0 4px 4px;
  }

  .ant-card-meta-avatar {
    padding-right: 10px;
  }

  .ant-card-meta-title {
    font-size: 24px;
    width: 60%;
  }
`;

const iconWrapper = css`
  text-align: center;
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

const profileImageCss = css`
  width: 100px;
  height: 100px;
`;

const placesCss = css`
  overflow: hidden;
  white-space: nowrap;
`;

const cardWrapper = css`
  text-align: left;
`;

const tableStyle = css`
  padding: 2px;
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
  profileImage: string | undefined;
  type: string;
  history: any;
  location: any;
  match: any;
  checked: boolean;
  setChatFriend: Function;
  isFriend: boolean;
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
  profileImage,
  type,
  history,
  checked,
  setChatFriend,
  isFriend,
}: UserCardProps) {
  const client = useApolloClient();
  const [visible, setVisible] = useState<boolean>(false);

  // useEffect 쓰는 것보다 아래처럼 내장 callback 쓰는게 나음.
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
            unreadFollowers: data.addFriend.followers.filter(
              (elm) => !elm.checked,
            ).length,
            unreadFriends: data.addFriend.friends.filter((elm) => !elm.checked)
              .length,
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
            unreadFollowers: data.deleteFriend.followers.filter(
              (elm) => !elm.checked,
            ).length,
            unreadFriends: data.deleteFriend.friends.filter(
              (elm) => !elm.checked,
            ).length,
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
              unreadFollowers: data.deleteFollower.followers.filter(
                (elm) => !elm.checked,
              ).length,
              unreadFriends: data.deleteFollower.friends.filter(
                (elm) => !elm.checked,
              ).length,
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
  const [checkFollowers] = useMutation(CHECK_FOLLOWERS, {
    refetchQueries: [{ query: GET_FRIENDS }],
    onCompleted: (data) => {
      if (data) {
        client.writeData({
          data: {
            unread:
              data.checkFollowers.followers.filter((elm) => !elm.checked)
                .length +
              data.checkFollowers.friends.filter((elm) => !elm.checked).length,
            unreadFollowers: data.checkFollowers.followers.filter(
              (elm) => !elm.checked,
            ).length,
            unreadFriends: data.checkFollowers.friends.filter(
              (elm) => !elm.checked,
            ).length,
          },
        });
      }
    },
    onError: (error) => {
      console.log(error);
      redirectWhenError({ history, client });
    },
  });

  const [checkFriends] = useMutation(CHECK_FRIENDS, {
    refetchQueries: [{ query: GET_FRIENDS }],
    onCompleted: (data) => {
      if (data) {
        client.writeData({
          data: {
            unread:
              data.checkFriends.followers.filter((elm) => !elm.checked).length +
              data.checkFriends.friends.filter((elm) => !elm.checked).length,
            unreadFollowers: data.checkFriends.followers.filter(
              (elm) => !elm.checked,
            ).length,
            unreadFriends: data.checkFriends.friends.filter(
              (elm) => !elm.checked,
            ).length,
          },
        });
      }
    },
    onError: (error) => {
      console.log(error);
      redirectWhenError({ history, client });
    },
  });

  // 나중에 loading 같은 것 붙이기. 그리고 완료시 완료됐다는 문구. z-index같은 것 줘서 투명도 조절해서 친구 목록들 위에 띄워주면 좋을듯.

  // 일단 이렇게 해놨는데 수정 필요할듯. 도장표시 같은 걸로.
  const color = checked ? '#ccc' : 'red';

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

  const getTableDays = (weekdays) => {
    const days = weekdays
      .map((elm) => changeToKorean({ weekdays: elm.weekday }))
      .sort(makeOrder({ weekdays }));
    return days;
  };

  const DayTable = () => (
    <table style={{ padding: '2px' }}>
      <tbody>
        <tr>
          {['월', '화', '수', '목', '금', '토', '일'].map((elm) => {
            const [textColor, backColor] =
              getTableDays(weekdays).indexOf(elm) !== -1
                ? ['black', '#fbc531']
                : ['#ccc', '#CCC'];
            return (
              <td
                css={tableStyle}
                style={{ background: backColor, color: textColor }}
                key={elm}
              >
                {elm}
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  );

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
        >
          <b>{buttonText}</b>
        </span>,
      );
    }
    return cardActions.push(
      <span
        onClick={() => {
          func({ variables: { userId: id } });
        }}
      >
        <b>{buttonText}</b>
      </span>,
    );
  };

  switch (type) {
    case 'friends':
      makeButton(deleteFriend, '친구 끊기');
      makeButton(() => history.push('/Chat'), '채팅하기');
      break;
    case 'followers':
      makeButton(deleteFollower, '친구신청 거절');
      makeButton(addFriend, '친구신청 수락');
      break;
    case 'unknown':
      makeButton(followUser, '친구 신청하기');
      break;
    case 'following':
      makeButton(cancelFollow, '친구신청 취소');
      break;
    default:
      break;
  }

  let healthLevel;
  switch (
    changeToKorean({ levelOf3Dae })
      .match(/\((.*?)\)/g)![0]
      .slice(1, -1)
  ) {
    case '생초보':
      healthLevel = 'lg';
      break;
    case '초보':
      healthLevel = '2x';
      break;
    case '중수':
      healthLevel = '3x';
      break;
    case '고수':
      healthLevel = '4x';
      break;
    case '괴물':
      healthLevel = '5x';
      break;
    default:
      break;
  }

  let iconColor = 'red';
  if (changeToKorean({ gender }) === '남자') iconColor = 'blue';

  // 아래 userModal 부분 축약해서 쓰는 법??
  return (
    <Col xs={24} sm={12} lg={6} css={margin}>
      <Card
        actions={cardActions}
        css={cardCSS}
        style={{ border: `1px solid ${color}` }}
      >
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
          profileImage={profileImage}
          type={type}
          history={history}
          setChatFriend={setChatFriend}
          isFriend={isFriend}
        />
<<<<<<< HEAD
        <Card.Meta
          avatar={
            profileImage &&
            (openImageChoice === 'OPEN' ||
              (openImageChoice === 'FRIEND' && isFriend)) ? (
              <Popover
                content={
                  <img src={profileImage} height="200" width="200" alt="" />
                }
                title={nickname}
              >
                <Avatar src={profileImage} />
              </Popover>
            ) : (
              <Avatar icon="user" />
            )
          }
          title={nickname}
        />
        <br />
        <p style={{ position: 'absolute', top: 20, right: 20 }}>
          {changeToKorean({ gender }) === '남자' ? (
            <img src={male} height="30" width="30" alt="" />
=======
        <div css={cardWrapper}>
          <Card.Meta
            avatar={
              profileImage &&
              (openImageChoice === 'OPEN' ||
                (openImageChoice === 'FRIEND' && isFriend)) ? (
                <Popover
                  content={
                    <img
                      src={profileImage}
                      css={profileImageCss}
                      height="50px"
                      width="50px"
                      alt=""
                    />
                  }
                  title={nickname}
                >
                  <Avatar src={profileImage} />
                </Popover>
              ) : (
                <Avatar icon="user" />
              )
            }
            title={nickname}
          />

          {/* <br /> */}
          <div
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              overflow: 'hidden',
            }}
            css={iconWrapper}
          >
            <div>
              <FontAwesomeIcon icon={faDumbbell} size={healthLevel} />
            </div>
            <FontAwesomeIcon
              icon={faChild}
              size="2x"
              style={{ color: iconColor }}
            />
          </div>
          <br />
          <div />
          {loadingFU || loadingDFo || loadingDF || loadingAF || loadingCF ? (
            <Loading />
>>>>>>> 5da54bf06f879dcf2da3aca92818340759d2e32b
          ) : (
            <React.Fragment>
              <br />
              <DayTable />
              {/* <div>{getPossibleDays(weekdays)}</div> */}
              <br />
              <div css={placesCss}>
                {ableDistricts
                  .map((elm) => (
                    <span css={districtCSS} key={elm.district.nameOfDong}>
                      {elm.district.nameOfDong}
                    </span>
                  ))
                  .filter((el, idx) => idx < 3)}
                {ableDistricts.length > 3 ? '.......' : null}
              </div>
            </React.Fragment>
          )}
        </div>
      </Card>
    </Col>
  );
}

export default withRouter(UserCard);
