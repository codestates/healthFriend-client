/** @jsx jsx */
import { useState } from 'react';
import { Col, Card, Typography, Avatar } from 'antd';
import { jsx, css } from '@emotion/core';

import questionList from '../../config/fakeData';
import UserModal from './UserModal';

const { Title } = Typography;

const margin = css`
  margin-bottom: 20px;
`;

const cardCSS = css`
  border-radius: 4px;

  .ant-card-body {
    min-height: 300px;
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
  nickname: string;
  gender: string;
  levelOf3Dae: string;
  weekdays: any[];
  ableDistricts: any[];
  motivations: any[];
  openImageChoice: string;
  messageToFriend: string;
};

function UserCard({
  nickname,
  gender,
  levelOf3Dae,
  weekdays,
  ableDistricts,
  motivations,
  openImageChoice,
  messageToFriend,
}: UserCardProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoaidng] = useState<boolean>(false);

  const showModal = () => {
    setVisible(true);
  };

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

  return (
    <Col xs={24} sm={12} lg={8} css={margin}>
      <Card
        actions={[
          <span onClick={showModal}>상세 보기</span>,
          <span>
            <b>친구 신청하기</b>
          </span>,
        ]}
        css={cardCSS}
      >
        <UserModal
          changeToKorean={changeToKorean}
          makeOrder={makeOrder}
          visible={visible}
          setVisible={setVisible}
          loading={loading}
          setLoading={setLoaidng}
          nickname={nickname}
          levelOf3Dae={levelOf3Dae}
          gender={gender}
          weekdays={weekdays}
          ableDistricts={ableDistricts}
          motivations={motivations}
          openImageChoice={openImageChoice}
          messageToFriend={messageToFriend}
        />
        <Card.Meta avatar={<Avatar icon="user" />} title={nickname} />
        <br />
        <p style={{ position: 'absolute', top: 20, right: 20 }}>
          {changeToKorean({ levelOf3Dae }).match(/\((.*?)\)/g)}
          {/* {changeToKorean({ gender })} */}
        </p>
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
      </Card>
    </Col>
  );
}

export default UserCard;
