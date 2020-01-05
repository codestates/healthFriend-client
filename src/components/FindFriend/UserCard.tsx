/** @jsx jsx */
import { useState } from 'react';
import { Col, Card, Button } from 'antd';
import { jsx, css } from '@emotion/core';

import { questionList } from '../../config/fakeData';
import UserModal from './UserModal';

const margin = css`
  margin-bottom: 20px;
`;

type UserCardProps = {
  nickname: string;
  levelOf3Dae: string;
  weekdays: any[];
  ableDistricts: any[];
  motivations: any[];
  openImageChoice: string;
  messageToFriend: string;
};

function UserCard({
  nickname,
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
    const questionIndex: number = questionList.inputRegister
      .map((oneQ) => oneQ.subject)
      .indexOf(Object.keys(data)[0]);
    const optionIndex: number = questionList.inputRegister[
      questionIndex
    ].value.indexOf(Object.values(data)[0] as string); // 이런식 typescript 문법도 공부
    return questionList.inputRegister[questionIndex].answer[optionIndex];
  };

  const makeOrder = (data) => {
    const targetQ = questionList.inputRegister.filter(
      (elm) => elm.subject === Object.keys(data)[0],
    )[0];
    const getOrder = (one: string): number => targetQ.answer.indexOf(one);
    return (one: string, two: string): number => getOrder(one) - getOrder(two);
  };

  return (
    <Col xs={20} md={8} css={margin}>
      <Card
        title={nickname}
        extra={
          <Button type="primary" onClick={showModal}>
            상세 보기
          </Button>
        }
        bordered
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
          weekdays={weekdays}
          ableDistricts={ableDistricts}
          motivations={motivations}
          openImageChoice={openImageChoice}
          messageToFriend={messageToFriend}
        />
        <p>{changeToKorean({ levelOf3Dae })}</p>
        <p>
          {weekdays
            .map((elm) => changeToKorean({ weekdays: elm.weekday }))
            .sort(makeOrder({ weekdays }))
            .join(', ')}
        </p>
        <p>{ableDistricts.map((elm) => elm.district.nameOfDong).join(', ')}</p>
      </Card>
    </Col>
  );
}

export default UserCard;
