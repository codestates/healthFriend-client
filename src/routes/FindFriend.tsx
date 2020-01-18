import React from 'react';
import { Layout, Row, Col, Divider } from 'antd';

import ErrorLoginFirst from '../components/Shared/ErrorLoginFirst';
import FilterLists from '../components/FindFriend/FilterLists';
import FilteredCards from '../components/FindFriend/FilteredCards';
import useFindFriend from '../hooks/FindFriend/useFindFriend';

type FindFriendProps = {
  history: any; // match, location을 같이 쓰니 안되고, 얘만 쓰니 되네... withRouter로 붙인 애들은 다 써줘야 하는 것 같고, 아닌 애들은 아닌 듯.
};

function FindFriend({ history }: FindFriendProps) {
  const {
    filter,
    setFilter,
    places,
    setPlaces,
    getFilteredUsers,
    loading,
    data,
    loginData,
    dataUser,
    refetch,
  } = useFindFriend({ history });

  if (!loginData.isLoggedIn) return <ErrorLoginFirst error={null} />;

  return (
    <Layout style={{ background: '#fff', height: '100vh' }}>
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
                {...{ getFilteredUsers, filter, places, setPlaces, setFilter }}
              />
              <Col xs={24} md={{ span: 4, offset: 20 }} />
            </Row>
          </Col>
          <Divider style={{ marginBottom: 0 }} />
        </Row>
        <Row type="flex" justify="center">
          <Col xs={20}>
            <FilteredCards {...{ loading, data, dataUser, refetch }} />
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
}

export default FindFriend;
