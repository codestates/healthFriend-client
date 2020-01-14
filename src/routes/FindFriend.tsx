/** @jsx jsx */
import { useState, useEffect } from 'react';
import { Layout, Row, Col, Button, Divider } from 'antd';
import { css, jsx } from '@emotion/core';
import { useLazyQuery, useQuery, useApolloClient } from '@apollo/react-hooks';

import SelectPlace from '../components/FindFriend/SelectPlace';
import SelectDefault from '../components/FindFriend/SelectDefault';
import UserCard from '../components/FindFriend/UserCard';
import questionList from '../config/questions';
import {
  GET_FILTERED_USERS,
  IS_LOGGED_IN,
  GET_USERINFO,
} from '../graphql/queries';
import Loading from '../components/Shared/Loading';
import redirectWhenTokenExp from '../utils/redirectWhenTokenExp';
import ErrorLoginFirst from '../components/Shared/ErrorLoginFirst';

const marginFilterdCards = css`
  margin-top: 40px;
`;

const questionsCSS = css`
  margin-top: 10px;
`;

type FindFriendProps = {
  history: any; // match, location을 같이 쓰니 안되고, 얘만 쓰니 되네... withRouter로 붙인 애들은 다 써줘야 하는 것 같고, 아닌 애들은 아닌 듯.
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
  );
  const { data: loginData } = useQuery(IS_LOGGED_IN);
  const client = useApolloClient();
  const { data: dataUser, error: errorUser, refetch } = useQuery(GET_USERINFO, {
    fetchPolicy: 'network-only',
    // errorPolicy: 'ignore', 어떤 효과 있는지 모르겠음. 확인.
  });

  // refetch 할때의 error는 아래의 error나 errorUser에 안 잡히는 듯.

  // alert창이 2번 불리는 것 때문에 useEffect 붙여버림.
  useEffect(() => {
    if (errorUser || error) redirectWhenTokenExp(history, client);
    // eslint-disable-next-line
  }, [errorUser, error]);
  // 여기도 서버에서 나오는 에러 종류에 따라서 꼭 로그인 만료 문제가 아닐 수 있으므로 Login 먼저 하세요를 보여줄지, 혹은 다른 에러 메세지를 보여줄지

  if (!loginData.isLoggedIn) return <ErrorLoginFirst error={null} />;

  const filterList = questionList
    .filter((elm) => elm.isFilterList)
    .map((ele) => ele.subject);

  const questions = filterList.map((filterQ) => {
    const [{ subject, question, answer }] = questionList.filter(
      (elm) => elm.subject === filterQ,
    );
    return subject === 'ableDistricts' ? (
      <Col md={16} key={question} css={questionsCSS}>
        <SelectPlace setPlaces={setPlaces} selectedPlaces={[]} />
      </Col>
    ) : (
      <Col md={8} key={question} css={questionsCSS}>
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
    if (loading) return <Loading />;
    return (
      <Row gutter={24} css={marginFilterdCards}>
        {data
          ? data.filterUsers
              .filter((user) => user.id !== dataUser.me.id)
              .filter((user) => {
                const array = dataUser.me.following
                  .concat(dataUser.me.followers)
                  .concat(dataUser.me.friends)
                  .map((one) => one.id);
                return array.indexOf(user.id) === -1;
              })
              .map((oneData) => (
                <UserCard
                  id={oneData.id}
                  key={oneData.email}
                  nickname={oneData.nickname}
                  gender={oneData.gender}
                  openImageChoice={oneData.openImageChoice}
                  messageToFriend={oneData.messageToFriend}
                  motivations={oneData.motivations}
                  levelOf3Dae={oneData.levelOf3Dae}
                  weekdays={oneData.weekdays}
                  ableDistricts={oneData.ableDistricts}
                  type="unknown"
                  renewFriends={refetch}
                  setFriend={() => null}
                />
              ))
          : null}
      </Row>
    );
  }

  return (
    <Layout style={{ background: '#fff', height: '100vh' }}>
      <Layout.Content>
        <Row type="flex" justify="center" style={{ background: '#fafafa', paddingTop: 20 }}>
          <Col xs={20} md={20}>
            <Divider>친구 필터</Divider>
            <Row gutter={24} justify="center">
              {questions}
              <Col xs={24} md={{ span: 4, offset: 20 }}>
                <Button
                  type="primary"
                  onClick={() => {
                    getFilteredUsers({ variables: { ...filter, districts: places } });
                  }}
                  style={{ width: '100%', marginTop: 20 }}
                >
                  검색
                </Button>
              </Col>
            </Row>
          </Col>
          <Divider style={{ marginBottom: 0 }} />
        </Row>
        <Row type="flex" justify="center">
          <Col xs={20}>
            <FilteredCards />
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
}

export default FindFriend;
