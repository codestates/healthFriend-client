/** @jsx jsx */
import { Row, Col } from 'antd';
import { css, jsx } from '@emotion/core';
import { useQuery } from '@apollo/react-hooks';

import SelectCity from '../components/FindFriend/SelectCity';
import SelectDefault from '../components/FindFriend/SelectDefault';
import UserCard from '../components/FindFriend/UserCard';
import { questionList } from '../config/fakeData';
import { GET_USERS } from '../graphql/queries';
import Loading from '../components/Shared/Loading';
import ErrorLoginFirst from '../components/Shared/ErrorLoginFirst';

const filterCSS = css`
  margin-bottom: 20px;
`;

function FindFriend() {
  const { loading, error, data } = useQuery(GET_USERS);

  const questions = ['weekdays', 'levelOf3Dae'].map((elm) => {
    const [{ question, answer }] = questionList.inputRegister.filter(
      ({ subject }) => subject === elm,
    );
    return (
      <Col md={5} key={question}>
        <SelectDefault dataSource={answer} placeholder={question} />
      </Col>
    );
  });

  if (loading) return <Loading />;
  if (error)
    // 여기도 서버에서 나오는 에러 종류에 따라서 Login 먼저 하세요를 보여줄지, 혹은 다른 에러 메세지를 보여줄지
    return <ErrorLoginFirst error={error} />;

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
