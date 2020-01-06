/** @jsx jsx */
import { useState } from 'react';
import { Row, Col, Button } from 'antd';
import { css, jsx } from '@emotion/core';
import { useLazyQuery, useQuery, useApolloClient } from '@apollo/react-hooks';
import { Redirect } from 'react-router-dom';

import SelectPlace from '../components/FindFriend/SelectPlace';
import SelectDefault from '../components/FindFriend/SelectDefault';
import UserCard from '../components/FindFriend/UserCard';
import questionList from '../config/fakeData';
import {
  GET_FILTERED_USERS,
  IS_LOGGED_IN,
  GET_USERINFO,
} from '../graphql/queries';
import Loading from '../components/Shared/Loading';

const filterCSS = css`
  margin-bottom: 20px;
`;

const marginFilterdCards = css`
  margin-top: 40px;
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
  const { data: loginData } = useQuery(IS_LOGGED_IN);
  const client = useApolloClient();
  const { data: dataUser, error: errorUser, loading: loadingUser } = useQuery(
    GET_USERINFO,
    {
      fetchPolicy: 'network-only',
    },
  );

  if (dataUser) {
    client.writeData({ data: { isLoggedIn: true } });
    // 이게 동기로 일어나는 줄 알았는데 비동기인듯. 잠깐 아래 if 문으로 들어갔다가 나옴.
  }

  if (!loadingUser && loginData.isLoggedIn === false)
    return <Redirect to="/" />;

  if (error || errorUser) {
    alert('로그인 기한 만료로 검색 실패');
    client.writeData({ data: { isLoggedIn: false } });
    return <Redirect to="/" />;
  }

  const filterList = questionList
    .filter((elm) => elm.isFilterList)
    .map((ele) => ele.subject);

  const questions = filterList.map((filterQ) => {
    const [{ subject, question, answer }] = questionList.filter(
      (elm) => elm.subject === filterQ,
    );
    return subject === 'ableDistricts' ? (
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

  function FilteredCards() {
    if (loading) {
      return <Loading />;
    }
    if (error) {
      client.writeData({ data: { isLoggedIn: false } });
      alert('로그인 기한 만료로 검색 실패');
      return <Redirect to="/" />;
      // 여기도 서버에서 나오는 에러 종류에
      // 따라서 Login 먼저 하세요를 보여줄지, 혹은 다른 에러 메세지를 보여줄지
      // 꼭 로그인 만료 문제가 아닐 수 있음... error message에 따른 error handling?
    }

    return (
      <Row gutter={24} css={marginFilterdCards}>
        {data
          ? data.filterUsers.map((oneData) => (
              <UserCard
                key={oneData.email}
                nickname={oneData.nickname}
                gender={oneData.gender}
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
    );
  }

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
            getFilteredUsers({ variables: { ...filter, districts: places } });
          }}
        >
          친구 찾기!!
        </Button>
      </Col>
      <Col xs={20}>
        <FilteredCards />
      </Col>
    </Row>
  );
}

export default FindFriend;
