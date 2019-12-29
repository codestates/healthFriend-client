/** @jsx jsx */
import { Row, Col } from 'antd';
import { css, jsx } from '@emotion/core';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import SelectCity from '../components/FindFriend/SelectCity';
import SelectDefault from '../components/FindFriend/SelectDefault';
import UserCard from '../components/FindFriend/UserCard';

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! ${error.message}`</div>;

  return (
    <Row type="flex" justify="center" style={{ marginTop: 20 }}>
      <Col xs={20} md={20} css={filterCSS}>
        <Row gutter={24} type="flex" justify="space-between">
          <Col md={9}>
            <SelectCity />
          </Col>
          <Col md={5}>
            <SelectDefault
              dataSource={['월', '화', '수', '목', '금', '토', '일']}
              placeholder="언제 운동이 가능한가요?"
            />
          </Col>
          <Col md={5}>
            <SelectDefault
              dataSource={[100, 200, 300, 400, 500]}
              placeholder="원하는 친구의 3대 중량은?"
            />
          </Col>
          <Col md={5}>
            <SelectDefault
              dataSource={[
                '증량이 목표',
                '친구 만들기 위해',
                '다이어트 하기 위해',
                '언더아머 단속 전문',
              ]}
              placeholder="운동 목적은 무엇인가요?"
            />
          </Col>
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
