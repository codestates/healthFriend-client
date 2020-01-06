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
import ErrorLoginFirst from '../components/Shared/ErrorLoginFirst';

const filterCSS = css`
  margin-bottom: 20px;
`;

const marginFilterdCards = css`
  margin-top: 40px;
`;

type FindFriendProps = {
  history: any;
};

function FindFriend({ history }: FindFriendProps) {
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
  const { data: dataUser, error: errorUser, loading: loadingUser } = useQuery(
    GET_USERINFO,
    {
      fetchPolicy: 'network-only',
    },
  );
  const { data: loginData } = useQuery(IS_LOGGED_IN);

  const client = useApolloClient();

  if (loginData.isLoggedIn === false) return <Redirect to="/" />;

  if (!loadingUser && !dataUser && loginData.isLoggedIn === true) {
    client.writeData({ data: { isLoggedIn: false } });
    return <ErrorLoginFirst error={errorUser} />;
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

  type FilteredCards = {
    historys: any;
  };

  function FilteredCards({ historys }: FilteredCards) {
    if (loading) {
      return <Loading />;
    }
    if (error) {
      client.writeData({ data: { isLoggedIn: false } });
      alert('로그인 기한 만료로 검색 실패');
      historys.push('/');
      return null;
      // return <ErrorLoginFirst error={error} />;
      // 여기도 서버에서 나오는 에러 종류에
      // 따라서 Login 먼저 하세요를 보여줄지, 혹은 다른 에러 메세지를 보여줄지
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
        <FilteredCards historys={history} />
      </Col>
    </Row>
  );
}

export default FindFriend;
