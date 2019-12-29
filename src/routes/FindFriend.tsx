/** @jsx jsx */
// import React from 'react';
import { Row, Col } from 'antd';
import { css, jsx } from '@emotion/core';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import SelectCity from '../components/FindFriend/SelectCity';
import SelectDefault from '../components/FindFriend/SelectDefault';
import UserCard from '../components/FindFriend/UserCard';
import { questionList } from '../config/fakeData';

const filterCSS = css`
  margin-bottom: 20px;
`;

const GET_USERS = gql`
  {
    users {
      id
      nickname
      levelOf3Dae
      messageToFriend
    }
  }
`;

function FindFriend() {
  const { loading, error, data } = useQuery(GET_USERS);

  const questions = ['day', '3dae', 'reason'].map((elm) => {
    const [{ question, answer }] = questionList.inputRegister.filter(
      ({ subject }) => subject === elm,
    );
    return (
      <Col md={5} key={question}>
        <SelectDefault dataSource={answer} placeholder={question} />
      </Col>
    );
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! ${error.message}`</div>;

  return (
    <Row type="flex" justify="center" style={{ marginTop: 20 }}>
      <Col xs={20} md={20} css={filterCSS}>
        <Row gutter={24} type="flex" justify="space-between">
          <Col md={9}>
            <SelectCity />
          </Col>
          {questions}
        </Row>
      </Col>

      <Col xs={20} md={20}>
        <Row gutter={24} type="flex" justify="space-between">
          {data.users.map((oneData) => (
            <UserCard
              key={oneData.nickname}
              nickname={oneData.nickname}
              levelOf3Dae={oneData.levelOf3Dae}
              messageToFriend={oneData.messageToFriend}
            />
          ))}
        </Row>
      </Col>
    </Row>
  );
}

export default FindFriend;
