import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Divider } from 'antd';
import { useLazyQuery, useQuery, useApolloClient } from '@apollo/react-hooks';

import FilterLists from '../components/FindFriend/FilterLists';
import FilteredCards from '../components/FindFriend/FilteredCards';
import {
  GET_FILTERED_USERS,
  IS_LOGGED_IN,
  GET_USERINFO,
} from '../graphql/queries';
import useSubscript from '../hooks/Shared/useSubscript';
import redirectWhenError from '../utils/redirectWhenError';

type FindFriendProps = {
  history: any; // match, location을 같이 쓰니 안되고, 얘만 쓰니 되네... withRouter로 붙인 애들은 다 써줘야 하는 것 같고, 아닌 애들은 아닌 듯.
};

function FindFriend({ history }: FindFriendProps) {
  const client = useApolloClient();
  const [filter, setFilter] = useState<any>({
    gender: [],
    levelOf3Dae: [],
    motivations: [],
    weekdays: [],
  });
  const [places, setPlaces] = useState<string[]>([]);
  const [
    getFilteredUsers,
    { loading: loadingFU, data: dataFU, error: errorFU },
  ] = useLazyQuery(GET_FILTERED_USERS);
  const { data: loginData } = useQuery(IS_LOGGED_IN);
  const { data: dataMe, error: errorMe } = useQuery(GET_USERINFO, {
    fetchPolicy: 'network-only',
  });
  useSubscript(history);

  // if (errorMe || error) redirectWhenError(history, client);
  // refetch 할때의 error는 아래의 error나 errorMe에 안 잡히는 듯.

  // alert창이 2번 불리는 것 때문에 useEffect 붙여버림.
  useEffect(() => {
    if (errorMe || errorFU) redirectWhenError({ history, client });
    // eslint-disable-next-line
  }, [errorMe, errorFU]);
  // 여기도 서버에서 나오는 에러 종류에 따라서 꼭 로그인 만료 문제가 아닐 수 있으므로 Login 먼저 하세요를 보여줄지, 혹은 다른 에러 메세지를 보여줄지

  if (!loginData.isLoggedIn) redirectWhenError({ history, client });

  return (
    <Layout style={{ background: '#fff' }}>
      <Layout.Content>
        <Row
          type="flex"
          justify="center"
          style={{ background: '#fafafa', paddingTop: 20 }}
        >
          <Col xs={20} md={20}>
            <Divider>친구 필터</Divider>
            <Row gutter={24} justify="center">
              <FilterLists
                {...{ getFilteredUsers, filter, setFilter, places, setPlaces }}
              />
              <Col xs={24} md={{ span: 4, offset: 20 }} />
            </Row>
          </Col>
          <Divider style={{ marginBottom: 0 }} />
        </Row>
        <Row type="flex" justify="center">
          <Col xs={20}>
            <FilteredCards {...{ loadingFU, dataFU, dataMe }} />
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
}

export default FindFriend;
