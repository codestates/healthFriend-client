/** @jsx jsx */
import { useState } from 'react';
import { Row, Col, Button } from 'antd';
import { css, jsx } from '@emotion/core';
import { useLazyQuery } from '@apollo/react-hooks';

import SelectPlace from '../components/FindFriend/SelectPlace';
import SelectDefault from '../components/FindFriend/SelectDefault';
import UserCard from '../components/FindFriend/UserCard';
import { questionList } from '../config/fakeData';
import { GET_FILTERED_USERS } from '../graphql/queries';
import Loading from '../components/Shared/Loading';
import ErrorLoginFirst from '../components/Shared/ErrorLoginFirst';

const filterCSS = css`
  margin-bottom: 20px;
`;

function FindFriend() {
  const [filter, setFilter] = useState<any>({
    openImageChoice: [],
    levelOf3Dae: [],
    motivations: [],
    weekdays: [],
  });
  const [places, setPlaces] = useState<string[]>([]);

  const [getFilteredUsers, { loading, data, error }] = useLazyQuery(
    GET_FILTERED_USERS,
    {
      fetchPolicy: 'network-only',
    },
  );

  console.log('filter', filter);
  console.log('places', places);

  if (loading) return <Loading />;
  if (error)
    // 여기도 서버에서 나오는 에러 종류에 따라서 Login 먼저 하세요를 보여줄지, 혹은 다른 에러 메세지를 보여줄지
    return <ErrorLoginFirst error={error} />;

  const filterList = questionList.inputRegister
    .filter((elm) => elm.isFilterList)
    .map((ele) => ele.subject);

  const questions = filterList.map((filterQ) => {
    const [{ subject, question, answer }] = questionList.inputRegister.filter(
      (elm) => elm.subject === filterQ,
    );
    return subject === 'place' ? (
      <Col md={6} key={question}>
        <SelectPlace setPlaces={setPlaces} selectedPlaces={[]} />
      </Col>
    ) : (
      <Col md={4} key={question}>
        <SelectDefault
          subject={subject}
          options={answer}
          placeholder={question}
          filter={filter}
          setFilter={setFilter}
        />
      </Col>
    );
  });

  console.log('data', data);

  return (
    <Row type="flex" justify="center" style={{ marginTop: 20 }}>
      <Col xs={22} md={22} css={filterCSS}>
        <Row gutter={24} type="flex" justify="space-between">
          {questions}
        </Row>
      </Col>
      <Col xs={22} md={22}>
        <Button
          type="primary"
          onClick={() => {
            getFilteredUsers({ variables: { openImageChoice: 'OPEN' } });
            // 여기만 바꾸면 친구 찾기 부분 완성
          }}
        >
          친구 찾기!!
        </Button>
      </Col>
      <br />
      <br />
      <br />

      <Col xs={20} md={20}>
        <Row gutter={24} type="flex" justify="space-between">
          {data
            ? data.filterUsers.map((oneData) => (
                <UserCard
                  key={oneData.nickname}
                  nickname={oneData.nickname}
                  openImageChoice={oneData.openImageChoice}
                  messageToFriend={oneData.messageToFriend}
                  motivations={oneData.motivations}
                  levelOf3Dae={oneData.levelOf3Dae}
                  weekdays={oneData.weekdays}
                  ableDistricts={oneData.ableDistricts}
                />
              ))
            : null}
        </Row>
      </Col>
    </Row>
  );
}

export default FindFriend;
