import React, { useEffect } from 'react';
import { Row, Col } from 'antd';
import { useQuery, useApolloClient, useMutation } from '@apollo/react-hooks';

import {
  IS_LOGGED_IN,
  GET_FRIENDS,
  SET_CHAT_FRIEND,
  SUBSCRIBE_FOLLOWERS,
  SUBSCRIBE_FRIENDS,
} from '../graphql/queries';
import useSubscript from '../hooks/Shared/useSubscript';
import Nav from '../components/Cards/Nav';
import CardList from '../components/Cards/CardList';
import redirectWhenError from '../utils/redirectWhenError';

type CardsProps = {
  history: any; // match, location을 같이 쓰니 안되고, 얘만 쓰니 되네... withRouter로 붙인 애들은 다 써줘야 하는 것 같고, 아닌 애들은 아닌 듯.
  // 이것처럼 쓰는 것도 좀 아닌것 같고
  match: { params: { state: string } };
};

function Cards({ history, match }: CardsProps) {
  const client = useApolloClient();
  const { data: loginData } = useQuery(IS_LOGGED_IN);
  const {
    subscribeToMore,
    loading: loadingFR,
    error: errorFR,
    data: dataFR,
    refetch: refetchFR,
  } = useQuery(GET_FRIENDS, {
    fetchPolicy: 'network-only',
  });
  const [setChatFriend] = useMutation(SET_CHAT_FRIEND);
  const { state } = match.params;

  // 하나 올때마다 모든 카드들을 각 sector 별로도 아니고, 모든 카드를 refetch하니 좀 최적화에서 손해이긴한듯.
  useEffect(() => {
    subscribeToMore({
      document: SUBSCRIBE_FOLLOWERS,
      updateQuery: () => {
        refetchFR();
      },
    });
    subscribeToMore({
      document: SUBSCRIBE_FRIENDS,
      updateQuery: () => {
        refetchFR();
      },
    });
    // eslint-disable-next-line
  }, []);

  useSubscript(history);

  // react가 SPA이기 때문에 주소창에 주소를 쳐서 들어오면 state가 무조건 initial로 돌아가면서 isLoggedIn = false로 되게 된다. 그래서 로긴 무조건 다시 하라고 뜨게 됨.
  if (!loginData.isLoggedIn)
    redirectWhenError({
      history,
      client,
    });

  return (
    <div>
      <br />
      <Row type="flex" justify="center">
        <Nav history={history} state={state} />
        <br />
        <br />
        <Col xs={24} md={20}>
          <CardList
            {...{
              loadingFR,
              errorFR,
              dataFR,
              history,
              client,
              state,
              setChatFriend,
            }}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Cards;
